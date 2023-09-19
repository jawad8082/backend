const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();
const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // Use secure connection (SSL/TLS)
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: process.env.TO_EMAIL, // Add a valid recipient email address here
    subject: "New Form Submission",
    html: `
      <h2>New Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error sending email." });
    } else {
      console.log("Email sent successfully!");
      res.status(200).json({ message: "Email sent successfully!" });
    }
  });
});

module.exports = { sendEmail };