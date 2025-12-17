const creacoAlias = require("@craco/craco");

module.exports = {
    plugin: [
        {
            plugin: creacoAlias,
            options: {
                source: "tsconfig",
                baseUrl: ".",
                tsConfigPath: "tsconfig.paths.json",
                debug: false
            }
        }
    ]
}