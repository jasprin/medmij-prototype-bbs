import { useState, useMemo } from "react";
import { FileText, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { reportPdfBase64 } from "@/data/reportData";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

interface ReportViewerProps {
  title: string;
  reportId?: string;
}

function ReportViewer({ title, reportId }: ReportViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const pdfDataUrl = useMemo(() => {
    if (!reportId || !reportPdfBase64[reportId]) return null;
    return `data:application/pdf;base64,${reportPdfBase64[reportId]}`;
  }, [reportId]);

  if (!pdfDataUrl) {
    return <SimulatedReport title={title} />;
  }

  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b bg-muted/30">
        <span className="text-sm font-medium">{title}</span>
        {numPages > 1 && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={pageNumber <= 1}
              aria-label="Vorige pagina"
              className="h-8 w-8"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-xs text-muted-foreground">
              {pageNumber} / {numPages}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
              disabled={pageNumber >= numPages}
              aria-label="Volgende pagina"
              className="h-8 w-8"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      <div className="flex justify-center p-4 min-h-[500px] bg-muted/10 overflow-auto">
        {loading && (
          <div className="absolute flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">PDF wordt geladen...</p>
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center justify-center">
            <FileText className="w-12 h-12 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground">Fout bij laden van PDF</p>
          </div>
        )}
        <Document
          file={pdfDataUrl}
          onLoadSuccess={({ numPages: n }) => {
            setNumPages(n);
            setLoading(false);
          }}
          onLoadError={() => {
            setError(true);
            setLoading(false);
          }}
          loading={null}
        >
          <Page
            pageNumber={pageNumber}
            width={560}
            renderAnnotationLayer
            renderTextLayer
          />
        </Document>
      </div>
    </div>
  );
}

/** Fallback when no PDF data is available */
function SimulatedReport({ title }: { title: string }) {
  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      <div className="p-3 border-b bg-muted/30">
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <FileText className="w-12 h-12 text-muted-foreground/20 mb-3" />
        <p className="text-sm text-muted-foreground">Geen verslagdata beschikbaar</p>
        <p className="text-xs text-muted-foreground/50 mt-1">Dit verslag is niet opgenomen in de testdata</p>
      </div>
    </div>
  );
}

export default ReportViewer;
