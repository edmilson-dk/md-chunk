import fs from "fs";
import path from "path";
import remark from 'remark';
import html from 'remark-html';
import { randomBytes } from "crypto";

import { convertAllMarkdownFilesToHtmlProps } from "../shared/types/core/converts";

export function convertMarkdownFileToHtml(content: string): string {
  const convertedContent = remark()
    .use(html)
    .processSync(content)
    .toString();

  return convertedContent;
}

export async function convertAllMarkdownFilesToHtml({
  inputPath,
  outputPath,
  originalName = true,
  filePrefix = ""
}: convertAllMarkdownFilesToHtmlProps) {
  if (!fs.existsSync(outputPath)) {
    throw Error(`Input path ${inputPath} does not exist, execute 'scc setup' for setup tool`);
  }

  const allFiles = fs.readdirSync(inputPath);

  allFiles.forEach((file) => {
    if (file.slice(-3) === '.md') {
      let id = randomBytes(16).toString("hex");
      const filePath = path.join(inputPath, file);

      const saveFileName = originalName
        ? file.replace(".md", ".html")
        : `${id}.html`;

      const saveFilePath = path.join(outputPath, `${filePrefix}${saveFileName}`);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const convertedContent = convertMarkdownFileToHtml(fileContent);

      fs.writeFileSync(saveFilePath, convertedContent);
    }
  });
}