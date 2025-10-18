import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  webExt: {
    binaries: {
      chrome: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    },
  },
  manifest: (({ browser, command, mode, manifestVersion }) => {
    return {
      name: "Olis WXT React",
      version: "0.0.1",
      description: "manifest.json description",
      permissions: ["cookies", "storage", "tabs", "activeTab", "identity", "scripting", "sessions", "sidePanel"],
    }
  })
});
