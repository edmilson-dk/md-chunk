import fs from "fs";
import path from "path";
import remark from "remark";
import html from "remark-html";
import { randomBytes } from "crypto";

import {
  ConvertAllMarkdownFilesToHtmlNoBaseHtmlProps,
  ConvertAllMarkdownFilesToHtmlProps,
  ConvertAllMarkdownFilesToHtmlWithBaseHtmlProps
} from "../shared/types/core/converts";
import { CONSTANTS } from "../constants";

export function convertMarkdownFileToHtml(content: string): string {
  const convertedContent = remark()
    .use(html)
    .processSync(content)
    .toString();

  return convertedContent;
}

function convertMarkdownFileToHtmlNotBaseHtml({ fileContent, saveFilePath, }: ConvertAllMarkdownFilesToHtmlNoBaseHtmlProps) {
  const convertedContent = convertMarkdownFileToHtml(fileContent);
  fs.writeFileSync(saveFilePath, convertedContent);
}

function convertMarkdownFileToHtmlWithBaseHtml({
  saveFilePath,
  fileContent,
  baseInputPath
}: ConvertAllMarkdownFilesToHtmlWithBaseHtmlProps) {
  const baseHtmlPath = path.join(baseInputPath, "base.html");

  const baseHtmlContent = fs.readFileSync(baseHtmlPath, "utf8");
  const convertedContent = convertMarkdownFileToHtml(fileContent);
  const baseHtmlConvertedContent = baseHtmlContent.replace(CONSTANTS.baseHtmlFlagRegex, convertedContent);

  fs.writeFileSync(saveFilePath, baseHtmlConvertedContent);
}

export async function convertAllMarkdownFilesToHtml({
  inputPath,
  outputPath,
  originalName = true,
  filePrefix = "",
  useBaseHTML = false,
  baseInputPath = ""
}: ConvertAllMarkdownFilesToHtmlProps) {
  if (!fs.existsSync(outputPath)) {
    throw Error(`Input path ${inputPath} does not exist, execute "scc setup" for setup tool`);
  }

  const allFiles = fs.readdirSync(inputPath);

  allFiles.forEach((file) => {
    if (file.slice(-3) === ".md") {
      let id = randomBytes(16).toString("hex");
      const filePath = path.join(inputPath, file);

      const saveFileName = originalName
        ? file.replace(".md", ".html")
        : `${id}.html`;

      const saveFilePath = path.join(outputPath, `${filePrefix}${saveFileName}`);
      const fileContent = fs.readFileSync(filePath, "utf8");

      switch (useBaseHTML) {
        case true:
          convertMarkdownFileToHtmlWithBaseHtml({
            fileContent,
            saveFilePath,
            baseInputPath
          });
          break;
        case false:
          convertMarkdownFileToHtmlNotBaseHtml({
            fileContent,
            saveFilePath,
          });
          break;
      }
    }
  });
}