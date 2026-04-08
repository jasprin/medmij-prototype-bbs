import { useState } from "react";
import { AlertTriangle, Clock, X } from "lucide-react";

const STORAGE_KEY = "disclaimer-dismissed";

function DisclaimerBanner() {
  const [showDisclaimer, setShowDisclaimer] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== "true";
    } catch {
      return true;
    }
  });

  const handleDismiss = () => {
    setShowDisclaimer(false);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  };

  if (!showDisclaimer) return null;

  return (
    <div className="space-y-3 mb-6">
      {/* Disclaimer R14 */}
      <div
        className="relative rounded-lg border border-accent/40 bg-accent/10 p-4 pr-10"
        role="alert"
        aria-label="Disclaimer over interpretatie van beelden en verslagen"
      >
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 rounded hover:bg-accent/20 transition-colors"
          aria-label="Disclaimer sluiten"
        >
          <X className="w-4 h-4 text-foreground/60" />
        </button>
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm space-y-1">
            <p className="font-semibold">Let op bij het bekijken van uw beelden en verslagen</p>
            <p>Uw behandelend specialist heeft de beelden of de uitslag misschien nog niet bekeken of met u besproken.</p>
            <p>De informatie kan soms moeilijk te begrijpen zijn.</p>
            <p>Zonder extra uitleg kunt u de informatie verkeerd begrijpen.</p>
            <p className="font-medium">Bespreek uw vragen met uw behandelend specialist.</p>
          </div>
        </div>
      </div>

      {/* Delay warning R2 */}
      <div
        className="rounded-lg border border-info/30 bg-info/10 p-4"
        role="status"
        aria-label="Informatie over vertraging in beschikbaarheid"
      >
        <div className="flex gap-3">
          <Clock className="w-5 h-5 text-info shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm">
            <span className="font-medium">Vertraging mogelijk:</span>{" "}
            Er kan een aantal dagen vertraging zitten op de vrijgave van beelden en verslagen na de onderzoeksdatum.
            De tijdsduur is afhankelijk van de betreffende zorgaanbieder(s).
          </p>
        </div>
      </div>
    </div>
  );
}

export default DisclaimerBanner;
