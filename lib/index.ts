import 'dotenv/config'
import { Bot } from 'grammy'
import { words } from './words.js'
import { cache } from './cache.js'

export const bot = new Bot(process.env.BOT_TOKEN!)

const stickers = (await bot.api.getStickerSet('oddTaxii')).stickers.map(item => item.file_id)

bot.command("start", (ctx) => ctx.reply("请问要去哪里呢"));

function rand (len: number) {
  return Math.floor(Math.random() * len)
}

bot.on("message", async (ctx) => {
  const { id } = ctx.chat
  const pastChat = cache.read(id) 
  let canPassWords = words
  if(pastChat) {
    canPassWords = words.filter(s => !pastChat.set.includes(s))
  } 

  const willSend = canPassWords[rand(canPassWords.length)]
  cache.write(id, ctx.msg.date, willSend)
  await bot.api.sendSticker(id, stickers[rand(stickers.length)])
  await bot.api.sendMessage(id, willSend)
});