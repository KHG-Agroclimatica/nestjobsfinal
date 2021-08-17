import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {

    constructor(private reportService: ReportService) {}

    @Get()
    async ReportEmail() {
        let result = await this.reportService.reportEmail();
        return result;
    }
}
