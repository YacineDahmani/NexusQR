import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const qrService = {
  // Generate a single QR Code
  generateQR: async (formData) => {
    try {
      const response = await apiClient.post("/qr/generate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error generating QR:", error);
      throw error.response?.data || { error: "Failed to connect to server" };
    }
  },

  // Bulk generate from CSV
  bulkGenerate: async (formData) => {
    try {
      const response = await apiClient.post("/qr/bulk", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob", 
      });
      return response.data;
    } catch (error) {
      console.error("Error in bulk generation:", error);
      throw error;
    }
  },

  // Get user history
  getHistory: async (userId = null) => {
    try {
      const params = userId ? { user_id: userId } : {};
      const response = await apiClient.get("/qr/history", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching history:", error);
      throw error.response?.data || { error: "Failed to fetch history" };
    }
  },
};

export default apiClient;
