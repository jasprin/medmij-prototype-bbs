import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
serve(async () => {
  const token = Deno.env.get("GITHUB_TOKEN");
  const repo = "jasprin/medmij-prototype-bbs";
  const headers = { Authorization: `token ${token}`, Accept: "application/vnd.github+json", "Content-Type": "application/json" };
  const results = [];
  for (const num of [12, 13, 14, 15, 16]) {
    const comments: Record<number, string> = {
      12: "Opgelost: DisclaimerBanner onthoudt dismiss-keuze via localStorage.",
      13: "Opgelost: Dashboard toont nu 5 recente onderzoeken als klikbare kaarten.",
      14: "Opgelost: Standaard tijdlijn op mobiel, tabel op desktop via useIsMobile hook.",
      15: "Opgelost: Rijen met dezelfde accessionNumber krijgen subtiele achtergrondkleur.",
      16: "Opgelost: Breadcrumbs toegevoegd op detailpagina's (Home > Beelden en verslagen > Titel).",
    };
    await fetch(`https://api.github.com/repos/${repo}/issues/${num}/comments`, { method: "POST", headers, body: JSON.stringify({ body: comments[num] }) });
    const r = await fetch(`https://api.github.com/repos/${repo}/issues/${num}`, { method: "PATCH", headers, body: JSON.stringify({ state: "closed" }) });
    const d = await r.json();
    results.push({ number: d.number, state: d.state });
  }
  return new Response(JSON.stringify(results));
});
