import { Keys } from "./secretkeys";
import { parsePayload } from "./process";
//const Keys = require("./secretkeys");
const WebSocketClient = require('websocket').client;
const client = new WebSocketClient();

client.on('connectFailed', function (error: any): void {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function (connection: any): void {
    console.log('WebSocket Client Connected');

    connection.sendUTF('PASS ' + Keys.password);
                      connection.sendUTF('NICK ' + Keys.twitchToken);

    connection.sendUTF('CAP REQ :twitch.tv/tags twitch.tv/commands');
    //connection.sendUTF('JOIN #strager,#eternalenvyy,#bananaslamjamma,#moonmoon');
    connection.sendUTF('JOIN #eternalenvyy');

    //gets the messages back
    connection.on('message', function (message: any): void {
        let messageUTF8 = message.utf8Data;
        parsePayload(messageUTF8);
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



