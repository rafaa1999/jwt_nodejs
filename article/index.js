const express = require("express");
const jwt = require("jsonwebtoken")
// jwt is popular in the microservice system
const app = express();

app.use(express.json());

const articles = [];

app.get("/api/1.0/articles", (req, res) => {
  // get all articles
  res.send(articles);
})

app.post("/api/1.0/articles", (req, res) => {
  // check the existence of token
  const authorization = req.headers.authorization
  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYzOTUzNjgwfQ.rbbQu77lZQIqMRIhi-95zozTimUGlC5M2v2iCCeJhFo'
  // take the token from the header
   const token = authorization.substring(7)
   // verify the token
   const result = jwt.verify(token,"this_is_the_secret_payload") // return the payload

   const article = req.body
   article.userId = result.id // take the user id from token(result) and pass it in the creation of article 

   articles.push(article)
   res.send({message : "success"})
})

app.listen(3001, () => {
  console.log("article service is running on port 3001");
});