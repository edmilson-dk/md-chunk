export type FileConfigSaveHtmlToPropsType = {
  saveToKey: string;
  saveToPath: string;
  useBaseHTML: boolean;
};

export type FileConfigInputMarkdownPropsType = {
  saveToKey: string;
  inputMarkdownPath: string;
};

export type FileConfigInputBaseHtmlPropsType = {
  saveToKey: string;
  inputBaseHTMLPath: string;
};

export type FileConfigPropsType = {
  outputHTML: FileConfigSaveHtmlToPropsType[];
  inputMarkdown: FileConfigInputMarkdownPropsType[];
  inputBaseHTML: FileConfigInputBaseHtmlPropsType[];
  originalName: boolean;
  deleteInput: boolean;
  filePrefix: string;
};