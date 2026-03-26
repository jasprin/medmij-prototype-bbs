import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getOrganizations } from "@/data/testdata";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedOrg: string;
  onOrgChange: (value: string) => void;
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
}

function FilterBar({
  searchTerm, onSearchChange,
  selectedOrg, onOrgChange,
  dateFrom, dateTo, onDateFromChange, onDateToChange,
}: FilterBarProps) {
  const organizations = getOrganizations();

  return (
    <div className="flex flex-wrap gap-3 mb-6" role="search" aria-label="Filter beelden en verslagen">
      {/* Search R9 */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
        <Input
          type="search"
          placeholder="Zoek op naam onderzoek..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
          aria-label="Zoek beelden en verslagen"
        />
      </div>

      {/* Organization filter R12 */}
      <Select value={selectedOrg} onValueChange={onOrgChange}>
        <SelectTrigger className="w-[240px]" aria-label="Filter op zorgaanbieder">
          <SelectValue placeholder="Alle zorgaanbieders" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle zorgaanbieders</SelectItem>
          {organizations.map((org) => (
            <SelectItem key={org} value={org}>{org}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Date filter R8 */}
      <div className="flex items-center gap-2">
        <label htmlFor="date-from" className="text-sm text-muted-foreground whitespace-nowrap">Van:</label>
        <Input
          id="date-from"
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          className="w-[160px]"
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="date-to" className="text-sm text-muted-foreground whitespace-nowrap">Tot:</label>
        <Input
          id="date-to"
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          className="w-[160px]"
        />
      </div>
    </div>
  );
}

export default FilterBar;
