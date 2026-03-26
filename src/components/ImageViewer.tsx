import { useState, useEffect } from "react";
import { ZoomIn, ZoomOut, RotateCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function ImageViewer({ title }: { title: string }) {
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading R3-AC5/6
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
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-foreground">
        <span className="text-sm text-primary-foreground/80 font-medium">{title}</span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
            aria-label="Uitzoomen"
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-xs text-primary-foreground/60 w-12 text-center">{Math.round(zoom * 100)}%</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
            aria-label="Inzoomen"
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom(1)}
            aria-label="Reset zoom"
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <RotateCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Image area */}
      <div className="relative flex items-center justify-center min-h-[400px] overflow-auto">
        {loading ? (
          <div className="flex flex-col items-center gap-3 text-primary-foreground/60">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-sm">Beeld wordt geladen...</p>
            <div className="w-48 h-2 bg-primary-foreground/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs">{Math.min(Math.round(progress), 100)}%</p>
          </div>
        ) : (
          <div
            className="transition-transform duration-200"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* Simulated medical image */}
            <div className="w-[400px] h-[400px] bg-foreground/80 rounded flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-20">
                {/* Simulated X-ray gradient */}
                <div className="w-full h-full bg-gradient-to-br from-primary-foreground/30 via-primary-foreground/10 to-transparent rounded" />
              </div>
              <div className="text-center z-10">
                <p className="text-primary-foreground/50 text-sm">Gesimuleerd medisch beeld</p>
                <p className="text-primary-foreground/30 text-xs mt-1">(Prototype — geen echte DICOM-data)</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageViewer;
