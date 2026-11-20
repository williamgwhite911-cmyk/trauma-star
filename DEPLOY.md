# Replacing the PHI-based pages in `trauma-star`

## Why

Every clinical page in the current repo draws its doses from the **PHI Air
Medical Clinical Care Guidelines**. The TS-CCG manual states this outright:
doses and thresholds "are adapted from the cited sources, including the PHI Air
Medical Clinical Care Guidelines." 41 of the 70 pages carry a PHI citation in
their own footnotes. Those doses are not Monroe County's, so correcting them one
page at a time was not an option — the whole clinical layer had to come from the
MCFR book instead.

The replacement is built from the *Monroe County Fire Rescue EMS Protocols, 2025
Version* (V4.2) and the current Medication Formulary (pp. 138–180).

## What to do

### 1. Add the new files to the repository root

    index.html
    manifest.webmanifest
    sw.js
    icon.svg
    icon-192.png
    icon-512.png
    apple-touch-icon.png
    README.md

`index.html` replaces the old launcher of the same name.

### 2. Remove the 41 pages that cite PHI

```
as-analgesia.html          as-post-intubation.html    as-procedural.html
as-scales.html             cns-infection.html         cyanide.html
drug-index.html            envenomation.html          herniation.html
manual.html                med-acs.html               med-agitation.html
med-anaphylaxis.html       med-asthma.html            med-chf.html
med-croup.html             med-glycemic.html          med-hyperkalemia.html
med-nausea.html            med-sepsis.html            med-vascular.html
ob-antepartum-hemorrhage.html  ob-fetal-monitoring.html   ob-pph.html
ob-preeclampsia.html       ob-preterm-labor.html      ob-thyroid-storm.html
ob-transport.html          opioid-overdose.html       seizures.html
stroke-hemorrhagic.html    stroke-ischemic.html       stroke-undetermined.html
tca-overdose.html          trauma-assessment.html     trauma-burns.html
trauma-chest.html          trauma-crush.html          trauma-hypothermia.html
trauma-msk.html            trauma-tbi.html
```

`manual.html` is the TS-CCG approval manual and `drug-index.html` the dosing
matrix built on it; both go with the rest.

### 3. Decide on the remaining 26 pages — these are not PHI

**Yours, or drafts of yours.** Keep them; they are not superseded by anything in
the new app:

    ops-divert.html + ts-ops-006-divert-protocol.pdf   TS-OPS-006, your draft
    formulary-iv-acetaminophen.html                    your Ofirmev sign-off memo
    protocols.html                                     old index; delete once the new app is live

**Covered by the new app** — the new build has the MCFR version of each, so
these can go unless you want the longer write-up:

    ibw.html            Patient tab (ideal body weight, tidal volume)
    peds.html           Patient tab (weight-based dosing) and the Peds filter
    pressors.html       Drips tab
    transport-times.html  Tools tab (distance and flight time)
    wholeblood.html     Whole Blood protocol p. 120 and formulary p. 176
    protocol-template.html   scaffolding, never linked

**Not in the MCFR book at all** — no PHI citation, but no MCFR source either, so
they stand on whatever you based them on. Nothing in the new app replaces them;
keep or retire them on their own merits:

    airway-ketamine.html       bends.html
    hd-iabp.html               hd-lvad.html
    hd-pericardiocentesis.html hd-port.html
    ops-crew-crm.html          ops-mtp.html
    ops-rsi-choreography.html  ops-traumatic-arrest.html
    trauma-chest-decompression.html  trauma-gsw.html
    trauma-mvc.html            trauma-pwc.html
    trauma-sharkbite.html      trauma-stab.html

If you keep any of them, they need a link from the new app — nothing points at
them now. Tell me which and I will add a section for them.

### 4. Push

Nothing to build; GitHub Pages serves the root directly. Confirm Pages is set to
deploy from the default branch, root folder, then open the live URL and check
the version stamp in the About box on the Patient tab reads `2026-11-19 r1`.

Crews who already installed the old app will keep seeing it until the service
worker updates — the new `sw.js` uses a different cache name, so one online
launch after the deploy swaps them over.

## What changed clinically

The one to brief the crews on: **TXA is 2 g for adults** (15 mg/kg, max 2 g,
pediatric). The 1 g figure in the old `drug-index.html` came from the superseded
short formulary.

Eighteen other drugs changed dose, route or indication between the old formulary
and the current one, and twelve entries are new — eight of them Trauma Star
only: diltiazem, hydralazine, hydromorphone, labetalol, lidocaine,
nitroglycerin infusion, succinylcholine, vecuronium. The **Changed** filter on
the Meds tab lists all of them, and each card says what it was before.

Three drips the old formulary carried — ketamine, Versed and fentanyl
continuous sedation — have no page in the current formulary, which prints bolus
doses only. Those drip cards are still in the app, marked **NOT IN PROTOCOL**,
pointing to the Advanced Airway protocols and sending orders for a rate.
Rocuronium's maintenance infusion is now 4–16 mcg/kg/min (was 5–12).
