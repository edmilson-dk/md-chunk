import { Command } from "commander";
import chalk from "chalk";

import { getSccConfigsOrNull, validatePath } from "../../helpers";
import { CONSTANTS } from "../../constants";
import { convertAllMarkdownFilesToHtml } from "../../core/converts";

export function convertAllMarkdownFilesToHtmlCommand(program: Command) {
  program
    .command("convert:all")
    .description(CONSTANTS.commands.convertAll)
    .action(async () => {
      const fileConfigs = await getSccConfigsOrNull();

      if (!fileConfigs) {
        console.log(chalk.red(CONSTANTS.messages.configsFileNotCreated));
        return;
      }

      validatePath(fileConfigs.outputHTML);

      convertAllMarkdownFilesToHtml({
        inputPath: fileConfigs.inputMarkdown,
        outputPath: fileConfigs.outputHTML,
        filePrefix: fileConfigs.filePrefix,
        originalName: fileConfigs.originalName,
      });
      console.log(chalk.green(CONSTANTS.messages.convertAllSuccess));
    });
}