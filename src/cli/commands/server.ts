import { Command } from "commander";

import { startServer } from "../../api/server";

export function startServerCommand(program: Command) {
  program
    .command("server")
    .description("Start the server")
    .action(() => {
      startServer();
    });
}