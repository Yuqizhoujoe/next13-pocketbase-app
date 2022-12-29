import { atom } from "jotai";
import { CampaignInterface } from "../../shared/modal/data/interface";

export const campaignsAtom = atom<CampaignInterface[]>([]);
