import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // Package generator - for creating standard packages
  plop.setGenerator("package", {
    description: "Create a new package in the packages directory",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the package?",
        validate: (input: string) => {
          if (input.includes(" ")) {
            return "Package name cannot include spaces";
          }
          if (input.length === 0) {
            return "Package name is required";
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/{{ name }}/package.json",
        templateFile: "templates/package/package.json.hbs",
      },
      {
        type: "add",
        path: "packages/{{ name }}/tsconfig.json",
        templateFile: "templates/package/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "packages/{{ name }}/.gitignore",
        templateFile: "templates/package/.gitignore.hbs",
      },
      {
        type: "add",
        path: "packages/{{ name }}/src/index.ts",
        templateFile: "templates/package/src/index.ts.hbs",
      },
    ],
  });

  // Config generator - for creating config packages
  plop.setGenerator("config", {
    description: "Create a new config package in the configs directory",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the config package?",
        validate: (input: string) => {
          if (input.includes(" ")) {
            return "Config name cannot include spaces";
          }
          if (input.length === 0) {
            return "Config name is required";
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "configs/{{ name }}/package.json",
        templateFile: "templates/config/package.json.hbs",
      },
      {
        type: "add",
        path: "configs/{{ name }}/tsconfig.json",
        templateFile: "templates/config/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "configs/{{ name }}/.gitignore",
        templateFile: "templates/config/.gitignore.hbs",
      },
      {
        type: "add",
        path: "configs/{{ name }}/src/index.ts",
        templateFile: "templates/config/src/index.ts.hbs",
      },
    ],
  });

  // E2E generator - for creating e2e test packages
  plop.setGenerator("e2e", {
    description: "Create a new E2E test package in the e2e directory",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the E2E test package?",
        validate: (input: string) => {
          if (input.includes(" ")) {
            return "E2E package name cannot include spaces";
          }
          if (input.length === 0) {
            return "E2E package name is required";
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "e2e/{{ name }}/package.json",
        templateFile: "templates/e2e/package.json.hbs",
      },
      {
        type: "add",
        path: "e2e/{{ name }}/tsconfig.json",
        templateFile: "templates/e2e/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "e2e/{{ name }}/.gitignore",
        templateFile: "templates/e2e/.gitignore.hbs",
      },
      {
        type: "add",
        path: "e2e/{{ name }}/playwright.config.ts",
        templateFile: "templates/e2e/playwright.config.ts.hbs",
      },
      {
        type: "add",
        path: "e2e/{{ name }}/tests/.gitkeep",
        template: "",
      },
    ],
  });
}
