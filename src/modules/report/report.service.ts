import { Injectable } from '@nestjs/common';
import { ReportRepository } from './report.repository';
import { EmailService } from '../email/email.service';
import { ExcelService } from '../excel/excel.service';
import ReportAuditStructure from './utils/report-audit-structure';
import { FileEntity } from '../email/entities/file.interface';
import { ContentEmailEntity } from '../email/entities/content-email.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ReportService {

    constructor(
        private reportRepository: ReportRepository,
        private emailService: EmailService,
        private excelService: ExcelService,
    ) { }

    async reportAudit(): Promise<boolean> {
        let data = await this.reportRepository.GetReport();

        if (data == null) {
            return false;
        }

        let file: FileEntity = {
            filename: 'report',
            extension: 'xlsx'
        };
        file.content = await this.excelService.generateExcel(data, ReportAuditStructure);

        var htmlTemplate = fs.readFileSync(path.join(__dirname, '/../../templates/report-audit.html'));

        let mailContent: ContentEmailEntity = {
            to: ["khg@agroclimatica.com"],
            htmlTemplate: htmlTemplate,
            attachments: [file],
        }
        await this.emailService.sendEmail(mailContent);
        return true;
    }
}
