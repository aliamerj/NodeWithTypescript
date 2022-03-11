"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const events_1 = __importDefault(require("events"));
let url = "http://amerson.com";
class Logger extends events_1.default {
    log(message) {
        console.log(message);
        // Raise an event 
        this.emit('massageLog', { id: 1, ulr: url });
    }
}
exports.Logger = Logger;
