

## Plan: GitHub issues aanmaken voor nieuwe tijdlijn

### Wat
Via de GitHub API 4 issues aanmaken in `jasprin/medmij-prototype-bbs` op basis van het goedgekeurde plan.

### Issues

**Issue #1: Nieuwe patiënt en complete tijdlijn met 10 onderzoeken**
Vervang de huidige testdata door een realistische patiënt "M.E. van den Berg" met een tijdlijn van 10 onderzoeken (7 beelden + 4 verslagen) over 3 zorgaanbieders. Elk DICOM-bestand wordt maximaal 1x gebruikt.

**Issue #2: Unieke DICOM-toewijzing — geen hergebruik van bestanden**
Wijs alle 7 beschikbare DICOM-bestanden uit de GitHub repo elk precies 1x toe aan een tijdlijn-item. Huidige situatie: bestanden worden meermaals gebruikt waardoor beelden identiek lijken.

**Issue #3: PDF-verslagen laden niet (worker URL fout)**
De `react-pdf` v10 worker URL resolvet niet correct, waardoor alle PDF-verslagen "Fout bij laden van PDF" tonen. Fix de worker URL in `ReportViewer.tsx`.

**Issue #4: Verslagdata uitbreiden naar 4 rapporten**
Update `reportData.ts` met report-ID's die aansluiten bij de nieuwe tijdlijn (rpt-1 t/m rpt-4), zodat verslagen correct laden bij de bijbehorende onderzoeken.

### Technisch
- Eenmalig script via `code--exec` met `curl` naar `api.github.com`
- Gebruikt het bestaande `GITHUB_TOKEN` secret
- Repository: `jasprin/medmij-prototype-bbs`
- Issues worden aangemaakt met labels waar mogelijk

