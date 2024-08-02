package main

import (
	"net/http"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"golang.org/x/exp/rand"
)

type TriviaQuestion struct {
	ID int `json:"id"`
	Question string `json:"question"`
	Answer   string `json:"answer"`
}

var triviaData = []TriviaQuestion{
	{
		Question: "What is the capital of France?",
		Answer:   "Paris",
		ID: 1,
	},
	{
		Question: "What is the largest planet in our solar system?",
		Answer:   "Jupiter",
		ID: 2,
	},
	{
		Question: "How many legs does a cat have?",
		Answer:   "Four",
		ID: 3,
	},
	{
		Question: "What color is the sky?",
		Answer:   "Blue",
		ID: 4,
	},
	{
		Question: "What is the opposite of hot?",
		Answer:   "Cold",
	},
	{
		Question: "What is the first day of the week?",
		Answer:   "Monday",
		ID: 5,
	},
	{
		Question: "What is 2 + 2?",
		Answer:   "4",
		ID: 6,
	},
	{
		Question: "What is the capital of the United States?",
		Answer:   "Washington D.C.",
	},
	{
		Question: "What is the tallest land animal?",
		Answer:   "Giraffe",
		ID: 7,
	},
	{
		Question: "How many sides does a triangle have?",
		Answer:   "Three",
		ID: 8,
	},
}

func setupRouter() *gin.Engine {
	r := gin.Default()

	config := cors.DefaultConfig()
    config.AllowOrigins = []string{"*"}
	r.Use(cors.New(config))

	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	r.GET("/api/v1/quiz", func(c *gin.Context) {
		randQuestion := triviaData[rand.Intn(len(triviaData))] // Get a random question from store
		c.JSON(http.StatusOK, randQuestion)
	})

	r.POST("/api/v1/answer_quiz", func(c *gin.Context) {
		var payload struct {
			ID int `json:"id"`
			Answer string `json:"answer"`
		}

		if err := c.ShouldBindBodyWith(&payload, binding.JSON); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "bad request body"})
			return
		}
		isCorrectAnswer := false

		for _, question := range triviaData {
			if strings.ToLower(question.Answer) == payload.Answer && payload.ID == question.ID {
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
