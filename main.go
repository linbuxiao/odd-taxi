package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"os"
	"time"

	bigcahce "github.com/allegro/bigcache/v3"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	godotenv "github.com/joho/godotenv"
)

var words []string

var bot *tgbotapi.BotAPI

var c *bigcahce.BigCache

func main() {
	initWords()
	initCache()
	token := initToken()

	bot, err := tgbotapi.NewBotAPI(token)

	if err != nil {
		log.Panic(err)
	}

	bot.Debug = true

	log.Printf("Authorized on account %s", bot.Self.UserName)

	u := tgbotapi.NewUpdate(0)

	u.Timeout = 60

	updates := bot.GetUpdatesChan(u)

	for update := range updates {
		if update.Message == nil {
			continue
		}

		log.Printf("[%s] %s", update.Message.From.UserName, update.Message.Text)

		var word string
		id := fmt.Sprint(update.Message.Chat.ID)
		pastWordsJson, err := c.Get(id)
		if err != nil {
			word = randomWord()
			jsonWord, _ := json.Marshal([]string{word})
			c.Set(id, []byte(jsonWord))
		} else {
			set := make(map[string]struct{})
			var pastWords []string
			err := json.Unmarshal(pastWordsJson, &pastWords)

			if err != nil {
				log.Fatal("json fail")
			}

			for _, pastword := range pastWords {
				set[pastword] = struct{}{}
			}

			for {
				random := randomWord()
				_, ok := set[random]
				if !ok {
					word = random
					break
				}
			}
		}
		msg := tgbotapi.NewMessage(update.Message.Chat.ID, word)
		msg.ReplyToMessageID = update.Message.MessageID
		bot.Send(msg)
	}
}

func initWords() {
	filePtr, err := os.Open("data.json")

	if err != nil {
		fmt.Printf("Open file failed [Err: %s]", err.Error())
	}

	defer filePtr.Close()

	decoder := json.NewDecoder(filePtr)
	err = decoder.Decode(&words)

	if err != nil {
		fmt.Println("Decoder failed", err.Error())
	} else {
		fmt.Println("Decoder success")
	}
}

func initCache() {
	c, _ = bigcahce.NewBigCache(bigcahce.DefaultConfig(time.Minute))
}

func initToken() string {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return os.Getenv("BOT_TOKEN")
}

func randomWord() string {
	return words[rand.Intn(len(words))]
}
