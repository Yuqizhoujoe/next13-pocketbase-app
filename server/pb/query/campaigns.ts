import pb from "../pb";
import { CampaignFormInterface } from "../../../shared/modal/data/interface";

const collection = pb.collection("campaigns");

export const fetchAllCampaigns = async () => {
  return collection.getFullList(200);
};

export const fetchCampaignById = async (id: string, options?: any) => {
  return collection.getOne(id, {
    expand: options,
  });
};

export const CreateEditCampaign = async (
  campaignForm: CampaignFormInterface
) => {
  return collection.create(JSON.stringify(campaignForm));
};

export const updateCampaign = async ({
  campaignId,
  data,
}: {
  campaignId: string;
  data: {
    campaignForm?: CampaignFormInterface;
    nftIds?: string[];
  };
}) => {
  const campaignPayload = {
    ...data.campaignForm,
    nfts: data.nftIds,
  };
  return collection.update(campaignId, campaignPayload);
};
