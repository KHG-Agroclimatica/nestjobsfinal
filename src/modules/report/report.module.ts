import { Module } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { ExcelService } from '../excel/excel.service';
import { ReportRepository } from './report.repository';
import { ReportService } from './report.service';

@Module({
  providers: [
    ExcelService,
    EmailService,
    ReportService, 
    ReportRepository,
  ],
  exports:[
    ReportService
  ]
})
export class ReportModule {}
