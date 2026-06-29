import axios from "axios";

const BASE_URL =
  "https://eduvision-ai-student-performance-and.onrender.com/api";

export const predictAcademicProgress = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/academic-progress/`,
    payload
  );

  return response.data;
};

export const predictPerformanceCategory = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/performance-category/`,
    payload
  );

  return response.data;
};