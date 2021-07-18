import { Command } from "commander";
import chalk from "chalk";

import { getSccConfigsOrNull, validatePath } from "../../helpers";
import { CONSTANTS } from "../../constants";
import { convertAllMarkdownFilesToHtml } from "../../core/converts";

export function markdownToHtmlCommand(program: Command) {
  program
    .command("convert:md")
    .description(CONSTANTS.commands.mdToHtmlCommandDescription)
    .action(async () => {
      const fileConfigs = await getSccConfigsOrNull();

      if (!fileConfigs) {
        console.log(chalk.red(CONSTANTS.messages.configsFileNotCreated));
        return;
      }

      const { inputMarkdown, outputHTML, filePrefix, originalName } = fileConfigs;

      outputHTML.forEach(htmlConfigs => {
        validatePath(htmlConfigs.saveToPath);
      });
      inputMarkdown.forEach(mdConfigs => {
        validatePath(mdConfigs.inputMarkdownPath);
      });

      const setupFilesPaths = inputMarkdown.map((mdConfigs, index) => {
        const htmlConfigs = outputHTML[index] ? outputHTML[index].saveToKey : null;

        if (mdConfigs.saveToKey === htmlConfigs) {
          return {
            mdInputPath: mdConfigs.inputMarkdownPath,
            htmlSaveToPath: outputHTML[index].saveToPath
          };
        }

        return null;
      });

      setupFilesPaths.forEach(setupFilesPath => {
        if (setupFilesPath) {
          convertAllMarkdownFilesToHtml({
            inputPath: setupFilesPath.mdInputPath,
            outputPath: setupFilesPath.htmlSaveToPath,
            filePrefix,
            originalName,
          });

          console.log(chalk.green(CONSTANTS.messages.mdToHtmlSuccess));
        }
      });

      // convertAllMarkdownFilesToHtml({
      //   inputPath: inputMarkdown,
      //   outputPath: outputHTML,
      //   filePrefix: filePrefix,
      //   originalName: originalName,
      // });
      // console.log(chalk.green(CONSTANTS.messages.mdToHtmlSuccess));
    });
}