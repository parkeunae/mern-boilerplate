const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 공백 제거해주는 역할
        unique: 1 // 똑같은 email x
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0 // role 지정x -> 기본값 0
    }, // User 권한(ex. 관리자/회원 등)
    image: String, // Object 형식 아니어도 바로 쓸 수도 있음
    token: {
        type: String,
    }, // 유효성 관리 위한 token
    tokenExp: {
        type: Number
    } // token 유효 기간
})

// user를 save 하기 전 실행
userSchema.pre('save', function(next) {
    // parameter next는 user.save 함수
    var user = this;

    // 비밀번호가 변경될 때만 실행
    if (user.isModified('password')) {
        // 비밀번호 암호화
        // salt 생성 (saltRounds만큼 길이로 생성)
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);

                // hash된 password로 바꿈
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
    
})

const User = mongoose.model('User', userSchema)

// User model을 다른 곳에서도 쓸 수 있도록 export
module.exports = { User }