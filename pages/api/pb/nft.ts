import { apiHandler } from "../../../server/controller";
import { NextApiHandler } from "next";
import _ from "lodash";
import createHttpError from "http-errors";
import { createNFT, updateNFTById } from "../../../server/pb/query/nfts";

const updateNFT: NextApiHandler = async (req, res) => {
  const data = _.get(req, "body", {});
  if (_.isEmpty(data))
    throw new createHttpError.BadRequest(`Request body is empty`);

  const nftId = _.get(data, "nftId", "");
  if (_.isEmpty(nftId))
    throw new createHttpError.BadRequest(`NFT Id is required`);

  const campaignId = _.get(data, "campaignId", "");
  if (_.isEmpty(campaignId))
    throw new createHttpError.BadRequest(`Campaign Id is required`);

  const nftForm = _.get(data, "nftForm", {});
  if (_.isEmpty(nftForm))
    throw new createHttpError.BadRequest(`NFT Form data is required`);

  const result = await updateNFTById(
    nftId,
    { nftForm, campaignId },
    "campaign"
  );

  res.status(200).json({
    data: result,
    message: "NFT update successfully",
  });
};

const createNFTHandler: NextApiHandler = async (req, res) => {
  const data = _.get(req, "body", {});
  if (_.isEmpty(data))
    throw new createHttpError.BadRequest(`Request body is empty`);

  const campaignId = _.get(data, "campaignId", "");
  if (_.isEmpty(campaignId))
    throw new createHttpError.BadRequest(`Campaign Id is required`);

  const nftForm = _.get(data, "nftForm", {});
  if (_.isEmpty(nftForm))
    throw new createHttpError.BadRequest(`NFT Form data is required`);

  const result = await createNFT({ nftForm, campaignId }, "campaign");

  res.status(200).json({
    data: result,
    message: "NFT create successfully",
  });
};

export default apiHandler({
  PUT: updateNFT,
  POST: createNFTHandler,
});
