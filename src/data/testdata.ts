const DICOM_BASE = "https://raw.githubusercontent.com/Stichting-MedMij/MedMij-R4-ImageAvailability/1.0.0-rc.2/test/dicom/XxxAansluittestB_B/";

export interface DocumentItem {
  id: string;
  type: "image" | "report";
  title: string | null;
  date: string; // ISO date
  organization: string;
  practitioner: string | null;
  modality: string | null;
  modalityFriendly: string | null;
  accessionNumber: string | null;
  snomedCode: string;
  snomedDisplay: string;
  patientDisplay: string;
  dicomUrls?: string[];
  reportId?: string;
}

export const patient = {
  id: "ImageAvailability-Patient-XXX-Aansluittest-B",
  name: "B. XXX-Aansluittest-B",
  familyName: "XXX-Aansluittest-B",
  initials: "B.",
  gender: "Vrouw",
  birthDate: "1950-02-02",
  identifier: "999990019",
};

export const documents: DocumentItem[] = [
  {
    id: "img-5-1",
    type: "image",
    title: "MedMij PGO test CT",
    date: "2024-08-22T16:45:00+02:00",
    organization: "Catharina Ziekenhuis Eindhoven, Radiotherapie",
    practitioner: "Cardioloog",
    modality: "CT",
    modalityFriendly: "CT-scan",
    accessionNumber: "ACC-001",
    snomedCode: "77477000",
    snomedDisplay: "CT",
    patientDisplay: "B. XXX-Aansluittest-B",
    dicomUrls: [
      `${DICOM_BASE}Medmij_Pgo_Test_Ct%20-%2093797336/Medmij_Pgo_Test_Ct/IM-0001-0001.dcm`,
    ],
  },
  {
    id: "img-5-2",
    type: "image",
    title: "MedMij PGO CT",
    date: "2025-01-17T08:44:00+01:00",
    organization: "Catharina Ziekenhuis Eindhoven, Radiotherapie",
    practitioner: "Cardioloog",
    modality: "CT",
    modalityFriendly: "CT-scan",
    accessionNumber: "ACC-002",
    snomedCode: "77477000",
    snomedDisplay: "CT",
    patientDisplay: "B. XXX-Aansluittest-B",
    dicomUrls: [
      `${DICOM_BASE}Medmij_Pgo_Ct%20-%2074224547/Medmij_Pgo_Ct/IM-0001-0001.dcm`,
    ],
  },
  {
    id: "img-5-3",
    type: "image",
    title: "CR CWK MedMij",
    date: "2025-02-25T13:53:00+01:00",
    organization: "Catharina Ziekenhuis Eindhoven",
    practitioner: "Huisarts",
    modality: "CR",
    modalityFriendly: "Röntgenfoto",
    accessionNumber: "ACC-003",
    snomedCode: "44491008",
    snomedDisplay: "röntgendoorlichting",
    patientDisplay: "B. XXX-Aansluittest-B",
    dicomUrls: [
      `${DICOM_BASE}Cr_Cwk_Medmij%20-%206003297769/Bekken_AP_1/IM-0006-0001.dcm`,
    ],
  },
  {
    id: "rpt-5-3",
    type: "report",
    title: "CR CWK MedMij",
    date: "2025-02-25T14:07:00+01:00",
    organization: "Catharina Ziekenhuis Eindhoven",
    practitioner: "Huisarts",
    modality: null,
    modalityFriendly: null,
    accessionNumber: "ACC-003",
    snomedCode: "44491008",
    snomedDisplay: "röntgendoorlichting",
    patientDisplay: "B. XXX-Aansluittest-B",
    reportId: "rpt-5-3",
  },

];(doc: DocumentItem): DocumentItem[] {
  if (!doc.accessionNumber) return [];
  return documents.filter(
    (d) => d.accessionNumber === doc.accessionNumber && d.id !== doc.id
  );
}

export function getOrganizations(): string[] {
  return [...new Set(documents.map((d) => d.organization))];
}
