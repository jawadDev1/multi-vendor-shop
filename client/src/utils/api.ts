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

function getCookie(name) {
  console.log("cookies ", document.cookie)
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`) ?? [];
  if (!parts || parts.length === 0) return "";
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// Get API
export const getApiRequest = async (
  endpoint: string,
  headers?: HeadersInit
) => {
  try {
    const token = getCookie("token");
    console.log("cookie =========> ", token)
    const res = await fetch(`${API_URL}/${endpoint}`, {
      credentials: "include",

      headers: {
        Cookie: `token=${token}`,
      },
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
