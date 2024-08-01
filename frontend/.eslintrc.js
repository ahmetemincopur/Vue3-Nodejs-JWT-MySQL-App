module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-env"],
    },
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  rules: {
    "vue/no-multiple-template-root": "off",
    "vue/no-v-model-argument": "off",
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        "no-undef": "off",
      },
    },
    {
      files: ["src/components/*.js"], // Babel'in hata verdiği dizini belirleyin
      rules: {
        "@babel/new-cap": "off",
        "@babel/no-invalid-this": "off",
        "@babel/no-unused-expressions": "off",
        "@babel/valid-typeof": "off",
      },
    },
  ],
};
