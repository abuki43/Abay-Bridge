const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.mailTrapUserName,
        pass: process.env.mailTrapPassword,
      },
    });

    await transporter.sendMail({
      from: process.env.E_USERNAME,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;
