import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

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