export default {
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.js"],
  // Treat .js as ESM since package.json has "type": "module"
  extensionsToTreatAsEsm: [".js"],
  // No transform needed for plain JS; add babel-jest if you introduce non-node syntax later
  transform: {}
};
