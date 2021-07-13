import { promises, existsSync } from "fs";

import { mapperFileConfigs } from "../shared/mappers/config";
import { FileConfigPropsType } from "../shared/types/config";

export async function parseConfigsFile(filePath: string, fileName: string) {
  const json = await promises.readdir(`${filePath}`);

  if(json.includes(fileName)) {
    const jsonFile: FileConfigPropsType = require(`${filePath}/${fileName}`);
    const mappedConfigs = mapperFileConfigs(jsonFile);
    return mappedConfigs;
  }
}

export async function getSccConfigsOrNull() {
  const existsFile = existsSync(`${__dirname}/../../scc.configs.json`);

  if(existsFile) {
    const mappedConfigs = await parseConfigsFile(`${__dirname}/../../`, "scc.configs.json");
    return mappedConfigs;
  }

  return null;
}