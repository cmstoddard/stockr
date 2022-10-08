"use strict";
exports.__esModule = true;
exports.startWS = void 0;
var secretkeys_1 = require("./secretkeys");
var process_1 = require("./process");
//const Keys = require("./secretkeys");
var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();
client.on('connectFailed', function (error) {
    console.log('Connect Error: ' + error.toString());
});
client.on('connect', function (connection) {
    console.log('WebSocket Client Connected');
    // Send CAP (optional), PASS, and NICK messages
    //connection.sendUTF('PASS oauth:n5co8mx3nvk02rdv6c28chd3b34za0')
    connection.sendUTF('PASS ' + secretkeys_1.Keys.password);
    connection.sendUTF('NICK ' + secretkeys_1.Keys.twitchToken);
    connection.sendUTF('CAP REQ :twitch.tv/tags twitch.tv/commands');
    connection.sendUTF('JOIN #strager,#eternalenvyy');
    //gets the messages back
    connection.on('message', function (message) {
        //console.log(message.utf8Data);
        var meme = message.utf8Data;
        (0, process_1.parseMessage)(meme);
        if (meme.includes('PING')) {
            connection.sendUTF('PONG :tmi.twitch.tv');
            console.log('PONG :tmi.twitch.tv');
        }
    });
});
function startWS() {
    client.connect('ws://irc-ws.chat.twitch.tv:80');
}
exports.startWS = startWS;
