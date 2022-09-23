const express = require("express");
const jwt = require("jsonwebtoken")

const app = express();

app.use(express.json());

const users = [];
for(let i = 1; i <= 5; i++) {
  const user = {
    id: i,
    username: `user${i}`,
    email: `user${i}@mail.com`,
    password: 'P4ssword'
  }
  users.push(user);
}

app.post("/api/1.0/auth", (req, res) => {
  const credential = req.body
  const user = users.find(user => user.email == credential.email) // find the user that already exist
  if(!user){
    res.status(401).send({message : 'unauthorized email!!'}) 
  }
  if(user.password !== credential.password){
    res.status(401).send({message : 'unauthorized password!!'}) 
  }
  // if email exist and password correct the we generate a token
  // create the payload
  const token = jwt.sign({id : user.id}, "this_is_the_secret_payload" )
  return res.send({
    token : token
  })
})


app.listen(3000, () => {
  console.log("auth server is running on port 3000");
});