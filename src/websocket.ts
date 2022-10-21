import { Keys } from "./secretkeys";
import { parsePayload } from "./process";
import { startClient } from "./testdb";
//const Keys = require("./secretkeys");
const WebSocketClient = require('websocket').client;
const client = new WebSocketClient();

let toParse: boolean = false;
client.on('connectFailed', function (error: any): void {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function (connection: any): void {
    console.log('WebSocket Client Connected');
    startClient();

    connection.sendUTF('PASS ' + Keys.password);
    connection.sendUTF('NICK ' + Keys.twitchToken);

    connection.sendUTF('CAP REQ :twitch.tv/tags twitch.tv/commands');
    //connection.sendUTF('JOIN #strager,#eternalenvyy,#bananaslamjamma,#moonmoon');
    connection.sendUTF('JOIN #anthonywritescode,#eternalenvyy');
    //gets the messages back
    connection.on('message', function (message: any): void {
        let messageUTF8 = message.utf8Data;
        if (messageUTF8.includes('PING')) {
            connection.sendUTF('PONG :tmi.twitch.tv');
            //console.log('PONG :tmi.twitch.tv');
        } else {
            if (toParse == false) {
                let check = checkGarbage(messageUTF8);
                if (check === true) {
                    toParse = true;
                    parsePayload(messageUTF8);
                }
            } else {
                parsePayload(messageUTF8);
            }
        }
        //twitch doesn't send the ping as an event, but in a msg 

    });
});
export function startWS(): void {
    client.connect('ws://irc-ws.chat.twitch.tv:80');
}

const checkGarbage = (userType: string): boolean => {
    if (userType.includes('JOIN') || userType.includes('/NAMES') || userType.includes('USERSTATE')) {
        return false
    } else {
        return true
    }
}

