import { Command } from "commander";

import packageJson from "../../../package.json";
import { convertCommand } from "./convert";

import { initCommand } from "./init";

const program = new Command();
program.version(packageJson.version);

function buildCommands() {
  initCommand(program);
  convertCommand(program);

  return program;
}

export default buildCommands;