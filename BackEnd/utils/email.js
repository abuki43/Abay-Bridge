const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "674708e4d9f9f0",
        pass: "e3f8e66cfade31",
      },
    });

    await transporter.sendMail({
      from: "abaybridgeofficial@gmail.com",
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
