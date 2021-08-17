import { Injectable } from '@nestjs/common';
import { ReportRepository } from './report.repository';
import * as Excel from 'exceljs';
import { EmailOptions, MailgunService } from '@nextnm/nestjs-mailgun';
import * as Mailgun from 'mailgun-js';

@Injectable()
export class ReportService {
    constructor(
        private reportRepository: ReportRepository,
        private mailgunService: MailgunService,
    ) { }

    async reportEmail(): Promise<string> {
        let data = await this.reportRepository.GetReport();

        if (data == null) {
            return 'false';
        }

        let fileResult = await this.generateExcel(data);

        await this.sendEm(fileResult);
        // await this.sendEmail(fileResult);

        return 'true';
    }

    private async generateExcel(data) {
        const options = {
            filename: './streamed-workbook.xlsx',
            useStyles: true,
            useSharedStrings: true,
        };

        let workflow = new Excel.Workbook();
        let worksheet = workflow.addWorksheet();

        worksheet.columns = [
            { header: 'idcolor', key: 'id' },
            { header: 'name', key: 'name' },
        ];

        data.forEach((values) => {
            worksheet.addRow(values);
        });

        // await workflow.xlsx.writeFile(`result.xlsx`);
        const fileResult = await workflow.xlsx.writeBuffer();

        // var file = fs.writeFile(fileResult);

        return fileResult;
    }

    private async sendEm(file: any) {
        // var mailgun = Mailgun.client({
        //     apiKey: process.env.MAILGUN_API,
        //     domain: process.env.MAILGUN_DOMAIN,
        // });

        console.log("adwda awdas awdas");

        console.log(process.env.MAILGUN_API);
        console.log(process.env.MAILGUN_DOMAIN);
        

        var mailgun = new Mailgun({
            apiKey: process.env.MAILGUN_API,
            domain: process.env.MAILGUN_DOMAIN,
        })

        
        var attch = new mailgun.Attachment({data: file, filename: 'interesante.xlsx'});

        var data = {
            subject: 'tuani pues',
            from: 'khg@agroclimatica.com',
            to: 'khg@agroclimatica.com',
            html: 'hello world',
            text: 'interesante',
            attachment: attch
        };

        mailgun.messages().send(data, function (error, body) {
            console.log(body);
          });

        // mailgun.messages().send(data, (err, body) => {
        //     if(err) throw err;

        //     console.log(body);
        // }).then(() => {
        //     console.log("tunai");
            
        // }).catch(err => {
        //     console.log(err);
            
        // });
        
    }

    private async sendEmail(file: any) {
        const options: EmailOptions = {
            from: 'khg@agroclimatica.com',
            to: ['khg@agroclimatica.com'],
            subject: 'testing',
            text: 'interesante',
            html: '<h1>interesante</h1>',
            attachment: [
                {
                    filename: 'interesante.xlsx',
                    data: file,
                    knownLength: file.length,
                    contentType: 'application/vnd.ms-excel',
                },
            ],
            'h:X-Mailgun-Variables': '{"key":"value"}',
        };

        await this.mailgunService
            .sendEmail(options)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
