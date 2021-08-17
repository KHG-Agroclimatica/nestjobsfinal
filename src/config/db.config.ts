import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

interface DBConfig {
    type: string;
    port: number;
    username: string;
    password: string;
    host: string;
    database: string;
}

@Injectable()
export class DBOptions implements TypeOrmOptionsFactory {

    dbConfig: DBConfig;

    constructor(private configService: ConfigService) {
        this.dbConfig = this.configService.get<DBConfig>("database_mssql");
    }

    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
            type: "mssql",
            host: this.dbConfig.host,
            port: this.dbConfig.port,
            database: this.dbConfig.database,
            password: this.dbConfig.password,
            username: this.dbConfig.username,
            synchronize: true,
            extra: {
                validateConnection: false,
                trustServerCertificate: true,
            },
        };
    }

}