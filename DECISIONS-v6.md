# DECISIONS – v6.0.0 (21.10.2026)

Päätökset, jotka tehtiin itsenäisesti PROMPTI_B_v6.md:n toteutuksessa. Petri lukee ja kuittaa.
Lähtötila: master = origin/master = tuotanto (`12bb0ff`, v5.5-1). Haara: `release/v6.0.0`.

## Vaihe 0 – haara ja versio
- package.json: `version` 4.14.0 → 6.0.0 ja `name` `pitkansillankatu-site` → `pitkansillankatu18-site` (nimi oli kopioitu PK33-reposta).
- package-lock.json synkronoitu (`npm install --package-lock-only`): nimi ja versio; ei uusia riippuvuuksia.
- .gitignore: lisätty `.DS_Store`, `.claude/`, `*.csv`, `*.zip`. `.env*` oli jo mukana.
- eslint.config.mjs otettu käsin haarasta `origin/vercel/install-vercel-web-analytics-tej0o4` (FlatCompat). Haaraa ei mergetty. Haara ei asenna analytics-pakettia – `@vercel/analytics` on jo masterissa.
