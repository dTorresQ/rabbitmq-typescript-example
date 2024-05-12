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
Object.defineProperty(exports, "__esModule", { value: true });
const notification_1 = require("./notification");
const wait = 1000;
//mqConnection.connect();
const send = () => __awaiter(void 0, void 0, void 0, function* () {
    const newNotification = {
        title: " New notification",
        description: Math.random().toString(32).slice(2, 6),
    };
    (0, notification_1.sendNotification)(newNotification);
    // sleepLoop(7, () => console.log("Hola")); 
});
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => setTimeout(resolve, ms));
    });
}
function sleepLoop(number, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        while (number--) {
            yield sleep(wait);
            cb();
        }
    });
}
sleepLoop(6, send);
//send(); 
