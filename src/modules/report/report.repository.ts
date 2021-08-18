import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";
import { ReportAuditEntity } from "./entities/report-audit.interface";

@Injectable()
export class ReportRepository {
    constructor(private connection: Connection) { }

    async GetReport(): Promise<ReportAuditEntity[]>{
        let resultQuery: ReportAuditEntity[];

        resultQuery = await this.connection.query("select * from vw_getall_colors");

        return resultQuery;
    }
}
