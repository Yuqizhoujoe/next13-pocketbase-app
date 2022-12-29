import axios from "../axios/instance";

const OPENAI_URL = "/openAI";

export const openAIImageHandler = async ({ prompt }: { prompt: string }) => {
  return generateImageHandler(prompt);
};

export const generateImageHandler = async (prompt: string) => {
  return axios
    .post(`${OPENAI_URL}/image`, {
      prompt,
    })
    .then((res) => res.data);
};
