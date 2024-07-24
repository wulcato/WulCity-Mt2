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
exports.__esModule = true;
var http = __importStar(require("http"));
var https = __importStar(require("https"));
var crypto_1 = require("crypto");
var fs_1 = require("fs");
var mkdirp = __importStar(require("mkdirp"));
var config_1 = require("../src/config");
var ipcRenderer = window.require('electron').ipcRenderer;
if (typeof Array.prototype.delayedForEach !== 'function') {
    // eslint-disable-next-line func-names,no-extend-native
    Array.prototype.delayedForEach = function (callback, timeout, thisArg) {
        var _this = this;
        if (!this) {
            return;
        }
        var i = 0;
        var l = this.length;
        var caller = function () {
            callback.call(thisArg || _this, _this[i], i, _this);
            if (++i < l) {
                setTimeout(caller, timeout);
            }
        };
        caller();
    };
}
var adapterFor = (function () {
    var adapters = {
        'http:': http,
        'https:': https
    };
    return function (inputUrl) { return adapters[new URL(inputUrl).protocol]; };
})();
var downloadFile = function (configuration) { return new Promise(function (resolve, reject) {
    adapterFor(configuration.remoteFile).get(configuration.remoteFile, function (response) {
        var statusCode = response.statusCode;
        var error;
        var progressSize = 0;
        var total_bytes = 0;
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                "Status Code: ".concat(statusCode));
        }
        if (error) {
            response.resume();
            reject(error.message);
            return;
        }
        response.pipe((0, fs_1.createWriteStream)(configuration.localFile));
        total_bytes = parseInt(response.headers['content-length'], 10);
        response.on('data', function (chunk) {
            progressSize += chunk.length;
            configuration.port.postMessage({
                type: 'fileProgress',
                currentFile: configuration.fileName,
                action: "Downloading ".concat(configuration.fileName),
                progressSize: progressSize,
                total_bytes: total_bytes
            });
        });
        response.on('end', function () {
            configuration.port.postMessage({
                type: 'end',
                progressSize: progressSize
            });
            resolve('');
        });
    });
}); };
ipcRenderer.on('new-client', function (eventParent, args) {
    var port = eventParent.ports[0];
    var isDev = args.isDev, path = args.path;
    port.onmessage = function (event) {
        event.data.delayedForEach(function (fileData) {
            var fileName = fileData.fileName.replace(/\//g, '\\').replace(/(%20)/g, ' ');
            var remoteFile = "".concat(config_1.patchlistFolder).concat(fileData.fileName).replace(/\\/g, '\/');
            var localFile = "".concat(isDev ? config_1.debugFolder : path, "\\").concat(fileData.fileName.replace(/\//g, '\\').replace(/(%20)/g, ' '));
            (0, fs_1.access)(localFile, fs_1.constants.F_OK, function (err) {
                port.postMessage({ type: 'verifyingFile', action: "Verifying ".concat(fileName) });
                if (err) {
                    var directory = localFile.substring(0, localFile.lastIndexOf('\\') + 1);
                    if (!(0, fs_1.existsSync)(directory)) {
                        mkdirp.sync(directory);
                    }
                    downloadFile({
                        fileName: fileData.fileName.replace(/\//g, '\\').replace(/(%20)/g, ' '),
                        remoteFile: remoteFile,
                        localFile: localFile,
                        port: port
                    })["catch"](function (error) {
                        ipcRenderer.send('errorDownloadFile', { fileName: fileName, error: error });
                    });
                }
                else {
                    var hash_1 = (0, crypto_1.createHash)('sha256');
                    var input_1 = (0, fs_1.createReadStream)(localFile);
                    input_1.on('readable', function () {
                        var data = input_1.read();
                        if (data) {
                            hash_1.update(data);
                        }
                        else {
                            var digest = hash_1.digest('hex');
                            if (digest !== fileData.hash) {
                                downloadFile({
                                    fileName: fileName,
                                    remoteFile: remoteFile,
                                    localFile: localFile,
                                    port: port
                                })["catch"](function (error) {
                                    ipcRenderer.send('errorDownloadFile', { fileName: fileName, error: error });
                                });
                            }
                            else {
                                port.postMessage({ type: 'progressSize', progressSize: fileData.size });
                            }
                        }
                    });
                }
            });
        }, 0);
    };
});
//# sourceMappingURL=worker.js.map