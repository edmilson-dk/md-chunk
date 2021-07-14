import { FileConfigPropsType } from "../../types/config";

export function mapperFileConfigs(fileConfigs: any): FileConfigPropsType {
  return {
    inputMarkdown: fileConfigs.inputMarkdown,
    outputHTML: fileConfigs.outputHTML,
    deleteInput: fileConfigs.deleteInput,
    originalName: fileConfigs.originalName,
    filePrefix: fileConfigs.filePrefix,
  };
}