import { NextApiHandler } from "next";
import { apiHandler } from "../../../server/controller";
import _ from "lodash";
import createHttpError from "http-errors";
import {
  CreateEditCampaign,
  updateCampaign,
} from "../../../server/pb/query/campaigns";

const CreateEditCampaignHandler: NextApiHandler = async (req, res) => {
  const campaignFormData = _.get(req, "body", {});
  if (!campaignFormData)
    throw new createHttpError.BadRequest(`Campagin form data is required`);

  const data = await CreateEditCampaign(campaignFormData);
  res.status(200).json({
    data,
    message: "Campaign created successfully",
  });
};

const updateCampaignHandler: NextApiHandler = async (req, res) => {
  const campaignId = _.get(req, "body.campaignId", {});
  const campaignFormData = _.get(req, "body.campaignFormData", {});
  if (_.isEmpty(campaignId))
    throw new createHttpError.BadRequest(`Campaign Id is required`);

  if (_.isEmpty(campaignFormData))
    throw new createHttpError.BadRequest(`Campaign form data is required`);

  const data = await updateCampaign({
    campaignId,
    data: {
      campaignForm: campaignFormData,
    },
  });

  res.status(200).json({
    data,
    message: "Campaign updated successfully",
  });
};

export default apiHandler({
  POST: CreateEditCampaignHandler,
  PUT: updateCampaignHandler,
});
