import { createTransport } from "nodemailer";


 export  const sendMail= async(to,subject,text)=>{

    const transporter = createTransport({
        host: process.env.MAILER_HOST,
        port: 587,
        auth: {
            user:process.env.MAILER_USER ,
            pass: process.env.MAILER_PASS
        }})
      await transporter.sendMail({
        to,subject,text
      })

 }