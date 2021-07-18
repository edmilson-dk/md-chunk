import { Command } from "commander";
import { promises } from "fs";
import path from "path";
import chalk from "chalk";

import { CONSTANTS } from "../../constants";
import { getSccConfigsOrNull, handleCreateConfigsFolders } from "../../helpers";

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

export function setupCommand(program: Command) {
  program
    .command("setup")
    .description(CONSTANTS.commands.setupCommandDescription)
    .action(async () => {
      const fileConfigs = await getSccConfigsOrNull();

      if (!fileConfigs) {
        console.log(chalk.red(CONSTANTS.messages.configsFileNotCreated));
        return;
      }

      fileConfigs.outputHTML.forEach((htmlConfig) => {
        handleCreateConfigsFolders([htmlConfig.saveToPath]);
      });

      fileConfigs.inputMarkdown.forEach((mdConfig) => {
        handleCreateConfigsFolders([mdConfig.inputMarkdownPath]);
      });
    });
}