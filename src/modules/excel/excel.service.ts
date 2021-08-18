import { Injectable } from '@nestjs/common';
import { ColumnsExcel } from './entities/columns-excel.interface';
import * as Excel from 'exceljs';

@Injectable()
export class ExcelService {

    async generateExcel(data: any, columnsExcel: ColumnsExcel[]) {
        let workflow = new Excel.Workbook();
        let worksheet = workflow.addWorksheet();

        worksheet.columns = columnsExcel;

        data.forEach((values) => {
            worksheet.addRow(values);
        });

        const fileResult = await workflow.xlsx.writeBuffer();

        return fileResult;
    }

}
