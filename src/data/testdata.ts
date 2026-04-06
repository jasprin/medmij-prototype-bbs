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
  id: "patient-vandenBerg-ME",
  name: "M.E. van den Berg",
  familyName: "van den Berg",
  initials: "M.E.",
  gender: "Vrouw",
  birthDate: "1958-09-14",
  identifier: "999990027",
};

export const documents: DocumentItem[] = [
  // 1 — Röntgen thorax (beeld)
  {
    id: "img-1",
    type: "image",
    title: "Röntgen thorax",
    date: "2023-11-15T10:15:00+01:00",
    organization: "Franciscus Gasthuis, Rotterdam",
    practitioner: "Dr. L. Jansen (huisarts)",
    modality: "CR",
    modalityFriendly: "Röntgenfoto",
    accessionNumber: "ACC-101",
    snomedCode: "44491008",
    snomedDisplay: "röntgendoorlichting",
    patientDisplay: "M.E. van den Berg",
    dicomUrls: [
      `${DICOM_BASE}Cr_Cwk_Medmij%20-%206003297769/unnamed_-1/IM-0005-0001-0001.dcm`,
    ],
  },
  // 2 — Röntgen thorax (verslag)
  {
    id: "rpt-1",
    type: "report",
    title: "Röntgen thorax",
    date: "2023-11-15T11:30:00+01:00",
    organization: "Franciscus Gasthuis, Rotterdam",
    practitioner: "Dr. L. Jansen (huisarts)",
    modality: null,
    modalityFriendly: null,
    accessionNumber: "ACC-101",
    snomedCode: "44491008",
    snomedDisplay: "röntgendoorlichting",
    patientDisplay: "M.E. van den Berg",
    reportId: "rpt-1",
  },
  // 3 — CT abdomen (beeld)
  {
    id: "img-2",
    type: "image",
    title: "CT abdomen",
    date: "2024-03-08T09:00:00+01:00",
    organization: "Erasmus MC, Rotterdam",
    practitioner: "Dr. P. de Groot (MDL-arts)",
    modality: "CT",
    modalityFriendly: "CT-scan",
    accessionNumber: "ACC-102",
    snomedCode: "77477000",
    snomedDisplay: "CT",
    patientDisplay: "M.E. van den Berg",
    dicomUrls: [
      `${DICOM_BASE}Medmij_Pgo_Test_Ct%20-%2093797336/Localizers_1/IM-0004-0001.dcm`,
    ],
  },
  // 4 — CT abdomen (verslag)
  {
    id: "rpt-2",
    type: "report",
    title: "CT abdomen",
    date: "2024-03-08T10:45:00+01:00",
    organization: "Erasmus MC, Rotterdam",
    practitioner: "Dr. P. de Groot (MDL-arts)",
    modality: null,
    modalityFriendly: null,
    accessionNumber: "ACC-102",
    snomedCode: "77477000",
    snomedDisplay: "CT",
    patientDisplay: "M.E. van den Berg",
    reportId: "rpt-2",
  },
  // 5 — Röntgen bekken (beeld)
  {
    id: "img-3",
    type: "image",
    title: "Röntgen bekken",
    date: "2024-06-21T14:30:00+02:00",
    organization: "Franciscus Gasthuis, Rotterdam",
    practitioner: "Dr. R. Bakker (orthopeed)",
    modality: "CR",
    modalityFriendly: "Röntgenfoto",
    accessionNumber: "ACC-103",
    snomedCode: "44491008",
    snomedDisplay: "röntgendoorlichting",
    patientDisplay: "M.E. van den Berg",
    dicomUrls: [
      `${DICOM_BASE}Cr_Cwk_Medmij%20-%206003297769/Bekken_AP_1/IM-0006-0001.dcm`,
    ],
  },
  // 6 — CT hoofd (beeld)
  {
    id: "img-4",
    type: "image",
    title: "CT hoofd",
    date: "2024-09-12T08:20:00+02:00",
    organization: "Erasmus MC, Rotterdam",
    practitioner: "Dr. S. Visser (neuroloog)",
    modality: "CT",
    modalityFriendly: "CT-scan",
    accessionNumber: "ACC-104",
    snomedCode: "77477000",
    snomedDisplay: "CT",
    patientDisplay: "M.E. van den Berg",
    dicomUrls: [
      `${DICOM_BASE}Medmij_Pgo_Test_Ct%20-%2093797336/Head_100_Qr40_S2_2/IM-0003-0001.dcm`,
    ],
  },
  // 7 — CT hoofd (verslag)
  {
    id: "rpt-3",
    type: "report",
    title: "CT hoofd",
    date: "2024-09-12T09:50:00+02:00",
    organization: "Erasmus MC, Rotterdam",
    practitioner: "Dr. S. Visser (neuroloog)",
    modality: null,
    modalityFriendly: null,
    accessionNumber: "ACC-104",
    snomedCode: "77477000",
    snomedDisplay: "CT",
    patientDisplay: "M.E. van den Berg",
    reportId: "rpt-3",
  },
  // 8 — CT thorax (beeld)
  {
    id: "img-5",
    type: "image",
    title: "CT thorax",
    date: "2024-12-03T11:10:00+01:00",
    organization: "Ikazia Ziekenhuis, Rotterdam",
    practitioner: "Dr. M. Hendriks (longarts)",
    modality: "CT",
    modalityFriendly: "CT-scan",
    accessionNumber: "ACC-105",
    snomedCode: "77477000",
    snomedDisplay: "CT",
    patientDisplay: "M.E. van den Berg",
    dicomUrls: [
      `${DICOM_BASE}Medmij_Pgo_Ct%20-%2074224547/Quick_Check_CT_300_1/IM-0001-0001.dcm`,
    ],
  },
  // 9 — Röntgen bekken controle (beeld)
  {
    id: "img-6",
    type: "image",
    title: "Röntgen bekken controle",
    date: "2025-01-22T15:00:00+01:00",
    organization: "Franciscus Gasthuis, Rotterdam",
    practitioner: "Dr. R. Bakker (orthopeed)",
    modality: "CR",
    modalityFriendly: "Röntgenfoto",
    accessionNumber: "ACC-106",
    snomedCode: "44491008",
    snomedDisplay: "röntgendoorlichting",
    patientDisplay: "M.E. van den Berg",
    dicomUrls: [
      `${DICOM_BASE}Cr_Cwk_Medmij%20-%206003297769/Bekken_AP_2/IM-0007-0001.dcm`,
    ],
  },
  // 10 — Röntgen bekken controle (verslag)
  {
    id: "rpt-4",
    type: "report",
    title: "Röntgen bekken controle",
    date: "2025-01-22T16:15:00+01:00",
    organization: "Franciscus Gasthuis, Rotterdam",
    practitioner: "Dr. R. Bakker (orthopeed)",
    modality: null,
    modalityFriendly: null,
    accessionNumber: "ACC-106",
    snomedCode: "44491008",
    snomedDisplay: "röntgendoorlichting",
    patientDisplay: "M.E. van den Berg",
    reportId: "rpt-4",
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
