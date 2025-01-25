const path = require("path");

module.exports = {
    entry: {
        index: "./src/index.js",
        wardrobe: "./src/waredrobe.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
}