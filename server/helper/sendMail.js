import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  auth: {
    user: "datttp113@gmail.com",
    pass: process.env.SECRET_EMAIL_KEY,
  },
});

const sendEmail = async ({ email, contentSend }) => {
  // const contentSend = `Thank you for registing for Special. To access your Account, please do the follwing.
  //   1. Please click <a href="http://localhost:8080/api/v1/auth/activate/${activationToken}">here</a> to activate your account.
  //   2. Login into Ovil
  //   3. Enjoy using your account!
  //   Best regards
  //   If you have any question, please connect with us by tthoangdat18@gmail.com
  //   `;
  const config = {
    from: "datttp113@gmail.com",
    to: email,
    subject: "Active account!",
    text: contentSend,
  };

  transporter.sendMail(config, (err, infor) => {
    if (err) console.log(err);
    else console.log(`Email send: ${infor.response}`);
  });
};

const sendEmailWithHTML = async ({ email, htmlContent }) => {
  // const contentSend = `Thank you for registing for Special. To access your Account, please do the follwing.
  //   1. Please click <a href="http://localhost:8080/api/v1/auth/activate/${activationToken}">here</a> to activate your account.
  //   2. Login into Ovil
  //   3. Enjoy using your account!
  //   Best regards
  //   If you have any question, please connect with us by tthoangdat18@gmail.com
  //   `;
  const config = {
    from: "datttp113@gmail.com",
    to: email,
    subject: "Active account!",
    html: htmlContent,
  };

  transporter.sendMail(config, (err, infor) => {
    if (err) console.log(err);
    else console.log(`Email send: ${infor.response}`);
  });
};

export default sendEmail;
export { sendEmailWithHTML };
