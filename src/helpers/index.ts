import { existsSync, promises } from "fs";
import chalk from "chalk";

import { mapperFileConfigs } from "../shared/mappers/config";
import { FileConfigPropsType } from "../shared/types/config";

export function handleCreateConfigsFolders(foldersPaths: string[]) {
  foldersPaths.forEach(async folderPath => {
    if (!existsSync(folderPath)) {
      await promises.mkdir(folderPath, { recursive: true });
    }
  });
}

export async function getSccConfigsOrNull(): Promise<FileConfigPropsType | null> {
  const existsFile = existsSync(`${__dirname}/../../scc.configs.json`);

  if (existsFile) {
    const jsonFile: FileConfigPropsType = require(`${__dirname}/../../scc.configs.json`);
    const mappedConfigs = mapperFileConfigs(jsonFile);
    return mappedConfigs;
  }

  return null;
}

export function validatePath(targetPath: string) {
  if (!existsSync(targetPath)) {
    console.log(
      chalk.red(`\n❌ - Path does not exist: ${targetPath}, execute 'scc setup' to create setup tool\n`)
    );
    process.exit(1);
  }
}

export function renderHtmlBaseTemplate(targetHtml: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>SCC</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.1.0/styles/base16/snazzy.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.1.0/highlight.min.js"></script>
        <!-- and it's easy to individually load additional languages -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.1.0/languages/go.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <style>
          .hljs {
            padding: 20px;
            border-radius: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${targetHtml}
        </div>
      </body>
    </html>
  `;
}