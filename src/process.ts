export async function parsePayload(msg: string) {
        

    let upToUserType: number = msg.indexOf("user-type") - 1;
    let userType:string = msg.slice(upToUserType, );
    let payloadData: string = msg.slice(0, upToUserType);
    
    let payload = extractPayload(payloadData);
    let userTypeInfo = extractUserTypeInfo(userType).catch((err) => {
        console.log(err);
    });
    
    Promise.all([payload, userTypeInfo]).then((values) => {
        console.log('V-------------------------------------------------------------------------------------------------------V');
        console.log(values);
        console.log('A-------------------------------------------------------------------------------------------------------A');
    });


}

//doesn't parse user-type
async function extractPayload(payload: string): Promise<Map<string, string>> {
    
    const payloadMap: Map<string, string> = new Map<string, string>(); 
    let payloadDataSplit: string[] = payload.split(';');
    
    //this gets the message up to user type
    for (let slice of payloadDataSplit) {
        const splitSlice = slice.split('=');
        //console.log(sliceLR);
        const key: string = splitSlice[0];
        const value: string = splitSlice[1];
        payloadMap.set(key, value);
    }
    return payloadMap;
}

async function extractUserTypeInfo(userTypeMessage: string): Promise<string[]> {
    const userType: string = userTypeMessage;
    
    //there is a space between the = and username for some reason

    const userTypeSplit: string[] = userType.split(':');
    if(userTypeSplit.length <=  2) {
        return Promise.reject('user info format not expected');
    }
    const ut: string = userTypeSplit[1];
    //console.log(userTypeData);
    //console.log('usertypesplit: ', userTypeSplit);
    if (ut != undefined) {
        const userInfo: string[] = [];
        const chatterUsername: string = ut.substring(ut.indexOf(':'), ut.indexOf('!'));
        const indexOfPrivMsg: number = ut.indexOf('PRIVMSG');
        const colonIndex: number = ut.indexOf(':', indexOfPrivMsg);
        const streamerUsername: string = ut.slice(indexOfPrivMsg + 9, colonIndex);
        
        const messageColon: number = userType.indexOf(':', indexOfPrivMsg);
        const userMessage: string = userType.slice(messageColon, userType.indexOf('\r\n'));

        userInfo.push(chatterUsername);
        userInfo.push(streamerUsername);
        userInfo.push(userMessage);
        return userInfo;
    } else {
        //console.log('undefined: ' + userTypeMessage);
    }

}
//undefined: ;user-type=;vip=1 :anthonywritescodebot!anthonywritescodebot@anthonywritescodebot.tmi.twitch.tv PRIVMSG #anthonywritescode :motd updated!  thanks for spending points!
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
