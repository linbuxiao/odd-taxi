import { DenonConfig } from "https://deno.land/x/denon/mod.ts";
import { config as env } from "https://deno.land/x/dotenv/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run app.ts",
      desc: "Run my webserver",
      env: env(),
      allow: ["env", "net", "read"]
    },
  },
};

export default config;