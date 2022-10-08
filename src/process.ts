export async function parseMessage(message: string) {
    //this isn't good because if someone types a ;, this breaks 
    let split: string[] = message.split(';');
    console.log(split);
}