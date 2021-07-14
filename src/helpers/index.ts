import { existsSync, promises } from "fs";
import chalk from "chalk";

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

export function validatePath(targetPath: string) {
  if(!existsSync(targetPath)) {
    console.log(
      chalk.red(`\n❌ - Path does not exist: ${targetPath}, execute 'scc setup' to create setup tool\n`)
    );
    process.exit(1);
  }
}