const mongoose = require('mongoose');


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

const User = mongoose.model('User', userSchema)

// User model을 다른 곳에서도 쓸 수 있도록 export
module.exports = { User }