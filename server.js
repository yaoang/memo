var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const StormDB = require('stormdb');
const engine = new StormDB.localFileEngine("./db.stormdb");
const db = new StormDB(engine);
db.default({ memos: [] });
let memos = db.get("memos");

var app = express();

app.use(express.json());

// app.use(cookieParser());


app.use('/', express.static(path.join(__dirname, 'static')));
// module.exports = app;

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    memos.filter(m => ~m.id.indexOf(id)).delete()
    res.status(200).end()
})

app.get('/get/:id', (req, res) => {
    const id = req.params.id
    const result = db.get("memos").value().filter(m => ~m.id.indexOf(id))
    // console.log(result.value(), id)
    res.status(200).send(result).end()
})

app.get('/all', (req, res) => {
    // memos = db.get("memos")
    res.send(db.get("memos").value()).end()
})

app.post('/save', (req, res) => {
    // console.log(req.body)
    const body = req.body
    console.log(body)
    if(!body.content) {
        res.status(403).send({}).end()
        return
    }
    const item = {
        id: `${new Date() * 1}${Math.random()}`,
        content: body.content,
        createTime: new Date() * 1
    }
    // db.set(item)
    memos.push(item)
    db.save()
    res.status(200).send(item).end()
})

const http = require('http');
console.log('http://localhost:3000');
http.createServer(app).listen(3000);
