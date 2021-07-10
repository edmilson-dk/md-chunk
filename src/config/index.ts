import { promises } from "fs";
import { mapperFileConfigs } from "../shared/mappers/config";

import { FileConfigPropsType } from "../shared/types/config";

export async function parseConfigsFile(jsonPath: string, fileName: string) {
  const json = await promises.readdir(`${jsonPath}`);

  if(json.includes(fileName)) {
    const jsonFile: FileConfigPropsType = require(`${jsonPath}/${fileName}`);
    const mappedConfigs = mapperFileConfigs(jsonFile);
    return mappedConfigs;
  }
}