import { Bot } from 'grammy'

// 1. Create a bot with a token (get it from https://t.me/BotFather)
const BOT = new Bot(process.env.TELEGRAM_BOT_TOKEN!) 

export async function sendNotification(data:string){
    const users=process.env.USERS!.split(" ")
    for(const user of users){
        BOT.api.sendMessage(user,data)
    }
}