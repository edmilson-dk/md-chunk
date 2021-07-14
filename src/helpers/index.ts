import { existsSync, promises } from "fs";

import { mapperFileConfigs } from "../shared/mappers/config";
import { FileConfigPropsType } from "../shared/types/config";

export function handleCreateConfigsFolders(foldersPaths: string[]) {
  foldersPaths.forEach(async folderPath => {
    if(!existsSync(folderPath)) {
      await promises.mkdir(folderPath);
    }
  });
}

export async function getSccConfigsOrNull(): Promise<FileConfigPropsType | null> {
  const existsFile = existsSync(`${__dirname}/../../scc.configs.json`);

  if(existsFile) {
    const jsonFile: FileConfigPropsType = require(`${__dirname}/../../scc.configs.json`);
    const mappedConfigs = mapperFileConfigs(jsonFile);
    return mappedConfigs;
  }

  return null;
}