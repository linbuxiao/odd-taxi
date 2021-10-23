import 'dotenv/config';
import { Bot, webhookCallback } from 'grammy';
import { db } from './words.js';
import { cache } from './cache.js';
import express from 'express';
function rand(len) {
    return Math.floor(Math.random() * len);
}
export const bot = new Bot(process.env['BOT_TOKEN']);
bot.api.getStickerSet('oddTaxii').then(async (stickersResponse) => {
    const stickers = stickersResponse.stickers.map(item => item.file_id);
    const words = await db.read();
    bot.command("start", (ctx) => ctx.reply("请问要去哪里呢"));
    bot.on("message", async (ctx) => {
        const { id } = ctx.chat;
        const pastChat = cache.take(id) ?? [];
        const canPassWords = words.filter(s => !pastChat.includes(s));
        const willSend = canPassWords[rand(canPassWords.length)];
        pastChat.push(willSend);
        cache.set(id, pastChat);
        await bot.api.sendSticker(id, stickers[rand(stickers.length)]);
        await bot.api.sendMessage(id, willSend);
    });
    await bot.api.setWebhook(process.env['WEBHOOK']);
});
export const botApp = express();
botApp.use(express.json());
botApp.use(webhookCallback(bot, 'express'));
