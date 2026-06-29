import axios from "axios";

const API_URL =
  "https://eduvision-ai-student-performance-and.onrender.com/api/student-score/";

export const predictStudentScore =
  async (formData) => {

    const response =
      await axios.post(
        API_URL,
        formData
      );

    return response.data;
};