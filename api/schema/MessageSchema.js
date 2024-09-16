
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const phoneNum = process.env.TWILIO_PHONE_NUMBER
const client = require('twilio')(accountSid, authToken)

import { MessageTC } from '../models/MessageModel'



MessageTC.addResolver({
    name: 'sendSMS',
    type: MessageTC,

    args: {phoneTo: 'String!',message: 'String!'},

    resolve: async({ args }) => {
        try{
            client.messages.create({
                body: args.message,
                from: phoneNum,
                to: args.phoneTo,
            });

            
            return { success: true, message: 'SMS sent successfully' };
        }catch(error){
            console.error(error);
            return { success: false, message: 'Failed to send'}
        }
    }

})



const MessageMutation = {


       
    sendSMS: MessageTC.getResolver('sendSMS')
   
};

export { MessageMutation }