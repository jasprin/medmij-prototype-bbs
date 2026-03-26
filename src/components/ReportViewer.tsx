import { FileText } from "lucide-react";

function ReportViewer({ title }: { title: string }) {
  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      <div className="p-3 border-b bg-muted/30">
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="p-8 min-h-[400px] flex flex-col items-center justify-center">
        <FileText className="w-16 h-16 text-muted-foreground/30 mb-4" aria-hidden="true" />
        <div className="max-w-md text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Gesimuleerd PDF-verslag (Prototype)
          </p>
          {/* Simulated report content */}
          <div className="text-left bg-muted/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-sm">Radiologieverslag</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Onderzoek:</span> {title}</p>
              <p><span className="font-medium">Datum:</span> 25 februari 2025</p>
              <p><span className="font-medium">Aanvrager:</span> Huisarts</p>
              <p className="mt-3"><span className="font-medium">Bevindingen:</span></p>
              <p className="text-muted-foreground">
                Dit is een gesimuleerd verslag voor prototype-doeleinden. 
                In een echte PGO-omgeving zou hier het daadwerkelijke radiologieverslag 
                worden weergegeven als inline PDF.
              </p>
              <p className="mt-3"><span className="font-medium">Conclusie:</span></p>
              <p className="text-muted-foreground">
                Geen afwijkingen gezien. Controle over 6 maanden aanbevolen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportViewer;
