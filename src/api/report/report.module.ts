import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ReportRepository } from './report.repository';

@Module({
  providers: [ReportService, ReportRepository],
  controllers: [ReportController]
})
export class ReportModule {}
