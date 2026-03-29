import { useState, useEffect, useRef, useCallback } from "react";
import { ZoomIn, ZoomOut, RotateCw, Loader2, Contrast, Move, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { App, AppOptions, ViewConfig, ToolConfig } from "dwv";

interface ImageViewerProps {
  title: string;
  dicomUrls?: string[];
}

function ImageViewer({ title, dicomUrls }: ImageViewerProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string>("ZoomAndPan");
  const [dataReady, setDataReady] = useState(false);
  const appRef = useRef<App | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (!dicomUrls?.length || initRef.current) return;
    initRef.current = true;

    const dwvApp = new App();
    appRef.current = dwvApp;

    const layerGroupId = "dwv-layerGroup";
    const viewConfig = new ViewConfig(layerGroupId);
    const viewConfigs = { "*": [viewConfig] };
    const options = new AppOptions(viewConfigs);
    options.tools = {
      ZoomAndPan: new ToolConfig(),
      WindowLevel: new ToolConfig(),
      Scroll: new ToolConfig(),
    };

    dwvApp.init(options);

    dwvApp.addEventListener("loadprogress", (event: { loaded: number }) => {
      setProgress(event.loaded);
    });

    dwvApp.addEventListener("load", () => {
      setProgress(100);
      setLoading(false);
    });

    dwvApp.addEventListener("renderend", () => {
      setDataReady(true);
    });

    dwvApp.addEventListener("loaderror", (event: { error: unknown }) => {
      console.error("DICOM load error:", event.error);
      setError("Fout bij laden van DICOM-bestand");
      setLoading(false);
    });

    try {
      dwvApp.loadURLs(dicomUrls);
    } catch (e) {
      console.error("Failed to load DICOM URLs:", e);
      setError("Kan DICOM-bestanden niet laden");
      setLoading(false);
    }

    return () => {
      try {
        dwvApp.abortAllLoads();
      } catch {
        // ignore
      }
    };
  }, [dicomUrls]);

  const handleTool = useCallback((toolName: string) => {
    if (appRef.current && dataReady) {
      try {
        appRef.current.setTool(toolName);
        setActiveTool(toolName);
      } catch (e) {
        console.warn("Tool switch failed:", e);
      }
    }
  }, [dataReady]);

  const handleReset = useCallback(() => {
    if (appRef.current && dataReady) {
      try {
        appRef.current.resetZoomPan();
      } catch {
        // ignore
      }
    }
  }, [dataReady]);

  // Fallback if no DICOM URLs provided
  if (!dicomUrls?.length) {
    return <SimulatedViewer title={title} />;
  }

  return (
    <div className="bg-viewer/95 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-viewer">
        <span className="text-sm text-viewer-foreground/80 font-medium">{title}</span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleTool("ZoomAndPan")}
            aria-label="Zoom en pan"
            aria-pressed={activeTool === "ZoomAndPan"}
            className={`text-viewer-foreground/80 hover:text-viewer-foreground hover:bg-viewer-foreground/10 ${
              activeTool === "ZoomAndPan" ? "bg-viewer-foreground/20" : ""
            }`}
          >
            <Move className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleTool("WindowLevel")}
            aria-label="Window/Level (contrast)"
            aria-pressed={activeTool === "WindowLevel"}
            className={`text-viewer-foreground/80 hover:text-viewer-foreground hover:bg-viewer-foreground/10 ${
              activeTool === "WindowLevel" ? "bg-viewer-foreground/20" : ""
            }`}
          >
            <Contrast className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleTool("Scroll")}
            aria-label="Scroll door beelden"
            aria-pressed={activeTool === "Scroll"}
            className={`text-viewer-foreground/80 hover:text-viewer-foreground hover:bg-viewer-foreground/10 ${
              activeTool === "Scroll" ? "bg-viewer-foreground/20" : ""
            }`}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            aria-label="Reset weergave"
            className="text-viewer-foreground/80 hover:text-viewer-foreground hover:bg-viewer-foreground/10"
          >
            <RotateCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* DICOM viewer area */}
      <div className="relative min-h-[500px]" ref={containerRef}>
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-viewer/95">
            <Loader2 className="w-8 h-8 animate-spin text-viewer-foreground/60" />
            <p className="text-sm text-viewer-foreground/60 mt-3">DICOM-beeld wordt geladen...</p>
            <div className="w-48 h-2 bg-viewer-foreground/10 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-secondary rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-viewer-foreground/40 mt-1">{Math.min(Math.round(progress), 100)}%</p>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-viewer/95">
            <FileImage className="w-12 h-12 text-accent/60 mb-3" />
            <p className="text-sm text-accent">{error}</p>
            <p className="text-xs text-viewer-foreground/40 mt-1">Controleer of het DICOM-bestand bereikbaar is</p>
          </div>
        )}
        <div id="dwv-layerGroup" className="w-full min-h-[500px]" />
      </div>
    </div>
  );
}

/** Fallback when no DICOM data is available */
function SimulatedViewer({ title }: { title: string }) {
  return (
    <div className="bg-viewer/95 rounded-lg overflow-hidden">
      <div className="p-3 bg-viewer">
        <span className="text-sm text-viewer-foreground/80 font-medium">{title}</span>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <FileImage className="w-12 h-12 text-viewer-foreground/20 mb-3" />
        <p className="text-sm text-viewer-foreground/50">Geen DICOM-data beschikbaar</p>
        <p className="text-xs text-viewer-foreground/30 mt-1">Dit beeld is niet opgenomen in de testdata</p>
      </div>
    </div>
  );
}

export default ImageViewer;
