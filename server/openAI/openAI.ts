import { Configuration, OpenAIApi } from "openai";

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
  return response;
}
