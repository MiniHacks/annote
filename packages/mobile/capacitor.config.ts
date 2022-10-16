// eslint-disable-next-line import/no-extraneous-dependencies
import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "live.annote.app",
  appName: "Annote",
  webDir: "out",
  bundledWebRuntime: false,
  server: {
    url: "https://annote.live",
  },
};

export default config;
