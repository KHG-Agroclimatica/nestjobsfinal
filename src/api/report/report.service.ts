import { Injectable } from '@nestjs/common';
import { ReportRepository } from './report.repository';
import * as Excel from "exceljs";

@Injectable()
export class ReportService {

    /**
     *
     */
    constructor(private reportRepository: ReportRepository) {
        
    }

    async reportEmail(): Promise<string>{
        let data = await this.reportRepository.GetReport();

        if(data==null){
            return "false";
        }

        let workflow = new Excel.Workbook();
        let worksheet = workflow.addWorksheet();

        worksheet.columns = [
            {header: "idcolor", key: "id"},
            {header: "name", key: "name"},
        ];

        data.forEach(values => {
            worksheet.addRow(values);
        });

        await workflow.xlsx.writeFile(`result.xlsx`);

        return "true";
    }
}
