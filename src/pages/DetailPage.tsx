import { useParams, useNavigate, Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "@/components/AppLayout";
import DownloadDialog from "@/components/DownloadDialog";
import LinkedDocumentCard from "@/components/LinkedDocumentCard";
import { documents, getLinkedDocuments } from "@/data/testdata";
import { Calendar, Building2, User, FileImage, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/formatDate";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ImageViewer = lazy(() => import("@/components/ImageViewer"));
const ReportViewer = lazy(() => import("@/components/ReportViewer"));

function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const doc = documents.find((d) => d.id === id);
  if (!doc) {
    return (
      <AppLayout>
        <div className="text-center py-16">
          <p className="text-muted-foreground">Document niet gevonden.</p>
          <Button variant="outline" onClick={() => navigate("/beelden")} className="mt-4">
            Terug naar overzicht
          </Button>
        </div>
      </AppLayout>
    );
  }

  const linkedDocs = getLinkedDocuments(doc);

  return (
    <AppLayout>
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/beelden">Beelden en verslagen</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{doc.title || "Document"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main content */}
        <div>
          <h1 className="text-2xl font-bold mb-4">
            {doc.title || <span className="italic text-muted-foreground">Titel ontbreekt</span>}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {formatDateTime(doc.date)}
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Building2 className="w-4 h-4" />
              {doc.organization}
            </span>
            {doc.practitioner && (
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <User className="w-4 h-4" />
                {doc.practitioner}
              </span>
            )}
            {doc.modalityFriendly && (
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <FileImage className="w-4 h-4" />
                {doc.modalityFriendly}
              </span>
            )}
          </div>

          {/* Viewer */}
          <Suspense fallback={<div className="flex items-center justify-center min-h-[400px] bg-card border rounded-lg"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>}>
            {doc.type === "image" ? (
              <ImageViewer title={doc.title || "Beeld"} dicomUrls={doc.dicomUrls} />
            ) : (
              <ReportViewer title={doc.title || "Verslag"} reportId={doc.reportId} />
            )}
          </Suspense>

          {/* Download section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Downloaden</h2>
            <DownloadDialog doc={doc} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {linkedDocs.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold mb-3 uppercase tracking-wide text-muted-foreground">
                Gekoppelde documenten
              </h2>
              <div className="space-y-2">
                {linkedDocs.map((linked) => (
                  <LinkedDocumentCard key={linked.id} doc={linked} />
                ))}
              </div>
            </div>
          )}

          <div className="bg-card border rounded-lg p-4">
            <h2 className="text-sm font-semibold mb-3 uppercase tracking-wide text-muted-foreground">
              Details
            </h2>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-muted-foreground">Type</dt>
                <dd className="font-medium">{doc.type === "image" ? "Beeld" : "Verslag"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Onderzoeksdatum</dt>
                <dd className="font-medium">{formatDateTime(doc.date)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Zorgaanbieder</dt>
                <dd className="font-medium">{doc.organization}</dd>
              </div>
              {doc.practitioner && (
                <div>
                  <dt className="text-muted-foreground">Uitvoerend zorgverlener</dt>
                  <dd className="font-medium">{doc.practitioner}</dd>
                </div>
              )}
              {doc.modalityFriendly && (
                <div>
                  <dt className="text-muted-foreground">Type beeld</dt>
                  <dd className="font-medium">{doc.modalityFriendly}</dd>
                </div>
              )}
            </dl>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}

export default DetailPage;
