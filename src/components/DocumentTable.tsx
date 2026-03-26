import { DocumentItem } from "@/data/testdata";
import { useNavigate } from "react-router-dom";
import { ArrowUpDown, FileImage, FileText, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLinkedDocuments } from "@/data/testdata";

interface DocumentTableProps {
  documents: DocumentItem[];
  sortAsc: boolean;
  onToggleSort: () => void;
}

function DocumentTable({ documents, sortAsc, onToggleSort }: DocumentTableProps) {
  const navigate = useNavigate();

  const handleRowClick = (doc: DocumentItem) => {
    navigate(`/beelden/${doc.id}`);
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString("nl-NL", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-card rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" role="table" aria-label="Overzicht beelden en verslagen">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3 text-sm font-semibold">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleSort}
                  className="gap-1 -ml-2 font-semibold"
                  aria-label={`Sorteer op datum ${sortAsc ? "aflopend" : "oplopend"}`}
                >
                  Datum
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </Button>
              </th>
              <th className="text-left p-3 text-sm font-semibold">Type</th>
              <th className="text-left p-3 text-sm font-semibold">Naam onderzoek</th>
              <th className="text-left p-3 text-sm font-semibold">Zorgaanbieder</th>
              <th className="text-left p-3 text-sm font-semibold">Zorgverlener</th>
              <th className="text-left p-3 text-sm font-semibold">Modaliteit</th>
              <th className="text-left p-3 text-sm font-semibold">Koppeling</th>
            </tr>
          </thead>
          <tbody>
            {documents.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-8 text-muted-foreground">
                  Geen beelden of verslagen gevonden.
                </td>
              </tr>
            ) : (
              documents.map((doc) => {
                const linked = getLinkedDocuments(doc);
                return (
                  <tr
                    key={doc.id}
                    onClick={() => handleRowClick(doc)}
                    className="border-b last:border-b-0 hover:bg-muted/30 cursor-pointer transition-colors"
                    role="row"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handleRowClick(doc)}
                    aria-label={`${doc.type === "image" ? "Beeld" : "Verslag"}: ${doc.title || "Titel ontbreekt"}, ${formatDate(doc.date)}`}
                  >
                    <td className="p-3 text-sm whitespace-nowrap">
                      <div>{formatDate(doc.date)}</div>
                      <div className="text-xs text-muted-foreground">{formatTime(doc.date)}</div>
                    </td>
                    <td className="p-3">
                      <Badge variant={doc.type === "image" ? "default" : "secondary"} className="gap-1">
                        {doc.type === "image" ? (
                          <><FileImage className="w-3 h-3" /> Beeld</>
                        ) : (
                          <><FileText className="w-3 h-3" /> Verslag</>
                        )}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm">
                      {doc.title || (
                        <span className="italic text-muted-foreground">Titel ontbreekt</span>
                      )}
                    </td>
                    <td className="p-3 text-sm">{doc.organization}</td>
                    <td className="p-3 text-sm">
                      {doc.practitioner || (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="p-3 text-sm">
                      {doc.modalityFriendly || (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="p-3 text-sm">
                      {linked.length > 0 && (
                        <span className="flex items-center gap-1 text-secondary">
                          <Link2 className="w-3.5 h-3.5" />
                          <span className="text-xs">
                            {linked[0].type === "image" ? "Beeld" : "Verslag"}
                          </span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DocumentTable;
