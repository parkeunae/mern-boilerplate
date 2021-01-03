const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require('./models/User');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json());

// mongoose (mongoDB 연결)
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => (
    console.log('MongoDB connected...')
)).catch(err => console.log(err))


// router
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/register', (req, res) => {
    /**
     * 회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
     * client가 가져온 정보들을 req.body로 받을 수 있게 하는 것이 body-parser의 역할
     */
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})