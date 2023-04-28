import express from "express";
import cors from "cors";
import fs from "fs";

import * as dotenv from "dotenv";
dotenv.config()

const app = express()

app.use(express.json());
app.use(cors()) 

app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${process.env.PORT}`)
})

app.post('/', (req, res) => {
    console.log(req.body),
    res.status(200).json('Сервер работает1234')
})

app.get('/', (req, res) => {
    res
        .status(200)
        .send();
})

app.get('/posts', (req, res) => {

    // Открываем JSON, парсим данные и отправляем конкретный пост
    let rawdata = fs.readFileSync("data/postsData.json"); 
    let parseddata= JSON.parse(rawdata); 

    res
        .status(200)
        .send(parseddata);
})

app.get('/posts/:id', (req, res) => {

    const postId = req.url.slice(7, );

    // Открываем JSON, парсим данные и отправляем конкретный пост
    let rawdata = fs.readFileSync("data/postsData.json"); 
    let parsedata= JSON.parse(rawdata); 

    // Ищем нужный пост
    let requiredPost = parsedata.find( post => {
        return post.id == postId
    })

    // Отправляем пост
    if (requiredPost){
        res
            .status(200)
            .send(requiredPost);
    }
    else{
        res
            .status(404)
            .send();
    }
})

app.use((req, res) => {
    console.log('ERROR');
    res
        .status(404)
        .send();
})