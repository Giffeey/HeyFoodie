const { useBabelRc, override, addPostcssPlugins } = require("customize-cra")
const { addReactRefresh } = require("customize-cra-react-refresh");

if (process.env.NODE_ENV === "production") {
}

module.exports = override(useBabelRc(),addReactRefresh())
