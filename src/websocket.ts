import { Keys } from "./secretkeys";
import { parseMessage } from "./process";
//const Keys = require("./secretkeys");
const WebSocketClient = require('websocket').client;
const client = new WebSocketClient();

client.on('connectFailed', function (error: any): void {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function (connection: any): void {
    console.log('WebSocket Client Connected');

    // Send CAP (optional), PASS, and NICK messages
    //connection.sendUTF('PASS oauth:n5co8mx3nvk02rdv6c28chd3b34za0')
    connection.sendUTF('PASS ' + Keys.password);
    connection.sendUTF('NICK ' + Keys.twitchToken);

    connection.sendUTF('CAP REQ :twitch.tv/tags twitch.tv/commands');
    connection.sendUTF('JOIN #strager,#eternalenvyy,#bananaslamjamma,#moonmoon');

    //gets the messages back
    connection.on('message', function (message: any): void {
        let messageUTF8 = message.utf8Data;
        parseMessage(messageUTF8);
        //twitch doesn't send the ping as an event, but in a msg 
        if (messageUTF8.includes('PING')) {
            connection.sendUTF('PONG :tmi.twitch.tv');
            console.log('PONG :tmi.twitch.tv');
        }
    });
});

export function startWS(): void {
    client.connect('ws://irc-ws.chat.twitch.tv:80');
}



