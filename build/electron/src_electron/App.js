"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// eslint-disable-next-line import/no-extraneous-dependencies
var electron_1 = require("electron");
var Main_1 = __importDefault(require("./Main"));
Main_1["default"].main(electron_1.app, electron_1.BrowserWindow);
//# sourceMappingURL=App.js.map