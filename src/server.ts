import express from 'express'
import { webhookCallback } from 'grammy'
import { bot } from './index.js'

const app = express()

app.use(express.json())

app.use(webhookCallback(bot, 'express'))

app.listen(3010, () => {
  console.log('Success!');
})

bot.api.setWebhook(process.env.WEBHOOK!)