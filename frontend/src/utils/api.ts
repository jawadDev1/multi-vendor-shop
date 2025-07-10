import { API_URL } from "@/constants/index";

interface API_REQUEST_PARAMS {
  endpoint: string;
  body: { [key: string]: any };
  headers?: { [key: string]: any };
  method?: "POST" | "PUT";
}

export const apiRequest = async ({
  endpoint,
  body,
  headers,
  method = "POST",
}: API_REQUEST_PARAMS) => {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: error };
  }
};

// Get API
export const getApiRequest = async (endpoint: string) => {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: error };
  }
};

export const deleteApiRequest = async (endpoint: string) => {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "DELETE",
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: error };
  }
};
