import pb from "../pb";
import { NFTFormInterface } from "../../../shared/modal/data/interface";
import { updateCampaign } from "./campaigns";
import { parseJSONAPIObject } from "../../../lib/helper";
import _ from "lodash";

const collection = pb.collection("nfts");

// TODO: fetch user along with NFTs
export const fetchAllNFTs = async () => {
  return collection.getFullList(200);
};

export const fetchNFTById = async (id: string, options?: any) => {
  return collection.getOne(id, {
    expand: options,
  });
};

export const updateNFTById = async (
  id: string,
  data: { nftForm: NFTFormInterface; campaignId: string },
  options?: any
) => {
  const nftPayload = {
    ...data.nftForm,
    campaign: data.campaignId,
  };
  return collection.update(id, nftPayload, {
    expand: options,
  });
};

export const createNFT = async (
  data: { nftForm: NFTFormInterface; campaignId: string },
  options?: any
) => {
  const nftPayload = {
    ...data.nftForm,
    campaign: data.campaignId,
  };
  const createNFTResponse = await collection.create(nftPayload, {
    expand: options,
  });

  console.log(createNFTResponse);
  const createdNFT = parseJSONAPIObject(createNFTResponse);
  const nftId = _.get(createdNFT, "id", "");
  const existedNFTIds = _.get(createdNFT, "expand.campaign.nfts", []);

  return updateCampaign({
    campaignId: data.campaignId,
    data: {
      nftIds: [...existedNFTIds, nftId],
    },
  });
};
