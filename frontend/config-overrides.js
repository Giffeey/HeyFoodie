const { useBabelRc, override, addPostcssPlugins } = require("customize-cra")

if (process.env.NODE_ENV === "production") {
}

module.exports = override(useBabelRc())
