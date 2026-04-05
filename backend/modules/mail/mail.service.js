const nodemailer = require('nodemailer')
require('dotenv').config()

class EmailService {
  transporter
  transporterOptions = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'reginald.morar10@ethereal.email',
      pass: '8cs39au6VZX5cQAyUX'
    }
  }

  constructor() {
    this.transporter = nodemailer.createTransport(this.transporterOptions)
  }

  async send(to, subject, message) {
    try {
      const emailOptions = {
        from: 'noreply@ethereal.email',
        to,
        subject,
        html: message
      }
      await this.transporter.sendMail(emailOptions)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = EmailService