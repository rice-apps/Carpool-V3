import mailer from 'nodemailer';


const getEmailData = (to, name, template) => {
    let data = null;

    switch (template) {
        case "hello":
            data = {
                from: "Alexis Nicolas <atn4@rice.edu>",
                to,
                subject: `Hello ${name}`,
                text: "Hello!"
            }
            break;

        case "thanks":
            data = {
                from: "John Ahn <atn4@rice.edu>",
                to,
                subject: `Thanks ${name}`,
                text: "Thanks!"
            }
            break;
        default:
            data;
    }
    return data;
}


const sendEmail = (to, name, type) => {

    const smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "",
            pass: ""
        }
    })

    const mail = getEmailData(to, name, type)

    smtpTransport.sendMail(mail, function(error, response) {
        if(error) {
            console.log(error)
        } else {
            console.log( " email sent successfully")
        }
        smtpTransport.close();
    })


}
export default sendEmail;
