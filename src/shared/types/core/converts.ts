export type ConvertAllMarkdownFilesToHtmlProps = {
  inputPath: string;
  outputPath: string;
  originalName: boolean;
  filePrefix: string;
  useBaseHTML: boolean;
  baseInputPath: string;
};

export type ConvertAllMarkdownFilesToHtmlNoBaseHtmlProps = {
  fileContent: string;
  saveFilePath: string;
};

export type ConvertAllMarkdownFilesToHtmlWithBaseHtmlProps = {
  saveFilePath: string;
  fileContent: string;
  baseInputPath: string;
};