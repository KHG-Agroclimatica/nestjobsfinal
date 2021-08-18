import { FileEntity } from "./file.interface";

export interface ContentEmailEntity{
    subject?: string;
    from?: string;
    to: Array<string>;
    htmlTemplate?: any;
    attachments?: Array<FileEntity>;
    text?: string;
}