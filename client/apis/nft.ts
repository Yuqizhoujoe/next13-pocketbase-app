import {
  CampaignInterface,
  NFTFormInterface,
} from "../../shared/modal/data/interface";
import axios from "../axios/instance";

const NFT_URL = "/pb/nft";

export const nftAPIsHandler = async ({
  nftId,
  nftForm,
  campaignId,
}: {
  nftId?: string;
  nftForm: NFTFormInterface;
  campaignId: string;
}) => {
  if (nftId)
    return updateNFT({
      nftId,
      nftForm,
      campaignId,
    });

  return createNFT({
    nftForm,
    campaignId,
  });
};

export const createNFT = async ({
  nftForm,
  campaignId,
}: {
  nftForm: NFTFormInterface;
  campaignId: string;
}) => {
  return axios.post(NFT_URL, { nftForm, campaignId }).then((res) => res.data);
};

export const updateNFT = async ({
  nftId,
  nftForm,
  campaignId,
}: {
  nftId: string;
  nftForm: NFTFormInterface;
  campaignId: string;
}) => {
  return axios
    .put(NFT_URL, { nftId, nftForm, campaignId })
    .then((res) => res.data);
};
