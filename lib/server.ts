import express from 'express'
import { webhookCallback } from 'grammy'
import { bot } from './index.js'

const app = express()

app.use(express.json())

app.use(webhookCallback(bot, 'express'))