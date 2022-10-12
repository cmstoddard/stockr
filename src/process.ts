export async function parseMessage(msg: string) {

    //console.log(msg.split(';')); 
    let sliceAt: number = msg.indexOf("user-type")-1;
    let sliceMessage: string = msg.slice(0, sliceAt);
    let userMessage: string = msg.slice(sliceAt, );
    let slicedMsg: string[] = sliceMessage.split(';');
    //console.log(slicedMsg);
    
    for (let slice of slicedMsg) {
        //console.log(slice);
        let sliceLR = slice.split('=');
        console.log(sliceLR);
        let left: string = sliceLR.at(0);
        let right: string= sliceLR.at(1);
        console.log(left);
        console.log(right);
    }
    let posOfPRIVMSG: number = userMessage.indexOf('PRIVMSG');
    console.log(userMessage.indexOf(':',));
    let colonIndex: number = userMessage.indexOf(':',posOfPRIVMSG);
    console.log(userMessage.slice(colonIndex, ));

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