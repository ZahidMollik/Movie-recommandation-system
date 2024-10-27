
const dotProduct=(a:number[],b:number[])=>{
 return a.map((value,index)=>value*b[index]).reduce((a,b)=>a+b,0);
}

export const consineSimilarity=(a:number[],b:number[])=>{
  const dotproduct=dotProduct(a,b);
  const aMagnitute=Math.sqrt(a.map(value => value*value).reduce((a,b)=>a+b,0));
  const bMagnitute=Math.sqrt(b.map(value => value*value).reduce((a,b)=>a+b,0));
  return dotproduct/(aMagnitute*bMagnitute)
}
