/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const users = require('./routers/users');
const config = require('./config/key');

const app = express();

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
// cookieParser 사용
app.use(cookieParser());

app.use('/api/users', users);

// mongoose (mongoDB 연결)
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => (
    console.log('MongoDB connected...')
)).catch((err) => console.log(err));

// routers
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = 5000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
