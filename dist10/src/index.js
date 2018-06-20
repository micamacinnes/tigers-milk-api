"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./application");
exports.TigersMilkApiApplication = application_1.TigersMilkApiApplication;
async function main(options) {
    const app = new application_1.TigersMilkApiApplication(options);
    await app.boot();
    await app.start();
    return app;
}
exports.main = main;
//# sourceMappingURL=index.js.map