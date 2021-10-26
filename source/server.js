import { bot } from './bot.js'
import http from 'http';
import rawBody from 'raw-body';
import { webhookCallback } from 'grammy';

http.createServer((async (req, res)=> {
  rawBody(req, null, (err, body) => {
    req.body = JSON.parse(body)
    webhookCallback(bot, 'http')(req, res)
  })
})).listen(process.env.PORT ?? 3000)

