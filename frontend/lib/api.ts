import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

export const fetchAPI = async <T>(endpoint: string): Promise<T> => {
  try {
    console.log("Fetching:", `${API_URL}${endpoint}`); // 👀 see exact URL
    const res = await axios.get(`${API_URL}${endpoint}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Fetch API Error:",
        error.response?.status,
        error.response?.data || error.message
      );
    } else {
      // For non-Axios errors
      console.error("Fetch API Unknown Error:", (error as Error).message);
    }
    throw new Error(`Failed to fetch ${endpoint}`);
  }
};
