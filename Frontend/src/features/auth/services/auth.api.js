import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:8989",
  withCredentials: true,
});

export async function login(email, password) {
  try {
    const response = await apiClient.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
}

export async function register(username, email, password) {
  try {
    const response = await apiClient.post("/api/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
}

export async function logout() {
  try {
    await apiClient.get("/api/auth/logout");
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
}

export async function getCurrentUser() {
  try {
    const response = await apiClient.get("/api/auth/me");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
}
