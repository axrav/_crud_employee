const nodemailer = require("nodemailer");
const sendEmail = (options) =>
  new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      service: process.env.EMAIL_SERVICE,
      authentication: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      console.log("Message id", info);
      console.log("Preview URL", nodemailer.getTestMessageUrl(info));
      return resolve({ message: "Otp has Been sent" });
    });
  });

const html = (email_verify_code) => {
  email_verify_code = JSON.parse(JSON.stringify(email_verify_code));
  const html = `<!DOCTYPE html>
    <h1>Email verification</h1>
    <h3>Your OTP is : ${email_verify_code}</h3>
    </html>`;
  return html;
};

module.exports = {
  html,
  sendEmail,
};
