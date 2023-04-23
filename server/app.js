const express = require('express');

const app = express()

const PORT = 3001;

var cors = require('cors')

app.use(cors()) 

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})

app.get('/', (req, res) => {
    res
        .status(200)
        .send();
})

app.get('/posts', (req, res) => {

    // Открываем JSON, парсим данные и отправляем конкретный пост
    const fs = require('fs');
    let rawdata = fs.readFileSync("data/postsData.json"); 
    let parseddata= JSON.parse(rawdata); 

    res
        .status(200)
        .send(parseddata);
})

app.get('/posts/:id', (req, res) => {

    const postId = req.url.slice(7, );

    // Открываем JSON, парсим данные и отправляем конкретный пост
    const fs = require('fs');
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