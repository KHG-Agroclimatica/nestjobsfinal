import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ReportRepository } from './report.repository';
import { MailgunModule } from '@nextnm/nestjs-mailgun';

@Module({
  imports: [
    MailgunModule.forAsyncRoot({
      useFactory: async () => {

        return {
          'DOMAIN': process.env.MAILGUN_DOMAIN,
          'API_KEY': process.env.MAILGUN_API,
        }
      }
    }),
  ],
  providers: [
    ReportService, 
    ReportRepository,
  ],
  controllers: [ReportController]
})
export class ReportModule {}
