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
      `${DICOM_BASE}Medmij_Pgo_Test_Ct%20-%2093797336/Localizers_1/IM-0004-0001.dcm`,
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
      `${DICOM_BASE}Medmij_Pgo_Ct%20-%2074224547/Quick_Check_CT_300_1/IM-0001-0001.dcm`,
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
  {
    id: "img-extra-1",
    type: "image",
    title: "Echo abdomen",
    date: "2024-06-10T09:30:00+02:00",
    organization: "OLVG Oost",
    practitioner: "Dr. J. ter Velde",
    modality: "US",
    modalityFriendly: "Echo",
    accessionNumber: "ACC-004",
    snomedCode: "16310003",
    snomedDisplay: "echografie",
    patientDisplay: "B. XXX-Aansluittest-B",
    dicomUrls: [
      `${DICOM_BASE}Medmij_Pgo_Test_Ct%20-%2093797336/Head_100_Qr40_S2_2/IM-0003-0001.dcm`,
    ],
  },
  {
    id: "img-extra-2",
    type: "image",
    title: "MRI knie links",
    date: "2024-11-05T14:20:00+01:00",
    organization: "Spaarne Gasthuis",
    practitioner: "Dr. A. Bakker",
    modality: "MR",
    modalityFriendly: "MRI-scan",
    accessionNumber: "ACC-005",
    snomedCode: "113091000",
    snomedDisplay: "MRI",
    patientDisplay: "B. XXX-Aansluittest-B",
    dicomUrls: [
      `${DICOM_BASE}Cr_Cwk_Medmij%20-%206003297769/Bekken_AP_2/IM-0007-0001.dcm`,
    ],
  },
];

export function getLinkedDocuments(doc: DocumentItem): DocumentItem[] {
  if (!doc.accessionNumber) return [];
  return documents.filter(
    (d) => d.accessionNumber === doc.accessionNumber && d.id !== doc.id
  );
}

export function getOrganizations(): string[] {
  return [...new Set(documents.map((d) => d.organization))];
}
