import { Configuration, OpenAIApi } from "openai";
import _ from "lodash";
import axios from "axios";
import { NFTInterface } from "../../shared/modal/data/interface";
import { updateNFTById } from "../pb/query/nfts";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateImage(prompt: string) {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
  });
  const data = _.get(response, "data", {});
  return data;
}
