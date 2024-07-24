"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var i18next_1 = __importDefault(require("i18next"));
var isDev = __importStar(require("electron-is-dev"));
var languageEN = __importStar(require("../src/localization/en.json"));
var languagePT = __importStar(require("../src/localization/pt.json"));
i18next_1["default"].init({
    resources: {
        en: languageEN,
        pt: languagePT
    },
    supportedLngs: ['en', 'pt'],
    fallbackLng: 'en',
    debug: isDev,
    keySeparator: '.',
    interpolation: {
        formatSeparator: ','
    }
});
exports["default"] = i18next_1["default"];
//# sourceMappingURL=i18n.js.map