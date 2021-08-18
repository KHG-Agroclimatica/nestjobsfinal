import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';

@Module({
  providers: [ExcelService]
})
export class ExcelModule {}
