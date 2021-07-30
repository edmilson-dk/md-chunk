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

      const { inputMarkdown, outputHTML, inputBaseHTML, originalName, filePrefix } = fileConfigs;

      outputHTML.forEach(htmlConfigs => {
        validatePath(htmlConfigs.saveToPath);
      });
      inputMarkdown.forEach(mdConfigs => {
        validatePath(mdConfigs.inputMarkdownPath);
      });

      const setupFilesPaths = inputMarkdown.map((mdConfigs, index) => {
        const htmlConfigs = outputHTML[index] ? outputHTML[index].saveToKey : null;
        const useBaseHTML = outputHTML[index] ? outputHTML[index].useBaseHTML : false;
        const baseConfigs = inputBaseHTML[index] ? inputBaseHTML[index].saveToKey : null;

        const defaultValidation = mdConfigs.saveToKey === htmlConfigs;
        const withBaseHTMLValidation = baseConfigs !== null
          && (htmlConfigs === baseConfigs)
          && (mdConfigs.saveToKey === baseConfigs);

        if (useBaseHTML) {
          if (defaultValidation && withBaseHTMLValidation) {
            return {
              mdInputPath: mdConfigs.inputMarkdownPath,
              htmlSaveToPath: outputHTML[index].saveToPath,
              baseInputPath: inputBaseHTML[index].inputBaseHTMLPath
            };
          }
        } else {
          if (defaultValidation) {
            return {
              mdInputPath: mdConfigs.inputMarkdownPath,
              htmlSaveToPath: outputHTML[index].saveToPath
            };
          }
        }

        return null;
      });

      console.log(setupFilesPaths);
      setupFilesPaths.forEach(setupFilesPath => {
        if (setupFilesPath) {
          convertAllMarkdownFilesToHtml({
            inputPath: setupFilesPath.mdInputPath,
            outputPath: setupFilesPath.htmlSaveToPath,
            filePrefix,
            originalName,
            baseInputPath: setupFilesPath.baseInputPath || "",
            useBaseHTML: setupFilesPath.baseInputPath ? true : false
          });

          console.log(chalk.green(CONSTANTS.messages.mdToHtmlSuccess));
        }
      });
    });
}