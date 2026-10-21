import { test, expect, type Page } from "@playwright/test";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { SALE, SALE_PRICE_PER_SQM, LINKS, SPLIT_SUMMARY_PDF, RENT, formatEur } from "../../src/config/site";
import { translations, type Lang } from "../../src/translations";
import { GALLERY } from "../../src/data/gallery";
import { calculateRentEstimate } from "../../src/lib/rent";
const langs: Lang[] = ["fi", "sv", "en"];
const pathFor = (l: Lang) => l === "fi" ? "/" : `/${l}`;
const compact = (s: string) => s.replace(/\s/g, "");
async function visit(page: Page, path: string) {
  await page.goto(path, { waitUntil: "networkidle" });
  // Asiakkaan normaali näppäimistötapahtuma pysäyttää kiosk-vierityksen.
  await page.keyboard.press("Escape");
  await page.mouse.wheel(0, -2000);
}
test.beforeEach(async ({ context }) => {
  await context.route("**/api/contact", r => r.fulfill({ status: 400, contentType: "application/json", body: '{"error":"UAT: no real delivery"}' }));
});
for (const lang of langs) {
  const path = pathFor(lang);
  const t = translations[lang];
  test(`PK18-UAT-01 ${lang}: hinta ja 480 €/m² kaikissa metatiedoissa`, async ({ page }) => {
    await visit(page, path);
    const price = compact(formatEur(108000, lang));
    for (const selector of ['title', 'meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:description"]']) {
      const el = page.locator(selector === 'title' ? 'head title' : selector);
      const text = selector === "title" ? await el.innerText() : await el.getAttribute("content");
      expect(compact(text!)).toContain(price); expect(text).toContain("480");
    }
    await expect(page.locator("#myynti")).toContainText("480");
    const graph = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!)["@graph"];
    const offer = graph.find((n: Record<string, string>) => n.businessFunction?.endsWith("#Sell"));
    expect(offer.price).toBe(SALE.salePriceDebtFree); expect(offer.priceSpecification.price).toBe(480);
    expect(SALE_PRICE_PER_SQM).toBe(480);
  });
  test(`PK18-UAT-02 ${lang}: oikea jako ja osakeryhmät`, async ({ page }) => {
    await visit(page, path); const text = await page.locator("#jakoesitys").innerText();
    for(const value of ["LH 19A", "A 19B", "107 m²", "118 m²", "2226–2332", "2333–2450"]) expect(text).toContain(value);
    expect(text).not.toMatch(/VEN02|\b131\s*m²|\b94\s*m²/);
    expect(107 + 118).toBe(SALE.area);
  });
  test(`PK18-UAT-03 ${lang}: kuvat latautuvat ja kolme PDF-linkkiä toimivat`, async ({ page, request }) => {
    await visit(page, path); const section = page.locator("#jakoesitys");
    await section.evaluate(el => el.scrollIntoView());
    const images = section.locator("img"); await expect(images).toHaveCount(2);
    for(const image of await images.all()) {
      await image.evaluate(el => el.scrollIntoView({ block: "center" }));
      await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
      expect((await image.getAttribute("alt"))!.length).toBeGreaterThan(15);
    }
    const links = section.locator('a[href$=".pdf"]'); await expect(links).toHaveCount(3);
    for(const link of await links.all()) {
      const response = await request.get((await link.getAttribute("href"))!);
      expect(response.status()).toBe(200); expect(response.headers()["content-type"]).toContain("application/pdf");
      expect((await response.body()).subarray(0,4).toString()).toBe("%PDF");
    }
    await section.getByRole("button").first().click(); await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape"); await expect(page.getByRole("dialog")).toHaveCount(0);
  });
  test(`PK18-UAT-04 ${lang}: lähdeuskollinen keskeneräinen esitys`, async ({ page }) => {
    await visit(page, path); await expect(page.locator("#jakoesitys")).toContainText(t.splitIntro);
    await expect(page.locator("#jakoesitys")).toContainText(t.splitSummaryNote);
    expect(t.splitIntro).toMatch(/marraskuu|november|November/);
    expect(t.splitIntro).toMatch(/ei ole vielä hyväksytty|ännu inte godkänts|has been approved/);
    await expect(page.locator(`a[href="${SPLIT_SUMMARY_PDF}"]`)).toHaveCount(1);
  });
  test(`PK18-UAT-05 ${lang}: PMO-optio ja tarjouspyynnön tiedot`, async ({ page }) => {
    await visit(page, path); const calc = page.locator("#tilapaketit");
    await calc.getByRole("group", { name: t.calcTeamLabel }).getByRole("button", { name: `4 ${t.pkgPersonsUnit}`, exact: true }).click();
    await expect(page.getByTestId("rent-package")).toContainText("EH1");
    const before = await page.getByTestId("rent-total").innerText();
    await calc.getByRole("checkbox", { name: t.calcPmoLabel }).check();
    await expect(calc).toContainText(t.calcPmoNote); expect(await page.getByTestId("rent-total").innerText()).toBe(before);
    await calc.getByRole("button", { name: t.calcAsk, exact: true }).click();
    await expect(page.locator('textarea[name="viesti"]')).toHaveValue(/Strategic PMO/);
    const message = await page.locator('textarea[name="viesti"]').inputValue();
    expect(message).toContain("4"); expect(message).toContain("3"); expect(message).toContain(t.pkgEh1Name); expect(message).toContain("Strategic PMO");
  });
  test(`PK18-UAT-05 ${lang}: kestorajojen ulkopuolella vain tarjous`, async ({ page }) => {
    await visit(page, path); const calc = page.locator("#tilapaketit");
    await calc.getByRole("group", { name: t.calcTeamLabel }).getByRole("button", { name: `2 ${t.pkgPersonsUnit}`, exact: true }).click();
    await calc.getByRole("group", { name: t.calcDurationLabel }).getByRole("button", { name: `12 ${t.pkgMonthsUnit}`, exact: true }).click();
    await expect(page.getByTestId("rent-estimate")).toHaveCount(0); await expect(calc.getByRole("status")).toContainText(t.calcNoEstimate);
  });
  test(`PK18-UAT-06 ${lang}: alakerran galleria ja alt-tekstit`, async ({ page }) => {
    await visit(page, path); await expect(page.locator("#galleria")).toContainText(t.galleryLower);
    for(const image of [...GALLERY.outdoor, ...GALLERY.street, ...GALLERY.lower, ...GALLERY.extra]) expect((t.alt as Record<string,string>)[image.base]?.trim().length, image.base).toBeGreaterThan(3);
    expect(GALLERY.lower).toHaveLength(5); expect(t.pkgEh3Space).toMatch(/pohjakerro|nedre|lower/);
  });
  test(`PK18-UAT-06 ${lang}: mobiilin vaakasuuntainen ylivuoto`, async ({ page }) => {
    for(const width of [320,375]) {
      await page.setViewportSize({width,height:812}); await visit(page,path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  });
  test(`PK18-UAT-07 ${lang}: oikeat ekosysteemilinkit ja palveluviesti`, async ({ page }) => {
    await visit(page, path);
    for(const url of [LINKS.petrikopsa, LINKS.booking, LINKS.pk33]) {
      const links = page.locator(`a[href="${url}"]`); expect(await links.count()).toBeGreaterThan(0);
      await expect(links.first()).toHaveAttribute("target", "_blank"); expect(await links.first().getAttribute("rel")).toContain("noopener");
    }
    expect(t.eco1Desc).toMatch(/PMO/); expect(t.eco1Desc).toContain("SAFe"); expect(t.eco1Desc).toContain("AI"); expect(t.eco3Desc).toContain("69 m²");
  });
  test(`PK18-UAT-08 ${lang}: palvelinkieli, canonical, hreflang ja schema`, async ({ page, request }) => {
    const r = await request.get(path); expect(r.status()).toBe(200);
    expect(await r.text()).toMatch(new RegExp(`<html[^>]*lang="${lang}"`));
    expect(r.headers()["x-robots-tag"] ?? "").not.toMatch(/noindex/i);
    await visit(page, path); await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://pitkansillankatu18.com" + (lang === "fi" ? "" : path));
    const alternates = page.locator('link[rel="alternate"][hreflang]'); await expect(alternates).toHaveCount(4);
    for(const l of [...langs, "x-default"]) expect(await alternates.locator(`xpath=self::*[@hreflang="${l}"]`).count()).toBe(1);
    const graph = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!)["@graph"];
    expect(graph.map((n: Record<string,string>) => n["@type"])).toEqual(expect.arrayContaining(["RealEstateListing", "Place", "LocalBusiness", "Offer", "WebSite"]));
    expect(graph.some((n: Record<string,string>) => n["@type"] === "Office")).toBe(false);
  });
}
test("PK18-UAT-01/02 lähdeskannaus aktiiviselle sisällölle", () => {
  const hits: string[] = [];
  function scan(dir:string) { for(const e of readdirSync(dir, {withFileTypes:true})) {
    const file=join(dir,e.name); if(e.isDirectory())scan(file);
    else if(/\.(tsx?|m?js|json|txt|html|svg)$/.test(file)) {
      const content=readFileSync(file,"utf8");
      if(/119[ ,\u00a0]?000|149[ ,\u00a0]?000|168[ ,\u00a0]?000|(?<!\d)(?:529|662)(?!\d)|VEN02|\b131\s*m²|\b94\s*m²/i.test(content)) hits.push(file);
    }
  }}
  scan("src");scan("public"); expect(hits).toEqual([]);
});
test("PK18-UAT-05 laskenta, arvonlisävero ja raja-arvot", () => {
  expect(calculateRentEstimate(6,3)).toMatchObject({id:"eh2", monthly:1800, total:5400, vat:1377, gross:6777, coworking:6300, difference:900});
  expect(calculateRentEstimate(2,12)).toBeNull();expect(calculateRentEstimate(12,1)).toBeNull();expect(calculateRentEstimate(0,3)).toBeNull();expect(calculateRentEstimate(2,-1)).toBeNull();
  for(const team of RENT.teamSizes) for(const months of RENT.durations) {
    const q=calculateRentEstimate(team, months); if(q) {
      const p=RENT.packages[q.id];expect(team).toBeGreaterThanOrEqual(p.persons[0]);expect(team).toBeLessThanOrEqual(p.persons[1]);expect(months).toBeGreaterThanOrEqual(p.months[0]);expect(months).toBeLessThanOrEqual(p.months[1]);
      expect(q.total).toBe(q.monthly*months);expect(q.gross).toBeCloseTo(q.total*1.255,2);
    }
  }
  expect(compact(formatEur(1882.5,"fi"))).toBe("1882,50€");
});
test("PK18-UAT-06 jokainen julkaistava galleriakuva alle 400 kt", () => {
  const files = readdirSync("public/img/pk18");expect(files.length).toBeGreaterThan(100);
  expect(files.filter(f=>!f.endsWith(".webp")||statSync(join("public/img/pk18",f)).size>=400000)).toEqual([]);
});
test("PK18-UAT-08 sitemap ja robots", async ({request}) => {
  const r=await request.get("/sitemap.xml");expect(r.status()).toBe(200);const xml=await r.text();expect([...xml.matchAll(/<loc>/g)]).toHaveLength(3);expect(xml).toContain('hreflang="x-default"');
  const robots=await request.get("/robots.txt");expect(robots.status()).toBe(200);expect(await robots.text()).toContain("Allow: /");expect(await robots.text()).toContain("Sitemap: https://pitkansillankatu18.com/sitemap.xml");
});
test("PK18-UAT-08 kielivalinta päivittää URLin ja metatiedot", async({page})=>{
  await visit(page,"/");await page.getByRole("link",{name:"English",exact:true}).click();await expect(page).toHaveURL(/\/en$/);await expect(page.locator("html")).toHaveAttribute("lang","en");await expect(page).toHaveTitle(/Project office/);
});
