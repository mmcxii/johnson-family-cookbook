import nodemailer from "nodemailer";

export async function sendConfirmationEmail(
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
    subject: "Please Confirm Your Account",
    html: `
        <p>
            Hello! And welcome to the Johnson Family Cook Book! Please click the confirmation link below to confirm your account. Once your account is confirmed you will have full access to the app.
        </p>
        <p>
            <a id="confirmation-link" href="${url}">Please click here to confirm your account.</a>
        </p>  
    `,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
