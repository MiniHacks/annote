// eslint-disable-next-line import/no-extraneous-dependencies
import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "live.annote.app",
  appName: "Annote",
  webDir: "out",
  bundledWebRuntime: false,
  server: {
    url: "https://172.17.96.158:3000",
    hostname: "localhost",
    iosScheme: "https",
    androidScheme: "https",
  },
};

export default config;
