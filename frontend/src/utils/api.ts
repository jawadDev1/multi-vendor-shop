import { API_URL } from "@/constants/static";

export const postApiRequest = async (
  endpoint: string,
  body: { [key: string]: any },
  headers?: { [key: string]: any }
) => {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
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
