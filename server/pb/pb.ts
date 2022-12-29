// @ts-ignore
import PocketBase from "pocketbase";
import { POCKETBASE_DOMAIN } from "../../client/APIConstants";

// @ts-ignore
if (!global.pb) global.pb = new PocketBase(POCKETBASE_DOMAIN);
// @ts-ignore
const pb = global.pb;

export default pb;
