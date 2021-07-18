import { Command } from "commander";

import packageJson from "../../../package.json";
import { markdownToHtmlCommand } from "./converts";
import { initCommand, setupCommand } from "./init";
import { startServerCommand } from "./server";

const program = new Command();
program.version(packageJson.version);

function buildCommands(): Command {
  initCommand(program);
  markdownToHtmlCommand(program);
  setupCommand(program);
  // startServerCommand(program);

  return program;
}

export default buildCommands;