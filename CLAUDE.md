# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Next.js version

Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/` — this version may have breaking changes from training data. Heed deprecation notices.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test runner is configured yet.

## Architecture

This is a **Next.js 15** app using the **App Router** with React 19, TypeScript, and Tailwind CSS v4.

**Webpack only:** This machine's CPU lacks BMI2 instructions — Turbopack crashes. Never add `--turbopack` to scripts or config. `next dev` uses Webpack by default in Next.js 15 (no flag needed).

- `src/app/` — App Router root. `layout.tsx` is the root layout; `page.tsx` is the home route.
- `src/` — All application code lives here. The `@/*` alias maps to `src/*`.
- `public/` — Static assets served at the root path.
- `next.config.ts` — Next.js configuration (TypeScript).

Tailwind is configured via `@tailwindcss/postcss` (v4 plugin approach — no `tailwind.config.*` file by default).
