
module.exports = {
  testEnvironment: "jsdom",

  setupFiles: ["<rootDir>/src/testPolyfills.cjs"],

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/src/testStyleMock.cjs",
  },

  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
