import { Command } from "commander";

import packageJson from "../../../package.json";
import { convertAllMarkdownFilesToHtmlCommand } from "./converts";
import { initCommand } from "./init";

const program = new Command();
program.version(packageJson.version);

function buildCommands(): Command {
  initCommand(program);
  convertAllMarkdownFilesToHtmlCommand(program);

  return program;
}

export default buildCommands;