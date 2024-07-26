package main

import (
	"math/rand"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
)

type TriviaQuestion struct {
	Question string
	Answer   string
}

var triviaData = []TriviaQuestion{
	{
		Question: "What is the capital of France?",
		Answer:   "Paris",
	},
	{
		Question: "What is the largest planet in our solar system?",
		Answer:   "Jupiter",
	},
	{
		Question: "How many legs does a cat have?",
		Answer:   "Four",
	},
	{
		Question: "What color is the sky?",
		Answer:   "Blue",
	},
	{
		Question: "What is the opposite of hot?",
		Answer:   "Cold",
	},
	{
		Question: "What is the first day of the week?",
		Answer:   "Monday",
	},
	{
		Question: "What is 2 + 2?",
		Answer:   "4",
	},
	{
		Question: "What is the capital of the United States?",
		Answer:   "Washington D.C.",
	},
	{
		Question: "What is the tallest land animal?",
		Answer:   "Giraffe",
	},
	{
		Question: "How many sides does a triangle have?",
		Answer:   "Three",
	},
}

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	r.GET("/api/v1/quiz", func(c *gin.Context) {
		randQuestion := triviaData[rand.Intn(len(triviaData))] // Get a random question from store
		c.JSON(http.StatusOK, randQuestion)
	})

	r.POST("/api/v1/play", func(c *gin.Context) {
		var payload struct {
			Answer string `json:"answer"`
		}

		if err := c.ShouldBindBodyWith(&payload, binding.JSON); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "bad request body"})
			return
		}
		isCorrectAnswer := false

		for _, question := range triviaData {
			if question.Answer == payload.Answer {
				isCorrectAnswer = true
				break
			}
		}
		c.JSON(http.StatusOK, gin.H{"correct": isCorrectAnswer})

	})

	return r
}

func main() {
	r := setupRouter()
	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
