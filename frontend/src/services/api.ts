import axios from 'axios';
import type { LandRecord, LitigationCase, Block } from '../data/mockData';

const API_URL = 'http://localhost:3000/api';

export const api = {
  getRecords: async (): Promise<LandRecord[]> => {
    const response = await axios.get(`${API_URL}/records`);
    return response.data.map((r: any) => ({
      id: r.id.toString(),
      surveyNumber: r.survey_number,
      ownerName: r.owner_name,
      area: r.area ? r.area.toString() + ' Acres' : 'Unknown',
      address: r.location || '',
      status: 'clear',
      registrationDate: r.registration_date,
      coordinates: [17.3850, 78.4867] // Fallback coordinates
    }));
  },
  addRecord: async (recordData: Partial<LandRecord>) => {
    const response = await axios.post(`${API_URL}/records`, recordData);
    return response.data;
  },
  getRecordBySurvey: async (surveyNumber: string) => {
    const response = await axios.get(`${API_URL}/records/${surveyNumber}`);
    const r = response.data.record;
    const cases = response.data.cases;
    
    const record: LandRecord = {
      id: r.id.toString(),
      surveyNumber: r.survey_number,
      ownerName: r.owner_name,
      area: r.area ? r.area.toString() + ' Acres' : 'Unknown',
      address: r.location || '',
      status: cases.length > 0 ? 'litigation' : 'clear',
      registrationDate: r.registration_date,
      coordinates: [17.3850, 78.4867]
    };

    const mappedCases: LitigationCase[] = cases.map((c: any) => ({
      id: c.id.toString(),
      caseNumber: c.case_id,
      surveyNumber: c.survey_number,
      plaintiff: 'State Government', // DB lacks this
      defendant: 'Property Developers Ltd.', // DB lacks this
      filingDate: c.filing_date,
      status: c.status?.toLowerCase() || 'open',
      hearings: (c.hearings || []).map((h: any) => ({
        id: h.id.toString(),
        date: h.hearing_date,
        description: h.event_description,
        status: h.status?.toLowerCase() || 'completed'
      }))
    }));

    return { record, cases: mappedCases };
  },
  getCases: async (): Promise<LitigationCase[]> => {
    const response = await axios.get(`${API_URL}/cases`);
    return response.data.map((c: any) => ({
      id: c.id.toString(),
      caseNumber: c.case_id,
      surveyNumber: c.survey_number,
      plaintiff: 'State Government',
      defendant: 'Property Developers Ltd.',
      filingDate: c.filing_date,
      status: c.status?.toLowerCase() || 'open',
      hearings: (c.hearings || []).map((h: any) => ({
        id: h.id.toString(),
        date: h.hearing_date,
        description: h.event_description,
        status: h.status?.toLowerCase() || 'completed'
      }))
    }));
  },
  getBlockchain: async (): Promise<Block[]> => {
    const response = await axios.get(`${API_URL}/blockchain`);
    return response.data.map((b: any) => {
      let parsedData = {};
      try {
        parsedData = JSON.parse(b.transaction_data || '{}');
      } catch(e) {}
      return {
        index: b.block_index,
        timestamp: b.timestamp,
        data: parsedData,
        hash: b.hash,
        previousHash: b.previous_hash
      };
    });
  },
  login: async (role: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { role });
    return response.data;
  }
};
