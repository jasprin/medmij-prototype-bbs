

## Plan: 5 UX-verbeteringen + GitHub issues

### Overzicht
Eerst 5 GitHub issues aanmaken via een script, daarna de issues implementeren.

### Stap 1: GitHub issues aanmaken (script via `code--exec`)

**Issue #12: Disclaimer onthouden met localStorage**
De disclaimer-banner neemt ~30% van het scherm in en verschijnt elke sessie opnieuw. Gebruik `localStorage` om de dismiss-keuze te onthouden. Bestanden: `src/components/DisclaimerBanner.tsx`.

**Issue #13: Dashboard verrijken met recente activiteit**
De homepage toont alleen tellingen. Voeg een "Recente onderzoeken" sectie toe met de laatste 3-5 items als klikbare kaarten. Bestanden: `src/pages/Index.tsx`.

**Issue #14: Responsive standaard weergave (mobiel=tijdlijn, desktop=tabel)**
Gebruik de `useIsMobile` hook om automatisch de tijdlijnweergave te tonen op mobiel en de tabelweergave op desktop. Bestanden: `src/pages/OverviewPage.tsx`.

**Issue #15: Visuele groepering van gekoppelde documenten in tabel**
Groepeer beeld+verslag rijen die dezelfde `accessionNumber` delen met een subtiele achtergrondkleur of inspringing, zodat de relatie visueel duidelijk is. Bestanden: `src/components/DocumentTable.tsx`.

**Issue #16: Breadcrumbs op detailpagina's**
Voeg breadcrumb-navigatie toe aan detailpagina's (Home > Beelden en verslagen > [Documenttitel]) voor betere oriëntatie. Bestanden: `src/pages/DetailPage.tsx`, gebruik bestaand `src/components/ui/breadcrumb.tsx`.

### Stap 2: Implementatie (na goedkeuring)
Issues worden sequentieel opgelost, te beginnen met de eenvoudigste (disclaimer, breadcrumbs) en eindigend met de complexere (tabelgroepering, dashboard).

### Technisch
- Issues aanmaken via `curl` naar GitHub API met het `GITHUB_TOKEN` secret
- Repository: `jasprin/medmij-prototype-bbs`
- Ook de bestaande build error fixen: `ReportViewer.tsx` importeert `reportPdfSources` correct uit `reportData.ts` — dit lijkt een stale cache; wordt geverifieerd bij implementatie
- Geen nieuwe dependencies nodig

