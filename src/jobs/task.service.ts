import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name);

    constructor(private httpService: HttpService) {}

    @Cron("45 * * * * *")
    EmailTask() {
        this.logger.debug("active task");

        let result = this.httpService.get("http://localhost:3000/report");

        result.subscribe((data)=>{
            console.log(data);
            // this.logger.debug(data);
        })
    }

}
