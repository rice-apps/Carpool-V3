
require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const phoneNum = process.env.TWILIO_PHONE_NUMBER
const client = require('twilio')(accountSid, authToken)

client.messages
    .create({
        body: 'testmessage, hope this works',
        from: phoneNum,
        to: '+14808253456'

    })
    .then(message => console.log(message.sid))