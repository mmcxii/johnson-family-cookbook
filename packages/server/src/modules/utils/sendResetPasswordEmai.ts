import nodemailer from "nodemailer";

export async function sendResetPasswordEmail(
  recipientAddress: string,
  url: string,
) {
  const account = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  const info = await transporter.sendMail({
    from: "Jackie Bot <jackiebot@johnsonfamilycookbook.com>",
    to: recipientAddress,
    subject: "Reset Password",
    html: `
        <p>
            Please click the link below to reset your password.
        </p>
        <p>
            <a id="reset-link" href="${url}">Reset your password.</a>
        </p>  
    `,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
