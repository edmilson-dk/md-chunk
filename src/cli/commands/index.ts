import { Command } from "commander";

import packageJson from "../../../package.json";
import { convertAllMarkdownFilesToHtmlCommand } from "./converts";
import { initCommand, setupCommand } from "./init";
import { startServer } from "../../api/server";

const program = new Command();
program.version(packageJson.version);

function buildCommands(): Command {
  initCommand(program);
  convertAllMarkdownFilesToHtmlCommand(program);
  setupCommand(program);
  program
    .command("server")
    .description("Start the server")
    .action(() => {
      startServer();
    });

  return program;
}

export default buildCommands;