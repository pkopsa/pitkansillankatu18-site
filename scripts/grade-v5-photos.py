#!/usr/bin/env python3
"""
v5.5-sivuston puhelinkuvien sävy- ja valoisuussovitus ammattikuvien tyyliin.

Lähde:  ~/kopsa-web/pk18-aineisto/kuvat-v5-live/       (v5.5:n public/-kuvat git-historiasta)
Tulos:  ~/kopsa-web/pk18-aineisto/kuvat-v5-sovitettu/  (pk18-v5-<nimi>.jpg) → npm run images
Viite:  kuvat-katutaso/ ja kuvat-alakerta/ (ammattikuvaaja 30.9.2026)

Sovitus LAB-väriavaruudessa:
  1. valkotasapaino: vaaleiden neutraalien pintojen (seinät, katto) sävy → viitteen neutraali
  2. valoisuus: L-kanavan prosenttipisteet → viitteen prosenttipisteet (paloittain lineaarinen käyrä)
  3. värikylläisyys: keskikroma → viitteen keskikroma (rajattu)
  + kevyt terävöitys ja rekisterikilpien sumennus (PLATES).
Sisäkuvat sovitetaan sisäkuviin, ulkokuvat ulkokuviin. Voimakkuudet STRENGTH (0–1):
ulkokuvissa valkotasapainoa siirretään vähän, ettei pilvinen kuva lämpene aurinkoisen viitteen sävyyn.

Vaatii: opencv-contrib-python-headless (tai opencv-python-headless), numpy
Käyttö: python scripts/grade-v5-photos.py [aineistokansio]
"""

import sys
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(sys.argv[1] if len(sys.argv) > 1 else "~/kopsa-web/pk18-aineisto").expanduser()
SRC = ROOT / "kuvat-v5-live"
OUT = ROOT / "kuvat-v5-sovitettu"
PCTS = [1, 5, 15, 30, 50, 70, 85, 95, 99]

# lähde → (tulosnimi, ulkokuva?)
PHOTOS = {
    "kip18-daylounge-avara.jpg": ("pk18-v5-avoin-toimisto", False),
    "kip18-daylounge-kokous.jpg": ("pk18-v5-kokouspoyta", False),
    "kip18-daylounge-naytto.jpg": ("pk18-v5-taukotila-naytto", False),
    "kip18-neuvottelu.jpg": ("pk18-v5-neuvottelutila", False),
    "kip18-keittio.jpg": ("pk18-v5-keittio", False),
    "kip18-keittioalue.jpg": ("pk18-v5-keittioalue", False),
    "kip18-toimisto.jpg": ("pk18-v5-toimisto", False),
    "kip18-julkisivu.jpg": ("pk18-v5-julkisivu", True),
    "kip18-julkisivu-sisaankaynti.jpg": ("pk18-v5-julkisivu-sisaankaynti", True),
    "katu-nyt.jpeg": ("pk18-v5-katunakyma", True),
}

# Rekisterikilvet (myös ikkunaheijastuksissa) alkuperäisen kuvan pikseleinä
PLATES = {
    "katu-nyt.jpeg": [(725, 1115, 60, 30)],
    "kip18-julkisivu.jpg": [(1600, 845, 55, 40)],
    "kip18-julkisivu-sisaankaynti.jpg": [(1455, 822, 40, 30)],
}

STRENGTH = {
    "interior": {"wb": 0.9, "tone": 0.95, "chroma": 1.0},
    "exterior": {"wb": 0.25, "tone": 0.6, "chroma": 0.6},
}


def lab(img):
    return cv2.cvtColor(img, cv2.COLOR_BGR2LAB).astype(np.float32)


def stats(images):
    """Viitetilastot: L-prosenttipisteet, neutraalin sävy (a, b), keskikroma."""
    Ls, neutrals, chromas = [], [], []
    for img in images:
        small = cv2.resize(img, (800, int(800 * img.shape[0] / img.shape[1])), interpolation=cv2.INTER_AREA)
        x = lab(small)
        L, a, b = x[..., 0], x[..., 1] - 128, x[..., 2] - 128
        chroma = np.hypot(a, b)
        Ls.append(np.percentile(L, PCTS))
        sel = (L > np.percentile(L, 70)) & (chroma < 15)
        neutrals.append([a[sel].mean(), b[sel].mean()] if sel.any() else [0, 0])
        chromas.append(chroma.mean())
    return np.mean(Ls, 0), np.mean(neutrals, 0), float(np.mean(chromas))


def grade(img, ref, strength):
    ref_L, ref_neutral, ref_chroma = ref
    src_L, src_neutral, src_chroma = stats([img])
    x = lab(img)
    L, a, b = x[..., 0], x[..., 1] - 128, x[..., 2] - 128
    # 1. valkotasapaino
    shift = (ref_neutral - src_neutral) * strength["wb"]
    a, b = a + shift[0], b + shift[1]
    # 2. valoisuus (monotoninen käyrä src-prosenttipisteistä viitteeseen)
    xs = np.concatenate([[0], np.maximum.accumulate(src_L), [255]])
    ys = np.concatenate([[0], np.maximum.accumulate(ref_L), [255]])
    xs = xs + np.arange(len(xs)) * 1e-3  # tiukasti kasvava
    L_new = np.interp(L, xs, ys)
    L = L * (1 - strength["tone"]) + L_new * strength["tone"]
    # 3. värikylläisyys – vain lisäys: viitteen valkoiset seinät laskevat keskikromaa,
    #    joten vähentäminen haalistaisi puupinnat
    k = np.clip(ref_chroma / max(src_chroma, 1e-3), 1.0, 1.3)
    k = 1 + (k - 1) * strength["chroma"]
    a, b = a * k, b * k
    out = cv2.cvtColor(np.dstack([L, a + 128, b + 128]).clip(0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR)
    # kevyt terävöitys (puhelinkuvat ovat pehmeämpiä kuin ammattikuvat)
    blur = cv2.GaussianBlur(out, (0, 0), 1.2)
    return cv2.addWeighted(out, 1.35, blur, -0.35, 0)


def blur_plates(img, regions):
    for x, y, w, h in regions:
        img[y:y + h, x:x + w] = cv2.GaussianBlur(img[y:y + h, x:x + w], (0, 0), 12)
    return img


def load_refs(folders):
    files = [f for d in folders for f in sorted((ROOT / d).glob("*.jpg"))
             if not f.stem.endswith(("-sumennettu", "-muokattu"))]
    return files


def main():
    OUT.mkdir(exist_ok=True)
    refs = load_refs(["kuvat-katutaso", "kuvat-alakerta"])
    exterior_names = ("pk18-julkisivu", "pk18-katu-")
    interior = stats([cv2.imread(str(f)) for f in refs if not f.stem.startswith(exterior_names)])
    exterior = stats([cv2.imread(str(f)) for f in refs if f.stem.startswith(exterior_names)])
    for src, (name, is_ext) in PHOTOS.items():
        img = cv2.imread(str(SRC / src))
        img = blur_plates(img, PLATES.get(src, []))
        out = grade(img, exterior if is_ext else interior, STRENGTH["exterior" if is_ext else "interior"])
        cv2.imwrite(str(OUT / f"{name}.jpg"), out, [cv2.IMWRITE_JPEG_QUALITY, 92])
        print(f"{src} → {name}.jpg")


if __name__ == "__main__":
    main()
