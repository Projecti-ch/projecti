# SEO Metadata Proposals — Projecti

Each page needs a **title** and **description**. Rules of thumb:
- Title: 50–60 characters (search engines truncate beyond ~60)
- Description: 140–160 characters (shown in search results)
- Every page should be unique and contain the main keyword for that page

The **OpenGraph title/description** (used for social sharing previews on LinkedIn, WhatsApp, iMessage etc.) can mirror the page title/description or be slightly more conversational. I've kept them the same here for simplicity — let me know if you want them to differ.

---

## Root Layout (fallback — used if a page has no metadata)

| Field | Current | Proposed |
|-------|---------|----------|
| Title | Projecti — Planung und digitale Lösungen für Immobilienentwickler | *(keep as fallback)* |
| Description | Strukturierte Planungsphasen, digitale Workflows, dokumentierte Entscheidungen. Das Ergebnis sind planbare Projektverläufe und fundierte Grundlagen. | *(keep as fallback)* |

---

## Homepage `/`

**Title (proposed)**
```
Projecti — Architekturplanung und digitale Lösungen, Landquart
```
*55 characters*

**Description (proposed)**
```
Projecti unterstützt Immobilienentwickler mit strukturierter Planung und digitalen Workflows. Weniger Reibung, mehr Planbarkeit – aus Landquart, Schweiz.
```
*152 characters*

---

## Über `/ueber`

**Title (proposed)**
```
Über Projecti — Luka Došen, Gründer und Architekt
```
*50 characters*

**Description (proposed)**
```
Seit über neun Jahren plane ich Wohnbauprojekte in der Deutschschweiz. 2025 habe ich Projecti gegründet – für strukturiertere, effizientere Immobilienentwicklung.
```
*163 characters — trim if needed:*
```
Seit über neun Jahren plane ich Wohnbauprojekte in der Deutschschweiz. Projecti steht für strukturierte Planung mit digitalen Workflows.
```
*136 characters*

---

## Planung `/planung`

**Title (proposed)**
```
Planung — Strategische Architekturplanung für Immobilienprojekte
```
*64 characters — slightly long, alternative:*
```
Architekturplanung für Immobilienprojekte | Projecti
```
*52 characters*

**Description (proposed)**
```
Von der Machbarkeitsstudie bis zur Ausführungsplanung: Projecti begleitet Immobilienentwickler mit strukturierten Planungsprozessen und klaren Verantwortlichkeiten.
```
*163 characters — trim:*
```
Von der Machbarkeitsstudie bis zur Ausführungsplanung – strukturierte Planungsprozesse mit klaren Verantwortlichkeiten. Aus Landquart, Schweiz.
```
*143 characters*

---

## Digitale Lösungen `/digitale-loesungen`

**Title (proposed)**
```
Digitale Lösungen für Immobilienprojekte | Projecti
```
*51 characters*

**Description (proposed)**
```
Digitale Workflows, Projektmanagementsysteme und AI-gestützte Prozesse für Immobilienentwickler. Projecti macht Bauprojekte planbarer und effizienter.
```
*150 characters*

---

## Projekte `/projekte`

**Title (proposed)**
```
Projekte — Referenzen von Projecti
```
*35 characters*

**Description (proposed)**
```
Einblick in abgeschlossene und laufende Immobilienprojekte von Projecti. Wohnbauprojekte in der Deutschschweiz, strukturiert umgesetzt.
```
*135 characters*

---

## Ressourcen `/ressourcen`

**Title (proposed)**
```
Ressourcen — Wissen rund um Planung und Immobilienentwicklung
```
*61 characters — trim:*
```
Ressourcen zu Planung und Immobilienentwicklung | Projecti
```
*58 characters*

**Description (proposed)**
```
Praxisnahe Artikel, Checklisten und Einblicke rund um Architekturplanung, digitale Workflows und Immobilienentwicklung in der Schweiz.
```
*133 characters*

---

## Kontakt `/kontakt`

**Title (proposed)**
```
Kontakt — Projecti, Landquart
```
*30 characters*

**Description (proposed)**
```
Nimm Kontakt auf mit Projecti. Für Fragen zu Architekturplanung, digitalen Lösungen oder einem unverbindlichen Erstgespräch – wir freuen uns von dir zu hören.
```
*158 characters*

---

## Rechtliches `/rechtliches`

**Title (proposed)**
```
Impressum & Datenschutz | Projecti
```
*34 characters*

**Description (proposed)**
```
Impressum, Datenschutzerklärung und rechtliche Hinweise von Projecti, Bahnhofstrasse 11, 7302 Landquart, Schweiz.
```
*112 characters*

> Note: The Rechtliches page doesn't need to rank — it's fine to keep the description minimal. We could also add `noindex` to this page so search engines don't index it.

---

## Notes for review

- **Adjust anything** that doesn't sound right — especially the descriptions, which are the first thing a potential client reads in Google.
- Once approved, I'll wire these into the code and also set up the full OpenGraph/Twitter card block (using the same titles/descriptions by default).
- For the **social preview image** (the thumbnail that appears when sharing a link on LinkedIn, WhatsApp etc.) — do you have a image you'd like to use, or should I set up a plain image with the Projecti logo on a dark background?
- Let me know your **Google Analytics Measurement ID** (format: `G-XXXXXXXXXX`) when you're ready and I'll add that at the same time.
