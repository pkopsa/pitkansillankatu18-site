#!/usr/bin/env python3
"""
Björndahlin pyöreän punaisen B-logon poisto lähdekuvista.

Lukee "<nimi>-sumennettu.jpg":n, jos sellainen on (scripts/blur-plates.mjs), muuten
alkuperäisen, ja kirjoittaa samaan kansioon "<nimi>-muokattu.jpg". Kuvaskripti
(npm run images) käyttää muokattua versiota ensisijaisesti.

Maski = logon punaiset pikselit + B-kirjain ympyrän sisältä, laajennettuna.
Täyttötapa valitaan alueittain (testattu silmämääräisesti 21.10.2026):
  shiftmap – OpenCV xphoto, esimerkkipohjainen (lasi, jossa heijastuksia)
  clone    – kopio siirtymällä (dx, dy) jo korjatusta kohdasta (samanlainen ikkuna)
  rows     – rivikohtainen interpolointi reunojen välillä + lähialueen tekstuuri
             (vaakasuorat reunat kuten porras säilyvät)

Vaatii: opencv-contrib-python-headless, numpy (esim. erillinen venv)
Käyttö: python scripts/remove-logos.py ~/kopsa-web/pk18-aineisto/kuvat-katutaso
"""

import sys
from pathlib import Path

import cv2
import numpy as np

SRC = Path(sys.argv[1] if len(sys.argv) > 1 else "../../kopsa-web/pk18-aineisto/kuvat-katutaso").expanduser()

# Koordinaatit alkuperäisen 4000 px kuvan pikseleinä; käsitellään järjestyksessä
TARGETS = {
    "pk18-julkisivu-pitkansillankatu.jpg": [
        {"c": (1612, 2167), "r": 80, "method": "shiftmap"},                       # vasen näyteikkuna
        {"c": (1983, 2052), "r": 76, "method": "clone", "offset": (-371, 115)},   # oikea ← vasen ikkuna
    ],
    "pk18-katu-nayteikkunat-2.jpg": [
        {"c": (2669, 1927), "r": 82, "method": "rows", "texture": (-230, 50)},    # portaan edessä
    ],
}


def logo_mask(img: np.ndarray, cx: int, cy: int, r: int) -> np.ndarray:
    """Ympyrän sisältä punainen + vaalea B, laajennettu reunojen antialiasointia varten."""
    h, w = img.shape[:2]
    circle = np.zeros((h, w), np.uint8)
    cv2.circle(circle, (cx, cy), r + 4, 255, -1)
    b, g, rch = [c.astype(int) for c in cv2.split(img)]
    red = (rch > 120) & (rch - g > 50) & (rch - b > 40)
    mask = np.zeros((h, w), np.uint8)
    mask[red & (circle > 0)] = 255
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        cv2.drawContours(mask, [cv2.convexHull(np.vstack(contours))], -1, 255, -1)
    return cv2.dilate(mask, np.ones((9, 9), np.uint8), iterations=1)


def shifted(img: np.ndarray, dx: int, dy: int) -> np.ndarray:
    """Kuva, jossa pikseli (x, y) = alkuperäinen (x + dx, y + dy)."""
    return np.roll(np.roll(img, -dy, axis=0), -dx, axis=1)


def fill_shiftmap(img, mask, cx, cy, size=300):
    y0, x0 = cy - size, cx - size
    crop = img[y0:cy + size, x0:cx + size]
    dst = np.zeros_like(crop)
    cv2.xphoto.inpaint(crop, 255 - mask[y0:cy + size, x0:cx + size], dst, cv2.xphoto.INPAINT_SHIFTMAP)
    out = img.copy()
    out[y0:cy + size, x0:cx + size] = dst
    return out


def fill_rows(img, mask, texture):
    out = img.astype(np.float32)
    ys, _ = np.where(mask > 0)
    for y in range(ys.min(), ys.max() + 1):
        row = np.where(mask[y] > 0)[0]
        if len(row) == 0:
            continue
        x0, x1 = row.min() - 3, row.max() + 3
        a = img[y, x0 - 3:x0 + 1].astype(np.float32).mean(0)
        b = img[y, x1:x1 + 4].astype(np.float32).mean(0)
        t = np.linspace(0, 1, x1 - x0 + 1)[:, None]
        out[y, x0:x1 + 1] = a * (1 - t) + b * t
    out = cv2.GaussianBlur(out, (0, 0), 1.2)
    donor = shifted(img, *texture).astype(np.float32)
    out += donor - cv2.GaussianBlur(donor, (0, 0), 4)  # kivetyksen hienorakenne
    return np.clip(out, 0, 255).astype(np.uint8)


def remove(file: str, regions: list) -> None:
    blurred = SRC / file.replace(".jpg", "-sumennettu.jpg")
    img = cv2.imread(str(blurred if blurred.exists() else SRC / file))
    for reg in regions:
        cx, cy = reg["c"]
        mask = logo_mask(img, cx, cy, reg["r"])
        if reg["method"] == "shiftmap":
            filled = fill_shiftmap(img, mask, cx, cy)
        elif reg["method"] == "clone":
            filled = shifted(img, *reg["offset"])
        else:
            filled = fill_rows(img, mask, reg["texture"])
        soft = cv2.GaussianBlur(mask, (0, 0), 3).astype(np.float32)[..., None] / 255.0
        img = (filled * soft + img * (1 - soft)).astype(np.uint8)
    dst = SRC / file.replace(".jpg", "-muokattu.jpg")
    cv2.imwrite(str(dst), img, [cv2.IMWRITE_JPEG_QUALITY, 92])
    print(f"{file} → {dst.name} ({len(regions)} logoa)")


for name, regs in TARGETS.items():
    remove(name, regs)
