export interface User {
  id: string;
  name: string;
  role: 'citizen' | 'clerk' | 'admin';
  status: 'active' | 'inactive';
}

export interface LandRecord {
  id: string;
  surveyNumber: string;
  ownerName: string;
  area: string;
  address: string;
  status: 'clear' | 'disputed' | 'litigation';
  registrationDate: string;
  coordinates: [number, number]; // Latitude, Longitude
}

export interface Hearing {
  id: string;
  date: string;
  description: string;
  status: 'scheduled' | 'completed' | 'adjourned';
}

export interface LitigationCase {
  id: string;
  caseNumber: string;
  surveyNumber: string;
  plaintiff: string;
  defendant: string;
  filingDate: string;
  status: 'open' | 'closed' | 'in_progress';
  hearings: Hearing[];
}

export interface Block {
  index: number;
  timestamp: string;
  data: any;
  hash: string;
  previousHash: string;
}

export const mockUsers: User[] = [
  { id: 'U001', name: 'John Doe', role: 'citizen', status: 'active' },
  { id: 'U002', name: 'Alice Smith', role: 'clerk', status: 'active' },
  { id: 'U003', name: 'Robert Admin', role: 'admin', status: 'active' },
  { id: 'U004', name: 'Eve Inactive', role: 'citizen', status: 'inactive' },
];

export const mockLandRecords: LandRecord[] = [
  { id: 'L001', surveyNumber: 'SVY-1024', ownerName: 'John Doe', area: '1.5 Acres', address: 'Plot 12, Greenfield District', status: 'clear', registrationDate: '2023-01-15', coordinates: [17.3850, 78.4867] },
  { id: 'L002', surveyNumber: 'SVY-1025', ownerName: 'Michael Chang', area: '0.8 Acres', address: 'Plot 13, Greenfield District', status: 'litigation', registrationDate: '2022-11-20', coordinates: [17.3860, 78.4877] },
  { id: 'L003', surveyNumber: 'SVY-2048', ownerName: 'Sarah Jenkins', area: '2.0 Acres', address: 'Sector 5, North Ridge', status: 'disputed', registrationDate: '2021-05-10', coordinates: [17.4000, 78.5000] },
  { id: 'L004', surveyNumber: 'SVY-2050', ownerName: 'David Torres', area: '1.2 Acres', address: 'Sector 6, North Ridge', status: 'clear', registrationDate: '2024-02-28', coordinates: [17.4010, 78.5010] },
];

export const mockCases: LitigationCase[] = [
  {
    id: 'C001',
    caseNumber: 'LIT-2023-089',
    surveyNumber: 'SVY-1025',
    plaintiff: 'State Government',
    defendant: 'Michael Chang',
    filingDate: '2023-08-12',
    status: 'in_progress',
    hearings: [
      { id: 'H001', date: '2023-09-01', description: 'Initial Hearing', status: 'completed' },
      { id: 'H002', date: '2023-11-15', description: 'Evidence Submission', status: 'completed' },
      { id: 'H003', date: '2024-01-20', description: 'Witness Testimony', status: 'adjourned' },
      { id: 'H004', date: '2024-03-10', description: 'Final Arguments', status: 'scheduled' },
    ]
  },
  {
    id: 'C002',
    caseNumber: 'LIT-2022-112',
    surveyNumber: 'SVY-2048',
    plaintiff: 'Sarah Jenkins',
    defendant: 'Property Developers Ltd.',
    filingDate: '2022-04-05',
    status: 'closed',
    hearings: [
      { id: 'H005', date: '2022-05-10', description: 'Initial Hearing', status: 'completed' },
      { id: 'H006', date: '2022-08-22', description: 'Verdict Announced', status: 'completed' },
    ]
  }
];

export const mockBlockchain: Block[] = [
  { index: 0, timestamp: '2023-01-15T08:00:00Z', data: { type: 'GENESIS', info: 'Chain Initialized' }, hash: '0000x8a9b2c3d...', previousHash: '0000000000000000' },
  { index: 1, timestamp: '2023-01-15T09:30:12Z', data: { type: 'LAND_REGISTERED', recordId: 'L001', survey: 'SVY-1024' }, hash: '0000x4f1e9d8c...', previousHash: '0000x8a9b2c3d...' },
  { index: 2, timestamp: '2023-08-12T14:20:05Z', data: { type: 'CASE_FILED', caseId: 'C001', survey: 'SVY-1025' }, hash: '0000xb5a4c3d2...', previousHash: '0000x4f1e9d8c...' },
  { index: 3, timestamp: '2023-09-01T10:15:30Z', data: { type: 'HEARING_UPDATED', caseId: 'C001', hearingId: 'H001', status: 'completed' }, hash: '0000xe1f2g3h4...', previousHash: '0000xb5a4c3d2...' },
  { index: 4, timestamp: '2024-02-28T11:45:00Z', data: { type: 'LAND_REGISTERED', recordId: 'L004', survey: 'SVY-2050' }, hash: '0000xy7z8a9b0...', previousHash: '0000xe1f2g3h4...' },
];
