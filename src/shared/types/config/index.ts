export type FileConfigSaveHtmlToPropsType = {
  saveToKey: string;
  saveToPath: string;
};

export type FileConfigInputMarkdownPropsType = {
  saveToKey: string;
  inputMarkdownPath: string;
};

export type FileConfigPropsType = {
  outputHTML: FileConfigSaveHtmlToPropsType[];
  inputMarkdown: FileConfigInputMarkdownPropsType[];
  originalName: boolean;
  deleteInput: boolean;
  filePrefix: string;
};