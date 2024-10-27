import {readFileSync,writeFileSync,existsSync} from 'fs'
import {join} from 'path'

export function loadJSONData<t>(fileName:string){
  const path=join(__dirname,fileName);
  const data= readFileSync(path);
  return JSON.parse(data.toString());
}

export function saveJSONDataToFile(data:any,fileName:string){
  const dataString=JSON.stringify(data);
  const dataBuffer=Buffer.from(dataString);
  const path=join(__dirname,fileName);
  writeFileSync(path,dataBuffer);
  console.log(`saved data to ${fileName}`);
}