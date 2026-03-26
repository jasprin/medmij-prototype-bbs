import { useState } from "react";
import { Download, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentItem } from "@/data/testdata";

function DownloadDialog({ doc }: { doc: DocumentItem }) {
  const [showDicomWarning, setShowDicomWarning] = useState(false);

  const handleDownload = (format: string) => {
    // Prototype: no real download
    alert(`Download gestart: ${doc.title} (${format})`);
  };

  if (doc.type === "report") {
    return (
      <div>
        <Button
          onClick={() => handleDownload("PDF")}
          variant="outline"
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download verslag
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => handleDownload("JPEG")}
          variant="outline"
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download als JPEG
        </Button>
        <Button
          onClick={() => handleDownload("DICOM")}
          variant="outline"
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download als DICOM
        </Button>
      </div>

      {/* DICOM warning R10-AC3 */}
      <button
        onClick={() => setShowDicomWarning(!showDicomWarning)}
        className="flex items-center gap-2 text-sm text-accent hover:underline"
        aria-expanded={showDicomWarning}
      >
        <AlertTriangle className="w-4 h-4" />
        Waarschuwing bij DICOM-download
        {showDicomWarning ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {showDicomWarning && (
        <div className="rounded-lg border border-accent/30 bg-accent/10 p-4 text-sm space-y-2 animate-fade-in">
          <p>Dit bestand is in <strong>DICOM-formaat</strong>.</p>
          <p>Om dit bestand te openen heeft u een geschikte DICOM-viewer nodig op uw apparaat.</p>
          <p className="font-medium">⚠️ Dit bestand bevat persoonlijke medische gegevens.</p>
          <p>Verwachte bestandsgrootte: ~25 MB</p>
        </div>
      )}
    </div>
  );
}

export default DownloadDialog;
