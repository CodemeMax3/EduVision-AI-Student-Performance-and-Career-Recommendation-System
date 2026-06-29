import axios from "axios";

const BASE_URL =
  "https://eduvision-ai-student-performance-and.onrender.com/api";

export const getCareerRecommendation = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/career-recommendation/`,
    payload
  );

  return response.data;
};

export const chatWithCareerAdvisor = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/chat/`,
    payload
  );

  return response.data;
};

export const sendCareerReport = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/send-career-report/`,
    payload
  );

  return response.data;
};