import OpenAI from "openai";

export const openai=new OpenAI({
  baseURL:process.env.URL,
  apiKey:process.env.API_KEY
})


