import { Command } from "commander";

import packageJson from "../../../package.json";

import { initCommand } from "./init";

const program = new Command();
program.version(packageJson.version);

function buildCommands() {
  initCommand(program);

  return program;
}

export default buildCommands;