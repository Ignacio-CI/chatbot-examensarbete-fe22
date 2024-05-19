import OpenAI from "openai";

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const assistant = "asst_7oyTVDTDgAAiaonwhYX20Md6";
