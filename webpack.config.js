const path = require("path");

module.exports = {
    entry: {
        index: "./src/index.js",
        wardrobe: "./src/waredrobe.js",
        library: "./src/library.js",
        duels: "./src/duels.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
}