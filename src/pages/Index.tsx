import AppLayout from "@/components/AppLayout";
import PatientHeader from "@/components/PatientHeader";
import { patient, documents } from "@/data/testdata";
import { FileImage, FileText, Building2, ArrowRight, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { formatDateShort } from "@/lib/formatDate";

function HomePage() {
  const navigate = useNavigate();
  const imageCount = documents.filter((d) => d.type === "image").length;
  const reportCount = documents.filter((d) => d.type === "report").length;
  const orgCount = new Set(documents.map((d) => d.organization)).size;

  // Recent 5 items sorted newest first
  const recentDocs = [...documents]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6">Welkom, {patient.initials} {patient.familyName}</h1>
      <PatientHeader />

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="bg-card border rounded-lg p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileImage className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{imageCount}</p>
              <p className="text-sm text-muted-foreground">Beelden</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{reportCount}</p>
              <p className="text-sm text-muted-foreground">Verslagen</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{orgCount}</p>
              <p className="text-sm text-muted-foreground">Zorgaanbieders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Recente onderzoeken</h2>
        <div className="space-y-2">
          {recentDocs.map((doc) => (
            <button
              key={doc.id}
              onClick={() => navigate(`/beelden/${doc.id}`)}
              className="w-full text-left bg-card border rounded-lg p-4 hover:bg-muted/30 transition-colors flex items-center gap-4"
            >
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                {doc.type === "image" ? (
                  <FileImage className="w-4 h-4 text-primary" />
                ) : (
                  <FileText className="w-4 h-4 text-secondary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{doc.title || "Titel ontbreekt"}</p>
                <p className="text-xs text-muted-foreground">{doc.organization}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={doc.type === "image" ? "default" : "secondary"} className="text-xs">
                  {doc.type === "image" ? "Beeld" : "Verslag"}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDateShort(doc.date)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Link
        to="/beelden"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Bekijk alle beelden en verslagen
        <ArrowRight className="w-4 h-4" />
      </Link>
    </AppLayout>
  );
}

export default HomePage;
