import axios from "axios";

const BASE_URL =
  "https://eduvision-ai-student-performance-and.onrender.com/api";

/*
=================================
MODEL 1
Student Score Prediction
=================================
*/

export const predictStudentScore = async (
  payload
) => {

  const response = await axios.post(
    `${BASE_URL}/student-score/`,
    payload
  );

  return response.data;
};

/*
=================================
MODEL 2
Academic Progress
=================================
*/

export const predictAcademicProgress =
  async (payload) => {

    const response =
      await axios.post(
        `${BASE_URL}/academic-progress/`,
        payload
      );

    return response.data;
  };

/*
=================================
MODEL 3
Performance Category
=================================
*/

export const predictPerformanceCategory =
  async (payload) => {

    const response =
      await axios.post(
        `${BASE_URL}/performance-category/`,
        payload
      );

    return response.data;
  };