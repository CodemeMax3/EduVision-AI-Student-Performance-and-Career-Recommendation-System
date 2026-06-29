import axios from "axios";

const API_URL =
  "http://127.0.0.1:8000/api/student-score/";

export const predictStudentScore =
  async (formData) => {

    const response =
      await axios.post(
        API_URL,
        formData
      );

    return response.data;
};