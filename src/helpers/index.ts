import { existsSync } from "fs";

import { mapperFileConfigs } from "../shared/mappers/config";
import { FileConfigPropsType } from "../shared/types/config";

export async function getSccConfigsOrNull(): Promise<FileConfigPropsType | null> {
  const existsFile = existsSync(`${__dirname}/../../scc.configs.json`);

  if(existsFile) {
    const jsonFile: FileConfigPropsType = require(`${__dirname}/../../scc.configs.json`);
    const mappedConfigs = mapperFileConfigs(jsonFile);
    return mappedConfigs;
  }

  return null;
}