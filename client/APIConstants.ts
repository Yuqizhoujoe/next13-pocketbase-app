import { resolvePBDomain } from "../lib/resolveDomain";

export const POCKETBASE_API = `http://${resolvePBDomain()}/api/`;
export const POCKETBASE_DOMAIN = `http://${resolvePBDomain()}/`;

export const FORMDATA_CONFIG = {
  headers: { "Content-Type": "multipart/form-data" },
  onUploadProgress: (event: any) => {
    console.log(
      `Current progress:`,
      Math.round((event.loaded * 100) / event.total)
    );
  },
};
