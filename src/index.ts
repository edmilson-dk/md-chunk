import path from "path";

import { parseConfigsFile } from "./config";
import { CONSTANTS } from "./constants";

const jsonPath = path.resolve(__dirname, "..");
const jsonConfigFileName = CONSTANTS.fileConfigsNameDefault;

export async function run() {
  const configs = await parseConfigsFile(jsonPath, jsonConfigFileName);
  return configs;
}