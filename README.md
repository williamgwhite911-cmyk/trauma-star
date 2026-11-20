# Trauma Star — MCFR Protocols

Field reference for Monroe County Fire Rescue / Trauma Star flight crews. One
page, works offline, installs to a phone or iPad home screen.

**Live:** https://williamgwhite911-cmyk.github.io/trauma-star/

## What it holds

- **Protocols** — all 83 protocols from the *Monroe County Fire Rescue EMS
  Protocols, 2025 Version* (144-page file, V4.2), by section, with the book's
  page numbers. Trauma Star (green) items are marked. Search covers the full
  text and matches either the generic or the trade name.
- **Meds** — the current **Medication Formulary, pp. 138–180**, one drug per
  page. pp. 138–164 are shared by the ground units and Trauma Star; pp. 165–180
  are **Trauma Star only**. Filter by shared / Trauma Star / changed.
- **Drips** — continuous and timed infusions with Sapphire pump rates, VTBI and
  gravity drip rates. Mixes are editable and remembered on the device.
- **Patient** — Adult / Pediatric / OB, weight and height in either unit, ideal
  body weight, lung-protective tidal volume, i-gel and ET tube sizing, advanced
  airway and pain-management doses. Entering a weight calculates every per-kg
  dose in the app, honouring the maximums and minimums the protocol prints.
- **Tools** — trauma alert and sepsis alert checks, pediatric minimum systolic
  BP, burn fluid rates, the phone numbers in the protocol, procedure pages, and
  transport distance and flight time between the bases and the hospitals.

## Patient types

`Adult`, `Pediatric` and `OB`. The protocol book has no separate obstetric
weight-based dosing, so **OB is dosed as an adult** — it changes what the app
shows you, not what it calculates:

- the 10 Obstetrical protocols come first in the protocol list;
- the 15 other protocols that carry pregnancy-specific instructions are listed
  under them, and those lines are pulled to the top when you open one
  (the eclampsia referral in Seizure, third-trimester arrest, the pain and
  airway contraindications, the ≥ 20 week trauma-alert criterion, the whole
  blood pregnancy category);
- ideal body weight, tidal volume and the ET tube row use the female formula.

## Sources and limits

Protocol text is carried over as written. Items marked **STANDARD REFERENCE**
(ideal body weight, tidal volume, i-gel and ET tube sizing) are not in the MCFR
protocol and come from general published references. Drip mixes marked **NOT IN
PROTOCOL** are editable starting points, not protocol. Amber values are
arithmetic on the weight entered.

The formulary in this build is the current edition (pp. 138–180), which
supersedes the short formulary on pp. 136–143 of the older V4(2) file. Where the
two differ this edition governs — most importantly **TXA is 2 g for adults**,
not 1 g. Cards whose dose or indication changed are marked `CHANGED` and say
what it was. Page numbers 168–180 are inferred from sequence; the printed number
was cropped in the source.

**This is an unofficial aid.** It does not replace the official protocol,
medical direction or clinical judgment. Verify every dose before administration.

## No patient data leaves the device

Nothing is uploaded. Weight, height and drip mixes are kept in the browser's
local storage on that device only. A scanned name and date of birth are held in
memory until the patient is cleared or the app is closed, and are never written
to storage. The ID barcode is decoded on the phone itself.

## Deploying

GitHub Pages serves this directly from the repository root — no build step.

    index.html              the whole app
    manifest.webmanifest    install metadata
    sw.js                   offline cache
    icon*.png, icon.svg     app icons

After pushing a change, **bump `CACHE` in `sw.js`**. The activate step deletes
older caches, so a crew that opens the app after a deploy picks up the new
build; without the bump they keep the cached one.

To install: open the live URL, then Share → Add to Home Screen (iPhone/iPad) or
the install prompt (Android).
