#!/usr/bin/env node

import buildCommands from "./cli/commands";

buildCommands()
  .parse(process.argv);