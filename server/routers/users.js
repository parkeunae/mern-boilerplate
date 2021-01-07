const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { User } = require('../models/User');

router.get('/auth', auth, (req, res) => {
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true라는 말
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
})

router.post('/register', (req, res) => {
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

router.post('/login', (req, res) => {
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

router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        })
    }
    )
})

module.exports = router;