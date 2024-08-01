const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  // 다운 받은 bcrypt 불러오기
const saltRounds = 10;  // salt 글자 수


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,  
        unique: 1
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
        default: 0
    },
    image: String,
    token:{
        type: Number
    }, 
    tokenExp: {  
        type: Number
    }
})

userSchema.pre('save', function(next) {  // userModel에 user정보를 저장하기 전에 처리됨
    var user = this;
    
    if(user.isModified('password')){  // password가 변환될 때만 암호화
        // 비밀번호를 암호화 시키기
        bcrypt.genSalt(saltRounds, function(err, salt){  // salt 만들기
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {  
                if(err) return next(err)
                user.password = hash  // 암호화 키 만드는 데 성공했으면, 원래 비밀번호랑 hash 바꾸고
                next()  // index.js로 돌아가기
            })
        })
    } else {  // 비밀번호 말고 다른 걸 바꿀 경우
        next()
    }
})  



const User = mongoose.model('User', userSchema)  

module.exports = { User }  

