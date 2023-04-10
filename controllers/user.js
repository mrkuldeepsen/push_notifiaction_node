const User = require('../models/user')
const webPush = require('web-push')
const md5 = require('md5')
const sendMail = require('../utils/sendmail')
const {handleError, success} = require('../utils/responce')

let pushMessage = false

const register = async (req,res) => {
    try{
        const {name,email,password} = req.body
        if(!name ||!email || !password){
            handleError(res,"Please enter all fields")
            return
        }
        const user = await User.findOne({email})
        if(user){
            handleError(res,"User already exists")
            return
        }
        const newUser = await User.create({
            name,
            email,
            password: md5(password)
        })
        sendMail(email,"Notifications Push Services")
        pushMessage = true
        res.status(201).json('newUser')
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const publicVapidKey = process.env.PUBLIC_KEY
const privateVapidKey = process.env.PRIVATE_KEY


webPush.setVapidDetails('mailto:harshit.igtechso@gmail.com', publicVapidKey, privateVapidKey)

const pushNotifications  =  (req,res) => {
  setTimeout(() => {
    if(pushMessage){
      pushMessage = false
      const subscription = req.body

    const payload = JSON.stringify({  
      title: "Good Morning",
      text: "You have successfully subscribed this form",
      image: "image/download.jfif",
      tag: "new...",
      url: 'https://www.amazon.com',
    })
    
    webPush.sendNotification(subscription, payload)
      .catch(error => console.error(error))
    }
  },2000)
}

module.exports = {register, pushNotifications}