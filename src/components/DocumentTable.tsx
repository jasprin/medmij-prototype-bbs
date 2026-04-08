import { DocumentItem } from "@/data/testdata";
import { useNavigate } from "react-router-dom";
import { ArrowUpDown, FileImage, FileText, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLinkedDocuments } from "@/data/testdata";
import { formatDateShort, formatTime } from "@/lib/formatDate";
import { useMemo } from "react";

interface DocumentTableProps {
  documents: DocumentItem[];
  sortAsc: boolean;
  onToggleSort: () => void;
}

/** Assign alternating background colors to accession groups */
function useAccessionGroups(documents: DocumentItem[]) {
  return useMemo(() => {
    const groupMap = new Map<string, number>();
    let colorIndex = 0;
    const result: (number | null)[] = [];

    for (const doc of documents) {
      if (!doc.accessionNumber) {
        result.push(null);
        continue;
      }
      if (!groupMap.has(doc.accessionNumber)) {
        // Only color groups with >1 member
        const count = documents.filter(d => d.accessionNumber === doc.accessionNumber).length;
        if (count > 1) {
          groupMap.set(doc.accessionNumber, colorIndex++);
        } else {
          groupMap.set(doc.accessionNumber, -1);
        }
      }
      const idx = groupMap.get(doc.accessionNumber)!;
      result.push(idx >= 0 ? idx : null);
    }
    return result;
  }, [documents]);
}

const GROUP_COLORS = [
  "bg-primary/5",
  "bg-secondary/5",
  "bg-accent/5",
  "bg-muted/40",
];

function DocumentTable({ documents, sortAsc, onToggleSort }: DocumentTableProps) {
  const navigate = useNavigate();
  const groups = useAccessionGroups(documents);

  const handleRowClick = (doc: DocumentItem) => {
    navigate(`/beelden/${doc.id}`);
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
              documents.map((doc, idx) => {
                const linked = getLinkedDocuments(doc);
                const groupIdx = groups[idx];
                const groupClass = groupIdx !== null ? GROUP_COLORS[groupIdx % GROUP_COLORS.length] : "";

                return (
                  <tr
                    key={doc.id}
                    onClick={() => handleRowClick(doc)}
                    className={`border-b last:border-b-0 hover:bg-muted/30 cursor-pointer transition-colors ${groupClass}`}
                    role="row"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handleRowClick(doc)}
                    aria-label={`${doc.type === "image" ? "Beeld" : "Verslag"}: ${doc.title || "Titel ontbreekt"}, ${formatDateShort(doc.date)}`}
                  >
                    <td className="p-3 text-sm whitespace-nowrap">
                      <div>{formatDateShort(doc.date)}</div>
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
