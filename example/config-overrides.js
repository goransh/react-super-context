/* eslint-disable @typescript-eslint/no-var-requires */
const {
  override,
  removeModuleScopePlugin,
  useEslintRc,
  babelInclude,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  removeModuleScopePlugin(),
  useEslintRc(),
  babelInclude([path.resolve("src"), path.resolve("../src")]),
  addWebpackAlias({
    "react-super-context": path.resolve(__dirname, "../src"),
  })
);
