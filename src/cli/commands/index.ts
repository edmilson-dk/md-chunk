import { Command } from 'commander';

import packageJson from '../../../package.json';
import { markdownToHtmlCommand } from './converts';
import { initCommand, setupCommand } from './init';

const program = new Command();
program.version(packageJson.version);

function buildCommands(): Command {
  initCommand(program);
  markdownToHtmlCommand(program);
  setupCommand(program);

  return program;
}

export default buildCommands;
