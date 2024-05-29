import OpenAI from "openai";
const config = useRuntimeConfig();

export const client = new OpenAI({
  apiKey: config.public.openaiApiKey as string,
});

export const assistant = "asst_7oyTVDTDgAAiaonwhYX20Md6";
