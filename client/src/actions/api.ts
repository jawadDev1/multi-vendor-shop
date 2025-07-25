import { cookies } from "next/headers";
import { API_URL } from "@/constants/index";

export const getServerApiRequest = async (endpoint: string) => {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token");
    const res = await fetch(`${API_URL}/${endpoint}`, {
      credentials: "include",
      headers: {
        Cookie: `token=${token?.value}`,
      },
    });
    const result = await res.json();

    if (!result?.success) {
      throw new Error(result?.message);
    }

    return result;
  } catch (error) {
    console.log(`Error in ${endpoint} :: `, error);
    return { success: false, message: "something went wront" };
  }
};
