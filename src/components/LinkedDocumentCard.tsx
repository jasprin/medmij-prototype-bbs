import { useNavigate } from "react-router-dom";
import { DocumentItem } from "@/data/testdata";
import { FileImage, FileText, Link2 } from "lucide-react";

function LinkedDocumentCard({ doc }: { doc: DocumentItem }) {
  const navigate = useNavigate();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("nl-NL", { day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <button
      onClick={() => navigate(`/beelden/${doc.id}`)}
      className="w-full text-left border rounded-lg p-4 hover:border-secondary/60 hover:shadow-sm transition-all bg-secondary/5"
      aria-label={`Ga naar gekoppeld ${doc.type === "image" ? "beeld" : "verslag"}: ${doc.title || "Titel ontbreekt"}`}
    >
      <div className="flex items-center gap-2 mb-2 text-secondary">
        <Link2 className="w-4 h-4" />
        <span className="text-xs font-medium uppercase tracking-wide">
          Gekoppeld {doc.type === "image" ? "beeld" : "verslag"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {doc.type === "image" ? (
          <FileImage className="w-4 h-4 text-muted-foreground" />
        ) : (
          <FileText className="w-4 h-4 text-muted-foreground" />
        )}
        <span className="text-sm font-medium">{doc.title || "Titel ontbreekt"}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{formatDate(doc.date)} — {doc.organization}</p>
    </button>
  );
}

export default LinkedDocumentCard;
