/* eslint-disable @typescript-eslint/no-require-imports */
// Keep this file as a CJS bridge so tools that still load `tailwind.config.ts`
// do not trigger ESM reparsing warnings in Node.
module.exports = require("./tailwind.config.js");
