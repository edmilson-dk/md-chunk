import { FileConfigPropsType } from "../../types/config";

export function mapperFileConfigs(fileConfigs: any): FileConfigPropsType {
  return {
    inputMarkdown: fileConfigs.inputMarkdown,
    outputHTML: fileConfigs.outputHTML,
    inputBaseHTML: fileConfigs.inputBaseHTML,
    deleteInput: fileConfigs.deleteInput,
    originalName: fileConfigs.originalName,
    filePrefix: fileConfigs.filePrefix,
  };
}