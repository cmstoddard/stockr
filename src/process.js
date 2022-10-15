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
exports.__esModule = true;
exports.parsePayload = void 0;
function parsePayload(msg) {
    return __awaiter(this, void 0, void 0, function () {
        var upToUserType, userType, payloadData;
        return __generator(this, function (_a) {
            upToUserType = msg.indexOf("user-type") - 1;
            userType = msg.slice(upToUserType);
            payloadData = msg.slice(0, upToUserType);
            extractPayload(payloadData);
            extractUserTypeInfo(userType);
            return [2 /*return*/];
        });
    });
}
exports.parsePayload = parsePayload;
function extractPayload(payload) {
    return __awaiter(this, void 0, void 0, function () {
        var payloadMap, payloadDataSplit, _i, payloadDataSplit_1, slice, splitSlice, key, value;
        return __generator(this, function (_a) {
            payloadMap = new Map();
            payloadDataSplit = payload.split(';');
            //this gets the message up to user type
            for (_i = 0, payloadDataSplit_1 = payloadDataSplit; _i < payloadDataSplit_1.length; _i++) {
                slice = payloadDataSplit_1[_i];
                splitSlice = slice.split('=');
                key = splitSlice.at(0);
                value = splitSlice.at(1);
                payloadMap.set(key, value);
            }
            console.log(payloadMap);
            return [2 /*return*/];
        });
    });
}
function extractUserTypeInfo(userTypeMessage) {
    return __awaiter(this, void 0, void 0, function () {
        var userType, userTypeSplit, ut, chatterUsername, indexOfPrivMsg, colonIndex, streamerUsername, userMessage;
        return __generator(this, function (_a) {
            userType = userTypeMessage;
            userTypeSplit = userType.split('= ');
            ut = userTypeSplit[1];
            //console.log(userTypeData);
            if (ut != undefined) {
                chatterUsername = ut.substring(1, ut.indexOf('!'));
                indexOfPrivMsg = ut.indexOf('PRIVMSG');
                colonIndex = ut.indexOf(':', indexOfPrivMsg);
                streamerUsername = ut.substring(indexOfPrivMsg + 9, colonIndex);
                userMessage = ut.substring(colonIndex + 1, userType.indexOf('\r\n'));
                //console.log(streamerUsername + " " + chatterUsername + " " + userMessage);
                console.log(chatterUsername);
                console.log(streamerUsername);
                console.log(userMessage);
            }
            return [2 /*return*/];
        });
    });
}
/*
[
  '@badge-info=subscriber/6',
  'badges=subscriber/0',
  'client-nonce=b84e7cfb0f5c987ed0dd699d786a13b8',
  'color=',
  'display-name=stoddardlabs',
  'emotes=',
  'first-msg=0',
  'flags=',
  'id=1d0a0b05-fd64-4d71-a271-1641ae7ce677',
  'mod=0',
  'returning-chatter=0',
  'room-id=21065580',
  'subscriber=1',
  'tmi-sent-ts=1665272605132',
  'turbo=0',
  'user-id=423016548',
  'user-type= :stoddardlabs!stoddardlabs@stoddardlabs.tmi.twitch.tv PRIVMSG #strager :test\r\n'
]
    we split on user-type, because a chatter could type ; and we would be sad
*/
