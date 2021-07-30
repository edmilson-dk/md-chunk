export type convertAllMarkdownFilesToHtmlProps = {
  inputPath: string;
  outputPath: string;
  originalName: boolean;
  filePrefix: string;
  useBaseHTML: boolean;
  baseInputPath: string;
};

export type convertAllMarkdownFilesToHtmlNoBaseHtmlProps = Omit<
  convertAllMarkdownFilesToHtmlProps,
  "useBaseHTML" | "baseInputPath"
> & {
  file: string;
};

export type convertAllMarkdownFilesToHtmlWithBaseHtmlProps = Omit<
  convertAllMarkdownFilesToHtmlProps,
  "useBaseHTML" | "baseInputPath"
> & {
  file: string;
  baseInputPath: string;
};