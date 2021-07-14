import { Command } from "commander";
import { promises } from "fs";
import path from "path";
import chalk from "chalk";

import { CONSTANTS } from "../../constants";

export function initCommand(program: Command) {
  program
    .command("init")
    .description(CONSTANTS.commands.initCommandDescription)
    .action(async () => {
      const wirteFilePath = path.join(__dirname, "..", "..", "..", CONSTANTS.fileConfigsNameDefault);

      await promises.writeFile(
        wirteFilePath,
        JSON.stringify(CONSTANTS.fullConfigFile, null, "\t"));

      console.log(chalk.green(CONSTANTS.messages.configsFileCreated));
    });
}