"use strict";
exports.__esModule = true;
exports.debugFolder = exports.locales = exports.localeCfgPath = exports.enableLocaleCfgUpdate = exports.launchParameters = exports.configName = exports.binaryName = exports.serverName = exports.discordUrl = exports.enableDiscordButton = exports.patchSliderImages = exports.patchSliderUrl = exports.enableSlider = exports.patchlistFolder = exports.patchlistUrl = void 0;
exports.patchlistUrl = 'http://192.168.1.31/files.json';
exports.patchlistFolder = 'http://192.168.1.31/files/';
exports.enableSlider = true; //if false the slider will be disabled
//if enableSlider is false the value of this variables is optional
exports.patchSliderUrl = 'http://192.168.1.31/slider.json';
exports.patchSliderImages = 'http://192.168.1.31/slider/';
/*
Karbust Localhost Debug URLs:

export const patchlistUrl = 'http://localhost:81/electron/files.json'
export const patchlistFolder = 'http://localhost:81/electron/files/'
export const patchSliderUrl = 'http://localhost:81/electron/slider.json'
export const patchSliderImages = 'http://localhost:81/electron/slider/'
 */
exports.enableDiscordButton = true; //if false the button will not be displayed.
exports.discordUrl = 'https://discord.gg/EbVTWnFYq7';
exports.serverName = 'WulCity';
exports.binaryName = 'metin2client.bin';
exports.configName = 'config.exe';
exports.launchParameters = ['--something'];
exports.enableLocaleCfgUpdate = true; //if true the locale.cfg will be updated when changing the language.
exports.localeCfgPath = 'locale.cfg'; //default place, if it's inside a folder, prepend the path of such folder.
/*
Example:
export const localeCfgPath = 'settings\\locale.cfg'

Don't put the backslashes in the beginning, and in the middle use 2.
 */
exports.locales = {
    'de': '10002 1252 de',
    'es': '10002 1252 es',
    'en': '10002 1252 en',
    'fr': '10002 1252 fr',
    'pl': '10002 1250 pl',
    'pt': '10000 1252 pt',
    'ro': '10002 1250 ro',
    'tr': '10012 1254 tr'
};
/* NOT BEING USED
export const ServerUrl = 'https://karbust.me/'
export const ServerUrlForum = 'https://karbust.me/'
export const ServerUrlRegister = 'https://karbust.me/'
export const ServerUrlSupport = 'https://karbust.me/'
*/
exports.debugFolder = 'C:\\Users\\Karbust\\Desktop\\tests';
//# sourceMappingURL=config.js.map