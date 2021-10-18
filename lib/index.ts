import 'dotenv/config'
import { Bot } from 'grammy'
import { words } from './words.js'

const bot = new Bot(process.env.BOT_TOKEN!)

const stickers = await bot.api.getStickerSet('oddTaxii')

const stickersId = stickers.stickers.map(item => item.file_id)

bot.command("start", (ctx) => ctx.reply("请问要去哪里呢"));

function rand (len: number) {
  return Math.floor(Math.random() * len)
}

bot.on("message", async (ctx) => {
  await bot.api.sendSticker(ctx.chat.id, stickersId[rand(stickersId.length)])
  await bot.api.sendMessage(ctx.chat.id, words[rand(words.length)])
});

bot.start()