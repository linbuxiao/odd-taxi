import { Cache } from 'https://raw.githubusercontent.com/linbuxiao/low-cache/main/mod.ts'
import { Bot } from "https://deno.land/x/grammy/mod.ts"
import { fetchGist } from './gist.ts'
import { config as env } from "https://deno.land/x/dotenv/mod.ts";

const ENV = env()

const cache = new Cache({ttl: 300})

const bot = new Bot(ENV['BOT_TOKEN']!)

const words = JSON.parse(await fetchGist())

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)]
}

bot.on('message', ctx => {
  let word = getRandomWord()
  if(cache.has(ctx.chat.id)) {
    const prev = cache.get(ctx.chat.id) as string[]
    while(prev.includes(word)) {
      word = getRandomWord()
    }
    cache.set(ctx.chat.id, [...prev, word])
  } else {
    word = getRandomWord()
    cache.set(ctx.chat.id, [word])
  }
  ctx.reply(word)
})

bot.start()