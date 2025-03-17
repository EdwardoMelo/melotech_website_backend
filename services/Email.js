const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailService {
    constructor() {
        // Configuração do transporte do Nodemailer para Gmail
        this.transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            auth: {
                user: process.env.EMAIL_SENDER, // E-mail do remetente
                pass: process.env.EMAIL_PASS, // Senha ou senha de aplicativo
            },
        });
    }

    async sendContactUsEmail({ name, email, phone, subject, message }) {
        console.log({
            user: process.env.EMAIL_SENDER, // E-mail do remetente
            pass: process.env.EMAIL_PASS, // Senha ou senha de aplicativo
        })
        try {
            // Configuração do e-mail
            const mailOptions = {
                from: process.env.EMAIL_SENDER, // Remetente
                to: process.env.EMAIL_RECEIVER, // Destinatário (mesmo e-mail para contato)
                subject: `Nova Mensagem de Contato: ${subject}`, // Assunto do e-mail
                html: `
          <h2>Nova Mensagem de Contato</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${phone || "Não informado"}</p>
          <p><strong>Assunto:</strong> ${subject}</p>
          <p><strong>Mensagem:</strong> ${message}</p>
        `, // Corpo do e-mail em HTML
            };

            // Enviar o e-mail
            const info = await this.transporter.sendMail(mailOptions);
            console.log("E-mail enviado: ", info.messageId);
            return { success: true, message: "E-mail enviado com sucesso!" };
        } catch (error) {
            console.error("Erro ao enviar e-mail: ", error);
            throw new Error("Erro ao enviar e-mail. Tente novamente.");
        }
    }
}

module.exports = new EmailService();