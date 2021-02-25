import nodemailer, { Transporter } from 'nodemailer';

class SendMailServices{
    private client : Transporter
    constructor(){
        nodemailer.createTestAccount().then(account =>{
            let transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth:{
                    user: account.user,
                    pass: account.pass,
                },
            });
            this.client = transporter;
        })
    }

    async execute(to: string, subject: string, body: string){

        const message = await this.client.sendMail({
            to,
            subject,
            html: body,
            from: "NPS <noreplay@nps.com.br>"
        });

        console.log("Message Send %s", message.messageId);
        console.log("Priview URL: %s", nodemailer.getTestMessageUrl(message));

    }
}

export default new SendMailServices();