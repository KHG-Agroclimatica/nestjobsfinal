import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ReportModule } from '../report/report.module';
import { ReportRepository } from '../report/report.repository';
import { ReportService } from '../report/report.service';
import { JobService } from './job.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ReportModule
  ],
  providers: [
    JobService, 
    // ReportService
  ]
})
export class JobModule {}
