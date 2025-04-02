module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended"
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off"
  },
  globals: {
    defineEmits: "readonly",
    defineProps: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly"
  }

}
