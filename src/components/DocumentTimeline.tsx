import { DocumentItem, getLinkedDocuments } from "@/data/testdata";
import { useNavigate } from "react-router-dom";
import { FileImage, FileText, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatDate";
interface DocumentTimelineProps {
  documents: DocumentItem[];
}

function DocumentTimeline({ documents }: DocumentTimelineProps) {
  const navigate = useNavigate();


  // Group by date (day)
  const grouped = documents.reduce<Record<string, DocumentItem[]>>((acc, doc) => {
    const day = new Date(doc.date).toISOString().split("T")[0];
    if (!acc[day]) acc[day] = [];
    acc[day].push(doc);
    return acc;
  }, {});

  return (
    <div className="relative pl-8" role="list" aria-label="Tijdlijn beelden en verslagen">
      {/* Vertical line */}
      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" aria-hidden="true" />

      {Object.entries(grouped).map(([day, docs]) => (
        <div key={day} className="mb-6" role="listitem">
          {/* Date marker */}
          <div className="flex items-center gap-3 mb-3 -ml-8">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 z-10" aria-hidden="true">
              <div className="w-2 h-2 rounded-full bg-primary-foreground" />
            </div>
            <h3 className="text-sm font-semibold">{formatDate(docs[0].date)}</h3>
          </div>

          {/* Cards for this day */}
          <div className="space-y-2">
            {docs.map((doc) => {
              const linked = getLinkedDocuments(doc);
              return (
                <button
                  key={doc.id}
                  onClick={() => navigate(`/beelden/${doc.id}`)}
                  className="w-full text-left bg-card border rounded-lg p-4 hover:border-primary/40 hover:shadow-sm transition-all"
                  aria-label={`${doc.type === "image" ? "Beeld" : "Verslag"}: ${doc.title || "Titel ontbreekt"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={doc.type === "image" ? "default" : "secondary"} className="gap-1 shrink-0">
                          {doc.type === "image" ? (
                            <><FileImage className="w-3 h-3" /> Beeld</>
                          ) : (
                            <><FileText className="w-3 h-3" /> Verslag</>
                          )}
                        </Badge>
                        {doc.modalityFriendly && (
                          <span className="text-xs text-muted-foreground">{doc.modalityFriendly}</span>
                        )}
                      </div>
                      <p className="font-medium text-sm truncate">
                        {doc.title || <span className="italic text-muted-foreground">Titel ontbreekt</span>}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {doc.organization}
                        {doc.practitioner && ` — ${doc.practitioner}`}
                      </p>
                    </div>
                    {linked.length > 0 && (
                      <span className="flex items-center gap-1 text-secondary text-xs shrink-0">
                        <Link2 className="w-3.5 h-3.5" />
                        Gekoppeld
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {documents.length === 0 && (
        <p className="text-muted-foreground text-center py-8">Geen beelden of verslagen gevonden.</p>
      )}
    </div>
  );
}

export default DocumentTimeline;
