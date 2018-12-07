module.exports = {
  extends: ["universe", "eslint:recommended", "plugin:react/recommended"],
  rules: {
    "react/display-name": false
  },
  env: {
    browser: true,
    node: true
  }
};
