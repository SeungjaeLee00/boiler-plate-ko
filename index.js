const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser');  
const { User } = require('./models/User');  

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://leesengjie:abcd1234@bolier-plate.unathks.mongodb.net/?retryWrites=true&w=majority&appName=bolier-plate', {})
.then(() => console.log('MongoDB connected..'))
.catch(err => console.log(err))


app.get('/', (req, res) => {  
  res.send('안녕하세요. jaejae입니다.')
})


app.post('/register', async (req, res) => {
  const user = new User(req.body)

  const result = await user.save().then(()=>{
    res.status(200).json({
      success: true
    })
  }).catch((err)=>{
    res.json({ success: false, err })
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

