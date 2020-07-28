const router = require('express').Router()
const nodemailer = require('nodemailer')

const config = require('../utils/config')

const transporter = nodemailer.createTransport({
  port: 465,               // true for 465, false for other ports
  host: 'smtp.gmail.com',
  auth: {
    user: config.EMAIL,
    pass: config.PASSWORD,
  },
  secure: true,
})

router.post('/', (req, res) => {
  const { to, subject, text } = req.body
  const mailData = {
    from: config.EMAIL,
    to: to,
    subject: subject,
    text: text
  }

  transporter.sendMail(mailData, (error, info) => {
    if(error) {
      return console.log(error)
    }
    res.status(200).send({ message: 'Mail send', message_id: info.messageId })
  })
})

module.exports = router