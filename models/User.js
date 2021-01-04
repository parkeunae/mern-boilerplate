const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


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

userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plainPassword 1234567
    // 암호화된 비밀번호 $2b$10$qyIpKe.W9hf3aGPTuYbWZeHOkgy3JfaxpelR5/2rzDvIfV/3nNROW
    // 두 개를 비교해야 하므로, plainPassword를 암호화 하여 비교 (db의 암호화된 비밀번호를 복호화 안 되기 때문)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })

}

userSchema.methods.generateToken = function(cb) {
    var user = this;

    // jsonwebtoken을 이용해서 token을 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    user.save(function(err, user) {
        if (err) return cb(err);

        cb(null, user);
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // 토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용하여 유저를 찾은 다음
        // 클라이언트에서 가져온 token과 DB에 보관된 token이 일치하는지 확인

        user.findOne({"_id": jwt.decoded, "token": token}, function(err, user) {
            if (err) return cb(err);

            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema)

// User model을 다른 곳에서도 쓸 수 있도록 export
module.exports = { User }