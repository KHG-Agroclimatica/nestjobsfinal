import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";

@Injectable()
export class ReportRepository {
    /**
     *
     */
    constructor(private connection: Connection) {
        
    }

    async GetReport(): Promise<Array<any>>{
        let resultQuery = await this.connection.query("select * from vw_getall_colors");

        console.log(resultQuery);
        
        return resultQuery;
    }
}
