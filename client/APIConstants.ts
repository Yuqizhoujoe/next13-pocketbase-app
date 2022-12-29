import { resolvePBDomain } from "../lib/resolveDomain";

export const POCKETBASE_API = `http://${resolvePBDomain()}/api/`;
export const POCKETBASE_DOMAIN = `http://${resolvePBDomain()}/`;
