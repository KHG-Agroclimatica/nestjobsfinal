import { Injectable, Logger } from '@nestjs/common';
import * as Mailgun from 'mailgun-js';
import { FileEntity } from './entities/file.interface';
import { ContentEmailEntity } from './entities/content-email.interface';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);

    async sendEmail(contentEmail: ContentEmailEntity) {
        var mailgun = new Mailgun({
            apiKey: process.env.MAILGUN_API,
            domain: process.env.MAILGUN_DOMAIN,
        })

        let { subject, from, to, htmlTemplate, text, attachments } = contentEmail;
        let filesAttached = [];
        
        if(attachments != null){
            attachments.forEach((item)=>{
                let fl = new mailgun.Attachment({ data: item.content, filename: `${item.filename}.${item.extension}` });
                filesAttached.push(fl)
            });
        }

        var data = {
            subject: subject || process.env.MAIL_SUBJECT,
            from: from || process.env.MAIL_FROM,
            to: to,
            html: htmlTemplate,
            text: text,
            attachment: filesAttached
        };

        let result = await mailgun.messages().send(data);
        if(result!=null)
            this.logger.log("message sent successfully");
        else
            this.logger.error("message sent bad");

    }
}
