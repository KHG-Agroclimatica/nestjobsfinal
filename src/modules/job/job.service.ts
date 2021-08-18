import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ReportService } from '../report/report.service';

@Injectable()
export class JobService {
    private readonly logger = new Logger(JobService.name);

    constructor(private reportService: ReportService) {}

    @Cron("0 15 13 * * *")
    EmailTask() {
        this.logger.log("Task Active");

        this.reportService.reportAudit();
    }
}
