import { apiHandler } from "../../../server/helper";
import { NextApiHandler } from "next";
import _ from "lodash";
import createHttpError from "http-errors";
import { generateImage } from "../../../server/openAI/openAI";

const generateImageHandler: NextApiHandler = async (req, res) => {
  const prompt = _.get(req, "body.prompt", "");
  if (!prompt)
    throw new createHttpError.BadRequest(`Prompt is needed to generate image`);

  const response = await generateImage(prompt);
  const imageData = _.get(response, "data[0]", {});

  res.status(200).json({
    data: {
      ...imageData,
    },
    messgae: "Image generated successfully",
  });
};

export default apiHandler({
  POST: generateImageHandler,
});
