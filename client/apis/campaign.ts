import { CampaignFormInterface } from "../../shared/modal/data/interface";
import axios from "../axios/instance";
import { useMutation } from "@tanstack/react-query";
import { QUERIES } from "../../shared/common/constant";

const CAMPAIGN_URL = "/pb/campaign/";

export const campaignAPIHandler = async ({
  campaignFormData,
  campaignId,
}: {
  campaignFormData: CampaignFormInterface;
  campaignId?: string;
}) => {
  if (campaignId)
    return updateCampaign({
      campaignFormData,
      campaignId,
    });

  return postCampaign(campaignFormData);
};

export const postCampaign = async (campaignFormData: CampaignFormInterface) => {
  return axios.post(CAMPAIGN_URL, campaignFormData).then((res) => res.data);
};

export const updateCampaign = async ({
  campaignFormData,
  campaignId,
}: {
  campaignFormData: CampaignFormInterface;
  campaignId: string;
}) => {
  return axios
    .put(CAMPAIGN_URL, {
      campaignFormData,
      campaignId,
    })
    .then((res) => res.data);
};
