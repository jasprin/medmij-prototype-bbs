import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async () => {
  const token = Deno.env.get("GITHUB_TOKEN");
  if (!token) return new Response("No GITHUB_TOKEN", { status: 500 });

  const repo = "jasprin/medmij-prototype-bbs";
  const api = `https://api.github.com/repos/${repo}/issues`;
  const headers = {
    Authorization: `token ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };

  const issues = [
    {
      title: "Nieuwe patiënt en complete tijdlijn met 10 onderzoeken",
      body: `## Beschrijving\nVervang de huidige testdata (patiënt "B. XXX-Aansluittest-B") door een realistische patiënt:\n\n| Veld | Waarde |\n|------|--------|\n| Naam | M.E. van den Berg |\n| Geslacht | Vrouw |\n| Geboortedatum | 1958-09-14 |\n| BSN | 999990027 |\n\n### Nieuwe tijdlijn (10 onderzoeken)\n| # | Datum | Type | Titel | Modaliteit | Organisatie | Acc.Nr |\n|---|-------|------|-------|------------|-------------|--------|\n| 1 | 2023-11-15 | beeld | Röntgen thorax | CR | Franciscus Gasthuis | ACC-101 |\n| 2 | 2023-11-15 | verslag | Röntgen thorax | - | Franciscus Gasthuis | ACC-101 |\n| 3 | 2024-03-08 | beeld | CT abdomen | CT | Erasmus MC | ACC-102 |\n| 4 | 2024-03-08 | verslag | CT abdomen | - | Erasmus MC | ACC-102 |\n| 5 | 2024-06-21 | beeld | Röntgen bekken | CR | Franciscus Gasthuis | ACC-103 |\n| 6 | 2024-09-12 | beeld | CT hoofd | CT | Erasmus MC | ACC-104 |\n| 7 | 2024-09-12 | verslag | CT hoofd | - | Erasmus MC | ACC-104 |\n| 8 | 2024-12-03 | beeld | CT thorax | CT | Ikazia Ziekenhuis | ACC-105 |\n| 9 | 2025-01-22 | beeld | Röntgen bekken controle | CR | Franciscus Gasthuis | ACC-106 |\n| 10 | 2025-01-22 | verslag | Röntgen bekken controle | - | Franciscus Gasthuis | ACC-106 |\n\n### Bestanden\n- \`src/data/testdata.ts\` — volledig herschrijven`,
    },
    {
      title: "Unieke DICOM-toewijzing — geen hergebruik van bestanden",
      body: `## Beschrijving\nElk DICOM-bestand uit de MedMij repo mag maximaal 1x gebruikt worden in de tijdlijn.\n\n### Beschikbare bestanden (7 stuks)\n\`\`\`\nCr_Cwk_Medmij/unnamed_-1/IM-0005-0001-0001.dcm     → Röntgen thorax\nCr_Cwk_Medmij/Bekken_AP_1/IM-0006-0001.dcm          → Röntgen bekken\nCr_Cwk_Medmij/Bekken_AP_2/IM-0007-0001.dcm          → Röntgen bekken controle\nMedmij_Pgo_Test_Ct/Localizers_1/IM-0004-0001.dcm    → CT abdomen\nMedmij_Pgo_Test_Ct/Head_100_Qr40_S2_2/IM-0003-0001.dcm → CT hoofd\nMedmij_Pgo_Ct/Quick_Check_CT_300_1/IM-0001-0001.dcm → CT thorax\nMedmij_Pgo_Ct/Patient_Protocol_501/IM-0002-0001.dcm → (reserve)\n\`\`\`\n\n### Bestanden\n- \`src/data/testdata.ts\``,
    },
    {
      title: "PDF-verslagen laden niet (worker URL fout)",
      body: `## Beschrijving\nDe \`react-pdf\` v10 worker URL resolvet niet correct, waardoor alle PDF-verslagen "Fout bij laden van PDF" tonen.\n\n### Huidige code\n\`\`\`ts\npdfjs.GlobalWorkerOptions.workerSrc = \`//cdnjs.cloudflare.com/ajax/libs/pdf.js/\${pdfjs.version}/pdf.worker.min.mjs\`;\n\`\`\`\n\n### Oplossing\nGebruik een compatible worker URL voor react-pdf v10 / pdfjs-dist v4.\n\n### Bestanden\n- \`src/components/ReportViewer.tsx\``,
    },
    {
      title: "Verslagdata uitbreiden naar 4 rapporten",
      body: `## Beschrijving\nUpdate \`reportData.ts\` zodat de report-ID's aansluiten bij de nieuwe tijdlijn.\n\n### Nieuwe report-ID's\n- \`rpt-1\` → Röntgen thorax (ACC-101)\n- \`rpt-2\` → CT abdomen (ACC-102)\n- \`rpt-3\` → CT hoofd (ACC-104)\n- \`rpt-4\` → Röntgen bekken controle (ACC-106)\n\n### Bestanden\n- \`src/data/reportData.ts\``,
    },
  ];

  const results = [];
  for (const issue of issues) {
    const res = await fetch(api, { method: "POST", headers, body: JSON.stringify(issue) });
    const data = await res.json();
    results.push({ number: data.number, title: data.title, url: data.html_url });
  }

  return new Response(JSON.stringify(results, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
});
