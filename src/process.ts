export async function parsePayload(msg: string) {

    let upToUserType: number = msg.indexOf("user-type") - 1;
    let userType:string = msg.slice(upToUserType, );
    let payloadData: string = msg.slice(0, upToUserType);
    let payloadDataSplit: string[] = payloadData.split(';');

    //this gets the message up to user type
    for (let slice of payloadDataSplit) {
        //console.log(slice);
        let splitSlice = slice.split('=');
        //console.log(sliceLR);
        let left: string = splitSlice.at(0);
        let right: string = splitSlice.at(1);
    }

    extractUserTypeInfo(userType);


    //console.log(streamerUsername, chatterUsername, userMessage);
}


function extractUserTypeInfo(userTypeMessage: string) {

    //let userType: string = msg.slice(uptoUserType,);
    let userType: string = userTypeMessage;
    //there is a space between the = and username for some reason
    let userTypeSplit: string[] = userType.split('= ');
    //console.log(userTypeSplit[1]);
    let ut: string = userTypeSplit[1];
    //console.log(userTypeData);
    if (ut != undefined) {
        let chatterUsername: string = ut.substring(1, ut.indexOf('!'));
        let indexOfPrivMsg: number = ut.indexOf('PRIVMSG');
        let colonIndex: number = ut.indexOf(':', indexOfPrivMsg);
        //this
        let streamerUsername: string = ut.substring(indexOfPrivMsg + 9, colonIndex);
        let userMessage: string = ut.substring(colonIndex + 1, userType.indexOf('\r\n'));
        //console.log(streamerUsername + " " + chatterUsername + " " + userMessage);
        console.log(chatterUsername);
        console.log(streamerUsername);
        console.log(userMessage);

    }
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
