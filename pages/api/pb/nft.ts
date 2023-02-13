import { NextApiHandler } from "next";
import _ from "lodash";
import createHttpError from "http-errors";
import {
  createNFT,
  deleteNFT,
  updateNFTById,
} from "../../../server/pb/query/nfts";
import { nextConnectConfig } from "../../../server/helper";

const apiRoute = nextConnectConfig();

const updateNFT: NextApiHandler = async (req, res) => {
  const data = _.get(req, "body", {});
  if (_.isEmpty(data))
    throw new createHttpError.BadRequest(`Request body is empty`);

  const nftId = _.get(data, "nftId", "");
  if (_.isEmpty(nftId))
    throw new createHttpError.BadRequest(`NFT Id is required`);

  const nftForm = _.get(data, "nftForm", {});
  if (_.isEmpty(nftForm))
    throw new createHttpError.BadRequest(`NFT Form data is required`);

  const result = await updateNFTById(nftId, { nftForm });

  res.status(200).json({
    data: result,
    message: "NFT update successfully",
  });
};
const createNFTHandler: NextApiHandler = async (req, res) => {
  const nftForm = _.get(req, "body", {});
  if (_.isEmpty(nftForm))
    throw new createHttpError.BadRequest(`NFT Form data is required`);

  const result = await createNFT({ nftForm });

  res.status(200).json({
    data: result,
    message: "NFT create successfully",
  });
};
const deleteNFTHandler: NextApiHandler = async (req, res) => {
  const nftId = _.get(req, "query.nftId", "");
  const url = _.get(req, "url", "");

  if (_.isEmpty(nftId))
    throw new createHttpError.BadRequest(`${url}: NFT Id is required`);

  await deleteNFT(nftId);

  res.status(200).json({
    message: "Delete successfully",
  });
};

apiRoute.post(createNFTHandler);
apiRoute.put(updateNFT);
apiRoute.delete(deleteNFTHandler);

export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// };

// export default apiHandler({
//   PUT: updateNFT,
//   POST: createNFTHandler,
//   DELETE: deleteNFTHandler,
// });
