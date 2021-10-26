import { bot } from './bot.js'
import http from 'http';
import rawBody from 'raw-body';
import { webhookCallback } from 'grammy';

http.createServer((async (req, res)=> {
  if(req.method === 'GET') {
    res.write('success~')
    res.end()
    return
  }
  rawBody(req, null, (err, body) => {
    req.body = JSON.parse(body)
    webhookCallback(bot, 'http')(req, res)
  })
})).listen(process.env.PORT ?? 3000)

