import type { CodegenConfig } from "@graphql-codegen/cli";

const codegen: CodegenConfig = {
  schema: "http://152.228.215.94:83/api",
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};
export default codegen;
