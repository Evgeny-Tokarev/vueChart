import type { JestConfigWithTsJest } from "ts-jest"

const jestConfig: JestConfigWithTsJest = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  globals: {
    __DEV__: true
  },
  preset: "ts-jest",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"]
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest"
  }
}

export default jestConfig
