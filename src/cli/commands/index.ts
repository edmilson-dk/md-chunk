import { Command } from "commander";

import packageJson from "../../../package.json";
import { convertAllMarkdownFilesCommand } from "./converts";
import { initCommand } from "./init";

const program = new Command();
program.version(packageJson.version);

function buildCommands(): Command {
  initCommand(program);
  convertAllMarkdownFilesCommand(program);

  return program;
}

export default buildCommands;