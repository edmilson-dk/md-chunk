import { Command } from "commander";
import fs from "fs";
import path from "path";
import chalk from "chalk";

import { getSccConfigsOrNull } from "../../helpers";
import { CONSTANTS } from "../../constants";

export function convertAllMarkdownFilesCommand(program: Command) {
  program
    .command("convert:all")
    .description("Convert all markdown files to HTML in input directory")
    .action(async () => {
      const fileConfigs = await getSccConfigsOrNull();

      if(!fileConfigs) {
        console.log(chalk.red(CONSTANTS.messages.configsFileNotCreated));
        return;
      }
    });
}