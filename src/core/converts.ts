import fs from "fs";
import path from "path";
import remark from 'remark';
import html from 'remark-html';

export function convertMarkdownFileToHtml(content: string): string {
  const convertedContent = remark()
    .use(html)
    .processSync(content)
    .toString();

  return convertedContent;
}

export async function convertAllMarkdownFilesToHtml(inputPath: string, outputPath: string) {
  const allFiles = fs.readdirSync(inputPath);

  allFiles.forEach((file) => {
    if(file.slice(-3) === '.md') {
      const filePath = path.join(inputPath, file);
      const saveFilePath = path.join(outputPath, file.replace(".md", ".html"));
      const fileContent = fs.readFileSync(filePath, "utf8");
      const convertedContent = convertMarkdownFileToHtml(fileContent);
      fs.writeFileSync(saveFilePath, convertedContent);
    }
  });
}