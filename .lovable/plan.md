

## Plan: GitHub issues aanmaken + issues 1-3 oplossen

### Stap 1: GitHub issues aanmaken via script
Een edge function of exec-script dat via de GitHub API 3 issues aanmaakt in `jasprin/medmij-prototype-bbs` met het `GITHUB_TOKEN` secret:

1. **PDF-verslagen laden niet** — "Fout bij laden van PDF" voor rpt-5-3 en rpt-extra-1
2. **Beeld 22-08-2024 identiek aan 05-11-2024** — Beide tonen visueel hetzelfde CT-beeld
3. **Beeld 10-06-2024 identiek aan 25-02-2025** — Beide tonen dezelfde röntgenfoto

### Stap 2: Fix PDF-verslagen (issue 1)
**Oorzaak:** De `react-pdf` v10 worker URL gebruikt een `.mjs` pad via unpkg dat niet correct resolvet. 

**Oplossing:** Wijzig `ReportViewer.tsx` — gebruik de worker vanuit `pdfjs-dist` via een CDN met de juiste URL-structuur voor v10 (bijv. `cdnjs.cloudflare.com` of een inline import via `new URL`).

### Stap 3: Fix identieke beelden (issues 2 + 3)
Wijs unieke DICOM-bestanden toe in `testdata.ts`. Beschikbare series in de GitHub repo:

```text
Studie                          Serie                    Huidige toewijzing
─────────────────────────────── ──────────────────────── ──────────────────
Medmij_Pgo_Test_Ct - 93797336  Localizers_1/IM-0004     img-5-1  (22-08)
                                Head_100_Qr40_S2_2/IM-0003  (vrij)
Medmij_Pgo_Ct - 74224547       Quick_Check_CT_300_1/IM-0001 img-5-2  (17-01)
                                Patient_Protocol_501/IM-0002 img-extra-2 (05-11)
Cr_Cwk_Medmij - 6003297769     Bekken_AP_1/IM-0006      img-5-3  (25-02)
                                Bekken_AP_2/IM-0007      img-extra-1 (10-06)
```

**Nieuwe toewijzing** — elk item krijgt een visueel uniek bestand:

| Item | Datum | Nieuw DICOM-bestand |
|------|-------|---------------------|
| img-5-1 | 22-08-2024 | `Medmij_Pgo_Test_Ct/Localizers_1/IM-0004-0001.dcm` (ongewijzigd) |
| img-5-2 | 17-01-2025 | `Medmij_Pgo_Ct/Quick_Check_CT_300_1/IM-0001-0001.dcm` (ongewijzigd) |
| img-5-3 | 25-02-2025 | `Cr_Cwk_Medmij/Bekken_AP_1/IM-0006-0001.dcm` (ongewijzigd) |
| img-extra-1 | 10-06-2024 | `Medmij_Pgo_Test_Ct/Head_100_Qr40_S2_2/IM-0003-0001.dcm` (was Bekken_AP_2) |
| img-extra-2 | 05-11-2024 | `Cr_Cwk_Medmij/Bekken_AP_2/IM-0007-0001.dcm` (was Patient_Protocol_501) |

Dit zorgt ervoor dat alle 5 beelden uit verschillende series komen en visueel te onderscheiden zijn.

### Technische details

**Bestanden die wijzigen:**
- `src/components/ReportViewer.tsx` — worker URL fix
- `src/data/testdata.ts` — DICOM URL-toewijzingen aanpassen voor img-extra-1 en img-extra-2

**Script (eenmalig via exec):**
- Curl-commando's naar `api.github.com` met het GITHUB_TOKEN om de 3 issues aan te maken

