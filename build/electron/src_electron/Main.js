"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var i18next_1 = __importDefault(require("i18next"));
var electron_is_dev_1 = __importDefault(require("electron-is-dev"));
// eslint-disable-next-line import/no-extraneous-dependencies
var electron_1 = require("electron");
var config_1 = require("../src/config");
var i18n_1 = __importDefault(require("./i18n"));
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.onWindowAllClosed = function () {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    };
    Main.onClose = function () {
        // @ts-ignore
        Main.mainWindow = null;
        // @ts-ignore
        Main.workerWindow = null;
    };
    Main.onReady = function () {
        var _this = this;
        Main.workerWindow = new electron_1.BrowserWindow({
            show: false,
            webPreferences: {
                contextIsolation: false,
                nodeIntegration: true
            }
        });
        Main.workerWindow.loadFile(electron_is_dev_1["default"] ? '../../../public/worker.html' : 'build/worker.html');
        Main.mainWindow = new Main.BrowserWindow({
            width: 800,
            height: config_1.enableSlider ? 520 : 200,
            resizable: false,
            fullscreenable: electron_is_dev_1["default"],
            //transparent: true,
            frame: false,
            useContentSize: false,
            webPreferences: {
                contextIsolation: false,
                nodeIntegration: true,
                nodeIntegrationInWorker: true,
                enableRemoteModule: true
            }
        });
        Main.mainWindow.loadURL(electron_is_dev_1["default"] ? 'http://localhost:3000' : "file://".concat(__dirname, "/../../index.html"));
        Main.mainWindow.on('closed', Main.onClose);
        if (electron_is_dev_1["default"]) {
            Main.mainWindow.webContents.openDevTools({ mode: 'detach' });
        }
        if (!(0, fs_1.existsSync)(Main.settingsFile)) {
            var obj = { language: 'en' };
            (0, fs_1.writeFileSync)(Main.settingsFile, JSON.stringify(obj));
            i18next_1["default"].changeLanguage('en');
        }
        else {
            var language = JSON.parse((0, fs_1.readFileSync)(Main.settingsFile, 'utf8')).language;
            i18next_1["default"].changeLanguage(language);
        }
        electron_1.ipcMain.on('minimize', function () { return Main.mainWindow.minimize(); });
        electron_1.ipcMain.on('close', function () {
            electron_1.dialog.showMessageBox(Main.mainWindow, {
                type: 'question',
                title: config_1.serverName,
                message: 'Are you sure you want to quit?',
                noLink: true,
                cancelId: 1,
                buttons: ['Quit', 'Cancel']
            }).then(function (confirmation) {
                if (confirmation.response === 0) {
                    Main.application.quit();
                }
            });
        });
        electron_1.ipcMain.on('launchClient', function () {
            (0, child_process_1.spawn)(config_1.binaryName, config_1.launchParameters, {
                detached: true,
                cwd: electron_is_dev_1["default"] ? config_1.debugFolder : process.env.PORTABLE_EXECUTABLE_DIR
            });
        });
        electron_1.ipcMain.on('launchConfig', function () {
            (0, child_process_1.spawn)(config_1.configName, config_1.launchParameters, {
                detached: true,
                cwd: electron_is_dev_1["default"] ? config_1.debugFolder : process.env.PORTABLE_EXECUTABLE_DIR
            });
        });
        electron_1.ipcMain.on('launchUrl', function (_, args) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, electron_1.shell.openExternal(args.url)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        electron_1.ipcMain.on('languageChange', function (_, args) { return __awaiter(_this, void 0, void 0, function () {
            var settings;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        settings = JSON.parse((0, fs_1.readFileSync)(Main.settingsFile, 'utf8'));
                        settings.language = args.language;
                        return [4 /*yield*/, i18next_1["default"].changeLanguage(args.language)];
                    case 1:
                        _b.sent();
                        (0, fs_1.writeFileSync)(Main.settingsFile, JSON.stringify(settings));
                        if (config_1.enableLocaleCfgUpdate) {
                            (0, fs_1.writeFileSync)(Main.localeCfgFile, (_a = config_1.locales[args.language]) !== null && _a !== void 0 ? _a : config_1.locales.en);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        electron_1.ipcMain.on('getLanguage', function (event) {
            var rawData = (0, fs_1.readFileSync)(Main.settingsFile, 'utf8');
            var settings = JSON.parse(rawData);
            event.returnValue = settings.language;
        });
        electron_1.ipcMain.on('request-worker-channel', function (event) {
            if (event.senderFrame === Main.mainWindow.webContents.mainFrame) {
                var _a = new electron_1.MessageChannelMain(), port1 = _a.port1, port2 = _a.port2;
                Main.workerWindow.webContents.postMessage('new-client', { isDev: electron_is_dev_1["default"], path: process.env.PORTABLE_EXECUTABLE_DIR }, [port1]);
                event.senderFrame.postMessage('provide-worker-channel', null, [port2]);
            }
        });
        electron_1.ipcMain.on('noNetwork', function () {
            electron_1.dialog.showMessageBoxSync(Main.mainWindow, {
                title: config_1.serverName,
                message: i18n_1["default"].t('noConnection'),
                type: 'error'
            });
            Main.application.quit();
        });
        electron_1.ipcMain.on('errorServer', function () {
            electron_1.dialog.showMessageBoxSync(Main.mainWindow, {
                title: config_1.serverName,
                message: i18n_1["default"].t('errorConnection'),
                type: 'error'
            });
            Main.application.quit();
        });
        electron_1.ipcMain.on('errorSliderFile', function () {
            electron_1.dialog.showMessageBoxSync(Main.mainWindow, {
                title: config_1.serverName,
                message: i18n_1["default"].t('errorSliderFile'),
                type: 'error'
            });
        });
        electron_1.ipcMain.on('errorDownloadFile', function (_, args) {
            electron_1.dialog.showMessageBoxSync(Main.mainWindow, {
                title: config_1.serverName,
                message: i18n_1["default"].t('errorDownloadFile', { fileName: args.fileName }),
                type: 'error',
                detail: args.error
            });
        });
    };
    Main.main = function (app, browserWindow) {
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    };
    Main.settingsFile = "".concat(electron_is_dev_1["default"] ? config_1.debugFolder : process.env.PORTABLE_EXECUTABLE_DIR, "\\patcher_settings");
    Main.localeCfgFile = "".concat(electron_is_dev_1["default"] ? config_1.debugFolder : process.env.PORTABLE_EXECUTABLE_DIR, "\\").concat(config_1.localeCfgPath);
    return Main;
}());
exports["default"] = Main;
//# sourceMappingURL=Main.js.map