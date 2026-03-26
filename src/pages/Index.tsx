import AppLayout from "@/components/AppLayout";
import PatientHeader from "@/components/PatientHeader";
import { patient, documents } from "@/data/testdata";
import { FileImage, FileText, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function HomePage() {
  const imageCount = documents.filter((d) => d.type === "image").length;
  const reportCount = documents.filter((d) => d.type === "report").length;
  const orgCount = new Set(documents.map((d) => d.organization)).size;

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

      <Link
        to="/beelden"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Bekijk beelden en verslagen
        <ArrowRight className="w-4 h-4" />
      </Link>
    </AppLayout>
  );
}

export default HomePage;
