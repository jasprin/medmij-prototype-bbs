import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
serve(async () => {
  const token = Deno.env.get("GITHUB_TOKEN");
  const repo = "jasprin/medmij-prototype-bbs";
  const headers = { Authorization: `token ${token}`, Accept: "application/vnd.github+json", "Content-Type": "application/json" };
  const results = [];
  for (const num of [7, 8, 9, 10]) {
    await fetch(`https://api.github.com/repos/${repo}/issues/${num}/comments`, { method: "POST", headers, body: JSON.stringify({ body: "Opgelost: testdata herschreven met nieuwe patiënt M.E. van den Berg, 10 onderzoeken, unieke DICOM-toewijzingen, 4 verslagen, en PDF worker URL fix." }) });
    const r = await fetch(`https://api.github.com/repos/${repo}/issues/${num}`, { method: "PATCH", headers, body: JSON.stringify({ state: "closed" }) });
    const d = await r.json();
    results.push({ number: d.number, state: d.state });
  }
  return new Response(JSON.stringify(results));
});
