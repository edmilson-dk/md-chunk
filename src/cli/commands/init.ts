import { Command } from "commander";
import fs from "fs";
import path from "path";
import chalk from "chalk";

import { CONSTANTS } from "../../constants";

export function initCommand(program: Command) {
  program
    .command("init")
    .description(CONSTANTS.commands.initCommandDescription)
    .action(() => {
      const wirteFilePath = path.join(__dirname, "..", "..", "..", CONSTANTS.fileConfigsNameDefault);

      fs.writeFileSync(
        wirteFilePath,
        JSON.stringify(CONSTANTS.fullConfigFile, null, "\t"));

      console.log(chalk.green(CONSTANTS.messages.configsFileCreated));
    });
}