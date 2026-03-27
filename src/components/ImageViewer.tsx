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
    <div className="bg-foreground/95 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-foreground">
        <span className="text-sm text-primary-foreground/80 font-medium">{title}</span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleTool("ZoomAndPan")}
            aria-label="Zoom en pan"
            aria-pressed={activeTool === "ZoomAndPan"}
            className={`text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 ${
              activeTool === "ZoomAndPan" ? "bg-primary-foreground/20" : ""
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
            className={`text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 ${
              activeTool === "WindowLevel" ? "bg-primary-foreground/20" : ""
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
            className={`text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 ${
              activeTool === "Scroll" ? "bg-primary-foreground/20" : ""
            }`}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            aria-label="Reset weergave"
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <RotateCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* DICOM viewer area */}
      <div className="relative min-h-[500px]" ref={containerRef}>
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-foreground/95">
            <Loader2 className="w-8 h-8 animate-spin text-primary-foreground/60" />
            <p className="text-sm text-primary-foreground/60 mt-3">DICOM-beeld wordt geladen...</p>
            <div className="w-48 h-2 bg-primary-foreground/10 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-secondary rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-primary-foreground/40 mt-1">{Math.min(Math.round(progress), 100)}%</p>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-foreground/95">
            <FileImage className="w-12 h-12 text-accent/60 mb-3" />
            <p className="text-sm text-accent">{error}</p>
            <p className="text-xs text-primary-foreground/40 mt-1">Controleer of het DICOM-bestand bereikbaar is</p>
          </div>
        )}
        <div id="dwv-layerGroup" className="w-full min-h-[500px]" />
      </div>
    </div>
  );
}

/** Fallback simulated viewer for documents without DICOM data */
function SimulatedViewer({ title }: { title: string }) {
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return p + Math.random() * 20;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-foreground/95 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-foreground">
        <span className="text-sm text-primary-foreground/80 font-medium">{title}</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))} aria-label="Uitzoomen" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-xs text-primary-foreground/60 w-12 text-center">{Math.round(zoom * 100)}%</span>
          <Button variant="ghost" size="icon" onClick={() => setZoom((z) => Math.min(3, z + 0.25))} aria-label="Inzoomen" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setZoom(1)} aria-label="Reset zoom" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
            <RotateCw className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="relative flex items-center justify-center min-h-[400px] overflow-auto">
        {loading ? (
          <div className="flex flex-col items-center gap-3 text-primary-foreground/60">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-sm">Beeld wordt geladen...</p>
            <div className="w-48 h-2 bg-primary-foreground/10 rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
            </div>
            <p className="text-xs">{Math.min(Math.round(progress), 100)}%</p>
          </div>
        ) : (
          <div className="transition-transform duration-200" style={{ transform: `scale(${zoom})` }}>
            <div className="w-[400px] h-[400px] bg-foreground/80 rounded flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-gradient-to-br from-primary-foreground/30 via-primary-foreground/10 to-transparent rounded" />
              </div>
              <div className="text-center z-10">
                <p className="text-primary-foreground/50 text-sm">Gesimuleerd medisch beeld</p>
                <p className="text-primary-foreground/30 text-xs mt-1">(Geen DICOM-data beschikbaar)</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageViewer;
