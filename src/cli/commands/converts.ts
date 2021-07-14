import { Command } from "commander";
import chalk from "chalk";

import { getSccConfigsOrNull } from "../../helpers";
import { CONSTANTS } from "../../constants";
import { convertAllMarkdownFilesToHtml } from "../../core/converts";

export function convertAllMarkdownFilesToHtmlCommand(program: Command) {
  program
    .command("convert:all")
    .description(CONSTANTS.commands.convertAll)
    .action(async () => {
      const fileConfigs = await getSccConfigsOrNull();

      if(!fileConfigs) {
        console.log(chalk.red(CONSTANTS.messages.configsFileNotCreated));
        return;
      }

      convertAllMarkdownFilesToHtml(fileConfigs.inputMarkdown, fileConfigs.outputHTML);
      console.log(chalk.green(CONSTANTS.messages.convertAllSuccess));
    });
}