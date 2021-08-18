import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configEnv from './config/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBOptions } from './config/db.config';
import { JobModule } from './modules/job/job.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.development.env',
        isGlobal: true,
        load: [configEnv]
      },
    ),
    TypeOrmModule.forRootAsync({
      useClass: DBOptions,
    }),
    JobModule,
  ]
})
export class AppModule {}
