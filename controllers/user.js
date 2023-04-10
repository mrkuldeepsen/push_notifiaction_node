const User = require('../models/user')
const webPush = require('web-push')
const md5 = require('md5')
const sendMail = require('../utils/sendmail')
const {handleError, success} = require('../utils/sendmail')

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
        success(res,newUser,201)
        return
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const publicVapidKey = process.env.PUBLIC_KEY
const privateVapidKey = process.env.PRIVATE_KEY


webPush.setVapidDetails('mailto:harshit.igtechso@gmail.com', publicVapidKey, privateVapidKey)

const pushNotifications  = (req,res) => {
      if(pushMessage){
        pushMessage = false
        const subscription = req.body

      
      const payload = JSON.stringify({  
        title: "Good Morning",
        text: "You have successfully subscribed this form",
        image: "image/download.jfif",
        tag: "new...",
        url: 'https://www.amazon.com/dp/B01LTHYWB0/ref=sspa_dk_detail_0?psc=1&pd_rd_i=B01LTHYWB0&pd_rd_w=lPBRD&content-id=amzn1.sym.fc40fdbf-2388-405b-a964-03cdb84a009a&pf_rd_p=fc40fdbf-2388-405b-a964-03cdb84a009a&pf_rd_r=PAJG6VC957KYDYB4X5Y4&pd_rd_wg=frMHE&pd_rd_r=a7b34095-3c0e-4f3a-a0bc-73958e3a9e46&s=beauty&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExU0RURDZMWDZRUk5VJmVuY3J5cHRlZElkPUEwMDk4MDc5MThaTkU2VkdKRkQ1QyZlbmNyeXB0ZWRBZElkPUEwODI2NDQzM0hXNDkzMTA4TU9IWSZ3aWRnZXROYW1lPXNwX2RldGFpbF90aGVtYXRpYyZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=',
      })
      
      webPush.sendNotification(subscription, payload)
        .catch(error => console.error(error))
      }
  }

module.exports = {register, pushNotifications}