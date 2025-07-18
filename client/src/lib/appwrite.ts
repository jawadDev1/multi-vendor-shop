import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "@/constants";
import { Client, Storage, ID } from "appwrite";

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

export const storage = new Storage(client);

export { ID };
