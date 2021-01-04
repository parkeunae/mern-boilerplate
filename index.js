const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const { User } = require('./models/User');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json());
// cookieParser 사용
app.use(cookieParser());

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

app.post('/login', (req, res) => {
    console.log( req.body.email );
    // 요청된 이메일이 데이터베이스에 있는지 찾기
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: '제공된 이메일에 해당하는 유저가 없습니다.'
            })
        }

        // 요청된 이메일이 데이터베이스에 있으면 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: '비밀번호가 틀렸습니다.'
                })
            }

            // 비밀번호까지 맞으면 Token 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                // token 저장 (쿠키, 로컬스토리지 등)
                // 여기선 쿠키에 저장
                res.cookie('x_auth', user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id });
            })
        })
    })
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})