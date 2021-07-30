import fs from "fs";
import path from "path";
import remark from "remark";
import html from "remark-html";
import { randomBytes } from "crypto";

import { convertAllMarkdownFilesToHtmlNoBaseHtmlProps, convertAllMarkdownFilesToHtmlProps, convertAllMarkdownFilesToHtmlWithBaseHtmlProps } from "../shared/types/core/converts";

export function convertMarkdownFileToHtml(content: string): string {
  const convertedContent = remark()
    .use(html)
    .processSync(content)
    .toString();

  return convertedContent;
}

function convertMarkdownFileToHtmlNotBaseHtml({
  inputPath,
  file,
  originalName,
  outputPath,
  filePrefix,
}: convertAllMarkdownFilesToHtmlNoBaseHtmlProps) {
  let id = randomBytes(16).toString("hex");
  const filePath = path.join(inputPath, file);

  const saveFileName = originalName
    ? file.replace(".md", ".html")
    : `${id}.html`;

  const saveFilePath = path.join(outputPath, `${filePrefix}${saveFileName}`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const convertedContent = convertMarkdownFileToHtml(fileContent);

  // fs.writeFileSync(saveFilePath, convertedContent);
}

function convertMarkdownFileToHtmlWithBaseHtml({
  inputPath,
  file,
  originalName,
  outputPath,
  filePrefix,
  baseInputPath
}: convertAllMarkdownFilesToHtmlWithBaseHtmlProps) {
  let id = randomBytes(16).toString("hex");
  const filePath = path.join(inputPath, file);

  const saveFileName = originalName
    ? file.replace(".md", ".html")
    : `${id}.html`;

  const saveFilePath = path.join(outputPath, `${filePrefix}${saveFileName}`);
  const baseHtmlPath = path.join(baseInputPath, "base.html");

  const baseHtmlContent = fs.readFileSync(baseHtmlPath, "utf8");
  const fileContent = fs.readFileSync(filePath, "utf8");

  const convertedContent = convertMarkdownFileToHtml(fileContent);
  const baseHtmlConvertedContent = baseHtmlContent.replace(/<!--\s*BASE_HTML_CONTENT_PLACEHOLDER\s*-->/g, convertedContent);
  console.log(baseHtmlConvertedContent);
  // fs.writeFileSync(saveFilePath, convertedContent);
}

export async function convertAllMarkdownFilesToHtml({
  inputPath,
  outputPath,
  originalName = true,
  filePrefix = "",
  useBaseHTML = false,
  baseInputPath = ""
}: convertAllMarkdownFilesToHtmlProps) {
  if (!fs.existsSync(outputPath)) {
    throw Error(`Input path ${inputPath} does not exist, execute "scc setup" for setup tool`);
  }

  const allFiles = fs.readdirSync(inputPath);

  allFiles.forEach((file) => {
    if (file.slice(-3) === ".md") {
      switch (useBaseHTML) {
        case true:
          convertMarkdownFileToHtmlWithBaseHtml({
            inputPath,
            file,
            originalName,
            outputPath,
            filePrefix,
            baseInputPath
          });
          break;
        case false:
          convertMarkdownFileToHtmlNotBaseHtml({
            inputPath,
            file,
            originalName,
            outputPath,
            filePrefix,
          });
          break;
      }
    }
  });
}