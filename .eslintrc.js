module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "node": true
    },
    "overrides": [
      {
        "files": ["*.ts"],
        "parser": "@typescript-eslint/parser",
        "parserOptions": {
            "project": "tsconfig.json",
            "sourceType": "module"
        },
        "extends": [
            "plugin:@typescript-eslint/recommended",
            "plugin:@typescript-eslint/recommended-requiring-type-checking",
            "prettier", // "prettier/@typescript-eslint" merged into prettier
        ],
        "plugins": [
          "eslint-plugin-import",
          "@angular-eslint/eslint-plugin",
          "eslint-plugin-jsdoc",
          "@typescript-eslint",
        ],
        "rules": {
          "@angular-eslint/component-class-suffix": "error",
          "@angular-eslint/component-selector": [
              "error",
              {
                  "type": "element",
                  "prefix": "wex",
                  "style": "kebab-case"
              }
          ],
          "@angular-eslint/contextual-lifecycle": "error",
          "@angular-eslint/directive-class-suffix": "error",
          "@angular-eslint/directive-selector": [
              "error",
              {
                  "type": "attribute",
                  "prefix": "wex",
                  "style": "camelCase"
              }
          ],
          "@angular-eslint/no-conflicting-lifecycle": "error",
          "@angular-eslint/no-host-metadata-property": "error",
          // "@angular-eslint/no-input-rename": "error",
          "@angular-eslint/no-inputs-metadata-property": "error",
          "@angular-eslint/no-output-native": "error",
          "@angular-eslint/no-output-on-prefix": "error",
          "@angular-eslint/no-output-rename": "error",
          "@angular-eslint/no-outputs-metadata-property": "error",
          "@angular-eslint/use-lifecycle-interface": "error",
          "@angular-eslint/use-pipe-transform-interface": "error",
          "@typescript-eslint/adjacent-overload-signatures": "error",
          "@typescript-eslint/array-type": "off",
          "@typescript-eslint/ban-types": [
              "error",
              {
                  "types": {
                      "Object": {
                          "message": "Avoid using the `Object` type. Did you mean `object`?"
                      },
                      "Function": {
                          "message": "Avoid using the `Function` type. Prefer a specific function type, like `() => void`."
                      },
                      "Boolean": {
                          "message": "Avoid using the `Boolean` type. Did you mean `boolean`?"
                      },
                      "Number": {
                          "message": "Avoid using the `Number` type. Did you mean `number`?"
                      },
                      "String": {
                          "message": "Avoid using the `String` type. Did you mean `string`?"
                      },
                      "Symbol": {
                          "message": "Avoid using the `Symbol` type. Did you mean `symbol`?"
                      }
                  }
              }
          ],
          "@typescript-eslint/consistent-type-assertions": "error",
          "@typescript-eslint/consistent-type-definitions": "off",
          "@typescript-eslint/dot-notation": "error",
          "@typescript-eslint/explicit-member-accessibility": [
              "error",
              {
                  "accessibility": "explicit",
                  "overrides": {
                    "constructors": "off"
                  }
              }
          ],
          // "@typescript-eslint/indent": [
          //     "error",
          //     2,
          //     {
          //         "FunctionDeclaration": {
          //             "parameters": "first"
          //         },
          //         "FunctionExpression": {
          //             "parameters": "first"
          //         }
          //     }
          // ],
          "@typescript-eslint/member-delimiter-style": [
              "error",
              {
                  "multiline": {
                      "delimiter": "semi",
                      "requireLast": true
                  },
                  "singleline": {
                      "delimiter": "semi",
                      "requireLast": false
                  }
              }
          ],
          "@typescript-eslint/member-ordering": [
              "error",
              {
                "default": [
                  // Index signature
                  'signature',
                  'call-signature',
                  // Fields
                  'public-static-field',
                  'protected-static-field',
                  'private-static-field',
                  'public-decorated-field',
                  'protected-decorated-field',
                  'private-decorated-field',
                  'public-instance-field',
                  'protected-instance-field',
                  'private-instance-field',
                  'public-abstract-field',
                  'protected-abstract-field',
                  'private-abstract-field',
                  'public-field',
                  'protected-field',
                  'private-field',
                  'static-field',
                  'instance-field',
                  'abstract-field',
                  'decorated-field',
                  'field',
                  // Constructors
                  'public-constructor',
                  'protected-constructor',
                  'private-constructor',

                  'constructor',

                  // Methods
                  'public-static-method',
                  'protected-static-method',
                  'private-static-method',
                  'public-decorated-method',
                  'protected-decorated-method',
                  'private-decorated-method',
                  'public-instance-method',
                  'protected-instance-method',
                  'private-instance-method',
                  'public-abstract-method',
                  'protected-abstract-method',
                  'private-abstract-method',
                  'public-method',
                  'protected-method',
                  'private-method',
                  'static-method',
                  'instance-method',
                  'abstract-method',
                  'decorated-method',
                  'method',
                ]
              }
          ],
          "@typescript-eslint/naming-convention": [
            "error",
            {
              "selector": "enumMember",
              "format": ["PascalCase"],
            },
          ],
          "@typescript-eslint/no-empty-function": "off",
          "@typescript-eslint/no-empty-interface": "error",
          "@typescript-eslint/no-explicit-any": "error",
          "@typescript-eslint/no-inferrable-types": [
              "error",
              {
                  "ignoreParameters": true
              }
          ],
          "@typescript-eslint/no-misused-new": "error",
          "@typescript-eslint/no-namespace": "error",
          "@typescript-eslint/no-non-null-assertion": "error",
          "@typescript-eslint/no-parameter-properties": "off",
          "@typescript-eslint/no-shadow": [
              "warn",
              {
                  "hoist": "all"
              }
          ],
          "@typescript-eslint/no-unused-expressions": "error",
          "@typescript-eslint/no-use-before-define": "off",
          "@typescript-eslint/no-var-requires": "off",
          "@typescript-eslint/prefer-for-of": "error",
          "@typescript-eslint/prefer-function-type": "error",
          "@typescript-eslint/prefer-namespace-keyword": "error",
          "@typescript-eslint/quotes": [
              "error",
              "single",
              {
                  "avoidEscape": true
              }
          ],
          "@typescript-eslint/semi": [
              "error",
              "always"
          ],
          "@typescript-eslint/triple-slash-reference": [
              "error",
              {
                  "path": "always",
                  "types": "prefer-import",
                  "lib": "always"
              }
          ],
          "@typescript-eslint/type-annotation-spacing": "error",
          "@typescript-eslint/unified-signatures": "error",
          "@typescript-eslint/explicit-function-return-type": [
            "warn",
            {
              "allowExpressions": true
            }
          ],
          "arrow-body-style": ["warn", "as-needed"],
          "arrow-parens": [
              "off",
              "always"
          ],
          "brace-style": [
              "off",
              "off"
          ],
          "comma-dangle": [
              "warn",
              "always-multiline"
          ],
          "complexity": "off",
          "constructor-super": "error",
          "curly": "error",
          "eol-last": "warn",
          "eqeqeq": [
              "error",
              "smart"
          ],
          "guard-for-in": "error",
          "id-blacklist": [
              "error",
              "any",
              "Number",
              "number",
              "String",
              "string",
              "Boolean",
              "boolean",
              "Undefined",
              "undefined"
          ],
          "id-match": "error",
          "import/no-deprecated": "warn",
          "import/order": "error",
          "jsdoc/check-alignment": "off",
          "jsdoc/check-indentation": "off",
          "jsdoc/newline-after-description": "error",
          "jsdoc/no-types": "error",
          "linebreak-style": "off",
          "max-classes-per-file": "off",
          "max-len": [
              "warn",
              {
                  "code": 120,
                  "ignoreComments": true
              }
          ],
          "new-parens": "off",
          "newline-per-chained-call": "off",
          "no-bitwise": "error",
          "no-caller": "error",
          "no-cond-assign": "error",
          "no-console": [
              "error",
              {
                  "allow": [
                      "log",
                      "warn",
                      "dir",
                      "timeLog",
                      "assert",
                      "clear",
                      "count",
                      "countReset",
                      "group",
                      "groupEnd",
                      "table",
                      "debug",
                      "info",
                      "dirxml",
                      "error",
                      "groupCollapsed",
                      "Console",
                      "profile",
                      "profileEnd",
                      "timeStamp",
                      "context"
                  ]
              }
          ],
          "no-debugger": "error",
          "no-empty": "off",
          "no-eval": "error",
          "no-extra-semi": "off",
          "no-fallthrough": "error",
          "no-invalid-this": "off",
          "no-irregular-whitespace": "off",
          "no-multiple-empty-lines": [
            "error",
            {
              max: 1,
            },
          ],
          "no-new-wrappers": "error",
          "no-restricted-imports": [
              "error",
              "rxjs/Rx"
          ],
          "no-throw-literal": "error",
          "no-trailing-spaces": "off",
          "no-undef-init": "error",
          "no-underscore-dangle": "error",
          "no-unsafe-finally": "error",
          "no-unused-labels": "error",
          "no-var": "error",
          "object-shorthand": "error",
          "one-var": [
              "error",
              "never"
          ],
          "prefer-const": "error",
          "quote-props": [
              "error",
              "as-needed"
          ],
          "radix": "error",
          "react/jsx-curly-spacing": "off",
          "react/jsx-equals-spacing": "off",
          "react/jsx-tag-spacing": [
              "off",
              {
                  "afterOpening": "allow",
                  "closingSlash": "allow"
              }
          ],
          "react/jsx-wrap-multilines": "off",
          "space-before-function-paren": [
              "error",
              {
                  "anonymous": "never",
                  "asyncArrow": "always",
                  "named": "never"
              }
          ],
          "space-in-parens": [
              "off",
              "never"
          ],
          "spaced-comment": [
              "error",
              "always",
              {
                  "markers": [
                      "/"
                  ],
                  "exceptions": ["-", "+", "*"]
              }
          ],
          "use-isnan": "error",
          "valid-typeof": "off",
          "sort-imports": [
            "warn",
            {
              "ignoreCase": true,
              "ignoreDeclarationSort": true,
              "memberSyntaxSortOrder": ["none", "all", "single", "multiple"],
            }
          ]
        }
      },
      {
        "files": ["index.html","*.component.html"],
        "parser": "@angular-eslint/template-parser",
        extends: ["plugin:@angular-eslint/template/recommended"],
        "plugins": [
          "@angular-eslint/eslint-plugin-template",
        ],
        "rules": {
          "@angular-eslint/template/banana-in-box": "error",
          "@angular-eslint/template/eqeqeq": "error",
          "@angular-eslint/template/no-negated-async": "error",
        }
      },
    ],
};
