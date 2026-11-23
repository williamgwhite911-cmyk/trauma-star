# Trauma Star — Protocols & Dosages (2026 build)

Monroe County Fire Rescue Trauma Star. 105 protocol pages as action cards, dose
calculators, the pediatric tape, burns, RSI, the Hamilton T1 ventilator pages,
hospital destinations and the flight checklists — one page, works with no signal.

**DRAFT PAGES ARE NOT APPROVED.** Anything tagged *Draft — not approved* is
written for the Medical Director's review and is not to be worked from.

## This goes in a SUBFOLDER, beside the older app

The older app stays where it is, at the repository root. Put these files in a
folder called `v2`, so the repo looks like this:

    index.html            <- the older app, untouched
    sw.js
    v2/index.html         <- this build
    v2/sw.js
    v2/manifest.webmanifest
    v2/icons/

The two apps are then completely separate: separate URLs, separate caches,
separate home-screen icons. Nothing this build does can disturb the old one.

- old app:  https://williamgwhite911-cmyk.github.io/trauma-star/
- this one: https://williamgwhite911-cmyk.github.io/trauma-star/v2/

## Uploading it

Repo → **Add file → Upload files** → drag the `v2` folder in → commit to `main`.
Wait for "pages build and deployment" to finish (about a minute).

If GitHub flattens the folder and drops the files at the root, delete them and
instead use **Add file → Create new file**, type `v2/index.html` as the name —
typing the slash creates the folder — then upload the rest into it.

## Put it on a phone or iPad

1. Open the **/v2/** link in **Safari** (iPhone/iPad) or **Chrome** (Android).
2. Let it finish loading once **while you have signal** — that is when it caches
   itself, and on a phone that already has the old app that first online load is
   what hands control to this copy.
3. Share → **Add to Home Screen**. It appears as **TS Protocols**.
4. It now opens full screen and works in the aircraft with no signal at all.

The old app's icon is unchanged and still works. Two icons, two apps.

## Updating it

Replace `v2/index.html`, then change the `CACHE` string at the top of `v2/sw.js`
to any new value. Phones pick the new version up the next time they open the app
with signal. Offline, they keep running the copy they already have.

## What is in here

| File | What it is |
|---|---|
| `index.html` | The whole app — protocols, drugs, calculators, images. One file. |
| `sw.js` | Service worker, scoped to `/v2/` only. Caches the app so it opens offline. |
| `manifest.webmanifest` | Name, colours and icons for the home-screen app. |
| `icons/` | The Trauma Star icon at 180, 192 and 512 px. |

Sources are listed inside the app, on the **Sources** tab: printed page numbers
are the 2025 MCFR EMS Protocols V4.2 and the current Medication Formulary;
anything else is marked PROGRAM, REFERENCE or DRAFT.
