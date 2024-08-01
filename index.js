const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser');  

const config = require('./config/key');
const { User } = require('./models/User');  

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {})
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

