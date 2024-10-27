import {openai} from './openAi';

export async function Embedding(inputData:string|string[]){
  const response = await openai.embeddings.create({
    input:inputData,
    model:'nomic-embed-text',

  })
  return response;
}