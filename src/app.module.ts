import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReportModule } from './api/report/report.module';
import configEnv from './config/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBOptions } from './config/db.config';
import { TaskService } from './jobs/task.service';
import { TaskModule } from './jobs/task.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.development.env',
        isGlobal: true,
        load: [configEnv]
      },
    ),
    ReportModule,
    TypeOrmModule.forRootAsync({
      useClass: DBOptions,
    }),
    TaskModule,
  ]
})
export class AppModule {}
