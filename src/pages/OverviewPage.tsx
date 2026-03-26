import { useState, useMemo } from "react";
import AppLayout from "@/components/AppLayout";
import PatientHeader from "@/components/PatientHeader";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import FilterBar from "@/components/FilterBar";
import DocumentTable from "@/components/DocumentTable";
import DocumentTimeline from "@/components/DocumentTimeline";
import { documents } from "@/data/testdata";
import { LayoutList, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

function OverviewPage() {
  const [view, setView] = useState<"table" | "timeline">("table");
  const [sortAsc, setSortAsc] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredDocs = useMemo(() => {
    let result = [...documents];

    // Search filter R9
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((d) =>
        (d.title?.toLowerCase().includes(term)) ||
        d.organization.toLowerCase().includes(term) ||
        (d.practitioner?.toLowerCase().includes(term)) ||
        (d.modalityFriendly?.toLowerCase().includes(term))
      );
    }

    // Org filter R12
    if (selectedOrg !== "all") {
      result = result.filter((d) => d.organization === selectedOrg);
    }

    // Date filter R8
    if (dateFrom) {
      result = result.filter((d) => new Date(d.date) >= new Date(dateFrom));
    }
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59);
      result = result.filter((d) => new Date(d.date) <= to);
    }

    // Sort R6
    result.sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortAsc ? diff : -diff;
    });

    return result;
  }, [searchTerm, selectedOrg, dateFrom, dateTo, sortAsc]);

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-2">Beelden en verslagen</h1>
      <p className="text-muted-foreground mb-6">
        Overzicht van al uw medische beelden en verslagen van {new Set(documents.map(d => d.organization)).size} zorgaanbieder(s).
      </p>

      <PatientHeader />
      <DisclaimerBanner />
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedOrg={selectedOrg}
        onOrgChange={setSelectedOrg}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
      />

      {/* View toggle */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredDocs.length} resultaten
        </p>
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          <Button
            variant={view === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("table")}
            className="gap-1.5"
            aria-label="Tabelweergave"
            aria-pressed={view === "table"}
          >
            <LayoutList className="w-4 h-4" />
            <span className="hidden sm:inline">Tabel</span>
          </Button>
          <Button
            variant={view === "timeline" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("timeline")}
            className="gap-1.5"
            aria-label="Tijdlijnweergave"
            aria-pressed={view === "timeline"}
          >
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">Tijdlijn</span>
          </Button>
        </div>
      </div>

      {view === "table" ? (
        <DocumentTable
          documents={filteredDocs}
          sortAsc={sortAsc}
          onToggleSort={() => setSortAsc(!sortAsc)}
        />
      ) : (
        <DocumentTimeline documents={filteredDocs} />
      )}
    </AppLayout>
  );
}

export default OverviewPage;
