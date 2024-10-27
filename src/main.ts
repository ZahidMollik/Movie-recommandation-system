import {openai} from './openAi'
import {loadJSONData,saveJSONDataToFile} from './file'
import {existsSync} from 'fs'
import {join} from 'path'
import {Embedding} from './embedding'
import {consineSimilarity} from './similarity'
import { CreateEmbeddingResponse } from "openai/resources/embeddings";

  type movie={
    name:string,
    description:string
  }
  const Movies=loadJSONData<movie[]>('movies.json');
  type MoviesEmbedding=movie &{
    embedding:number[]
  }
  const MoviesWithEmbeddings:MoviesEmbedding[]=[];

  async function getEmbeddingMovies(){
    const fileName='moviesWithEmbeddings.json';
    const path=join(__dirname,fileName);
    if(existsSync(path)){
      const data=loadJSONData<CreateEmbeddingResponse>(fileName);
      return data;
    }
    else{
      const descriptionEmbedding=await Embedding(Movies.map((m: { description: string })=>m.description));
      saveJSONDataToFile(descriptionEmbedding,fileName)
      return descriptionEmbedding;
    }
  }

  async function recommend(input:string){
    const embeddedInput=await Embedding(input);
    const descriptionWithEmbedding=await getEmbeddingMovies();
    for (let i=0;i<Movies.length;i++){
      MoviesWithEmbeddings.push({
        name:Movies[i].name,
        description:Movies[i].description,
        embedding:descriptionWithEmbedding.data[i].embedding
      });
    }
    const similarities:{
      input:string,
      similarity:number
    }[]=[];
    for(const movie of MoviesWithEmbeddings){
      const Similarity=consineSimilarity(movie.embedding,embeddedInput.data[0].embedding);
      similarities.push({
        input:movie.name,
        similarity:Similarity
      })
    }
    const sortedSimilarity=similarities.sort((a,b)=>b.similarity-a.similarity);
    console.log('............');
    console.log('We recommend:');
    console.log('............');
    sortedSimilarity.forEach((similarity)=>{
      console.log(`${similarity.input}:${similarity.similarity}`);
    })

  }

  
  process.stdin.addListener('data',(data)=>{
    const input=data.toString().trim();
    recommend(input);
  })


  

  


