const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mongoose  = require("mongoose");
const app = express();
const postModels=require('./models/posts')
const postRouter=require("./routes/posts")
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/testdb').then(()=>{
    console.log('connected to database')
}).catch(()=>{
    console.log('connection failed')
})

const protectedRoute = express.Router();
app.set("key", "secret");

protectedRoute.use((req, res, next) => {
    const token =req.headers["access-token"];
    if(token){
        jwt.verify(token, app.get('key'), (err, decoded)=>{
            if(err){
                return res.send({'msg':'Invalid token'})

            }else{
                req.decoded=decoded;
                next();
            }
        })
    }else{
        res.send({'msg':'Token not provided'})
    }
});

app.use(express.json());
app.use(cors());

app.use("/api/postRouter", postRouter);

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT,GET,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/api/get', function (req, res) {
    res.send(
        {
            content:"Greetings"
        });
});

app.post('/api/post', function (req, res){
    let body=req.body;
    res.send(
        {
            content: ` ${body.firstname} Mediano `
        }
    )
});

app.put('/api/put', function (req, res){
    let body=req.body;
    res.send({
            content: ` ${body.firstname} Mediano `
        })
});

app.delete('/api/delete', function (req, res){
    
    res.send({
            content: `deleted`
        })
});


app.listen(port, function () {
    console.log('Api is runing');
});