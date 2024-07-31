const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,  // 빈칸을 없애주는 역할
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
    role: {  // user가 관리자가 될 수도 있고 일반유저가 될 수도 있기 때문
        type: Number,  // 예를 들어, number가 1이면 관리자, 0이면 일반유저
        default: 0
    },
    image: String,
    token:{
        type: Number
    }, 
    tokenExp: {  // token이 유효하는 기간
        type: Number
    }
})

const User = mongoose.model('User', userSchema)  // 모델이 스키마 감싸주기

module.exports = { User }  // 다른 곳에서도 사용할 수 있게 export

