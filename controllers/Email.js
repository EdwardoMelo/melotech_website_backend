const EmailService = require("../services/Email");

class EmailController {
    async sendContactUsEmail(req, res) {
        console.log('sendContactUsEmail');
        try {
            const { name, email, phone, subject, message } = req.body;
            // Validação básica
            if (!name || !email || !subject || !message) {
                return res.status(400).json({ error: "Campos obrigatórios ausentes." });
            }
            const result = await EmailService.sendContactUsEmail({
                name,
                email,
                phone,
                subject,
                message,
            });
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new EmailController();