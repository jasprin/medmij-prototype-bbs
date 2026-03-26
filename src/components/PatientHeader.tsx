import { patient } from "@/data/testdata";
import { User } from "lucide-react";

function PatientHeader() {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center" aria-hidden="true">
        <User className="w-6 h-6 text-secondary" />
      </div>
      <div>
        <h2 className="text-lg font-semibold">{patient.name}</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>Geboortedatum: {new Date(patient.birthDate).toLocaleDateString("nl-NL")}</span>
          <span>Geslacht: {patient.gender}</span>
        </div>
      </div>
    </div>
  );
}

export default PatientHeader;
