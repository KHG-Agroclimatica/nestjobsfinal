import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';

@Module({
    imports: [
        HttpModule,
        ScheduleModule.forRoot(),
    ],
    providers: [TaskService]
})
export class TaskModule {}
