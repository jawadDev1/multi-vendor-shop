import { storage, ID } from "@/lib/appwrite";

export const uploadImageToAppwrite = async (file: File): Promise<string> => {
  try {
    const bucket_id = import.meta.env.VITE_APPWRITE_BUCKET;
    const response = await storage.createFile(bucket_id, ID.unique(), file);

    const fileId = response.$id;
    const url = storage.getFileView(bucket_id, fileId);

    return url.toString();
  } catch (error) {
    console.log("Error uploadImageToAppwrite :: ", error);
    return "";
  }
};
