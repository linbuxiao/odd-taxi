import { DenonConfig } from "https://deno.land/x/denon/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run app.ts",
      desc: "Run my webserver",
      allow: ["env", "net", "read"]
    },
  },
};

export default config;