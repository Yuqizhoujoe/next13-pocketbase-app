import pb from "../pb";
import {
  NFTFormInterface,
  NFTInterface,
} from "../../../shared/modal/data/interface";
import { parseJSONAPIObject } from "../../../lib/helper";

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
  data: { nftForm: NFTFormInterface | NFTInterface },
  options?: any
) => {
  const nftPayload = {
    ...data.nftForm,
  };
  return collection.update(id, nftPayload, {
    expand: options,
  });
};

export const createNFT = async (
  data: { nftForm: NFTFormInterface },
  options?: any
) => {
  const nftPayload = {
    ...data.nftForm,
  };
  const createNFTResponse = await collection.create(nftPayload, {
    expand: options,
  });

  return parseJSONAPIObject(createNFTResponse);
};

export const deleteNFT = async (nftId: string, options?: any) => {
  const deleteNFTResponse = await collection.delete(nftId);
  return parseJSONAPIObject(deleteNFTResponse);
};
