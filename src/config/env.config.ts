export default () => ({
    database_mssql: {
        type: process.env.DB_TYPE,
        port: parseInt(process.env.DB_PORT, 10) || 1433,
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
})