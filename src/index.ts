import 'dotenv/config'
import { Bot, webhookCallback } from 'grammy'
import { words } from './words.js'
import { cache } from './cache.js'
import express from 'express'

export const bot = new Bot(process.env.BOT_TOKEN!)

const stickers = (await bot.api.getStickerSet('oddTaxii')).stickers.map(item => item.file_id)

bot.command("start", (ctx) => ctx.reply("请问要去哪里呢"));

function rand (len: number) {
  return Math.floor(Math.random() * len)
}

bot.on("message", async (ctx) => {
  const { id } = ctx.chat
  const pastChat = cache.take<string[]>(id) ?? []
  const canPassWords = words.filter(s => !pastChat.includes(s))
  const willSend = canPassWords[rand(canPassWords.length)]
  pastChat.push(willSend)
  cache.set(id, pastChat)
  await bot.api.sendSticker(id, stickers[rand(stickers.length)])
  await bot.api.sendMessage(id, willSend)
});

bot.api.setWebhook(process.env.WEBHOOK!)

export const botApp = express()

botApp.use(express.json())

botApp.use(webhookCallback(bot, 'express'))