import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api = {
  getRecords: async () => {
    const res = await axios.get(`${API_URL}/records`);
    return res.data;
  },
  getRecordBySurvey: async (surveyNumber: string) => {
    const res = await axios.get(`${API_URL}/records/${encodeURIComponent(surveyNumber)}`);
    return res.data;
  },
  getCases: async () => {
    const res = await axios.get(`${API_URL}/cases`);
    return res.data;
  },
  getBlockchain: async () => {
    const res = await axios.get(`${API_URL}/blockchain`);
    return res.data;
  },
  login: async (role: string) => {
    const res = await axios.post(`${API_URL}/auth/login`, { role });
    return res.data;
  }
};
