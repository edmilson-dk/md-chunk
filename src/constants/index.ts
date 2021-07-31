import { commands } from "./commands";
import { fullConfigFile } from "./configs";
import { messages } from "./messages";

export const CONSTANTS = {
  fileConfigsNameDefault: "scc.configs.json",
  commands,
  fullConfigFile,
  messages,
  baseHtmlFlagRegex: /<!--\s*BASE_HTML_CONTENT_PLACEHOLDER\s*-->/g
};
