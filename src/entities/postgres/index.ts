import "colors";
import {DataSource, DataSourceOptions} from "typeorm";
import {Config} from "@src/config";
import {dataSourceOptions} from "@src/data-source";


const config: Config = new Config();

// const dataSourceOptions: DataSourceOptions = {
//     type: "postgres",
//     // url: config.DATABASE_URL,
//     host: config.DATABASE_HOST,
//     username: config.DATABASE_USER,
//     password: config.DATABASE_PASSWORD,
//     database: config.DATABASE_NAME,
//     port: config.DATABASE_PORT,
//     synchronize: false,
//     logging: false,
//     // port: Number(config.D),
//     ssl: {
//         rejectUnauthorized: false,
//     },
//     entities: [
//         UserEntity,
//         UserDiscordEntity,
//         UserTwitterEntity
//     ],
//     // migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
//     migrations: ['src/migrations/*.ts'],
// };

export const connectWithDatabase = async (): Promise<DataSource> => {
    try {
        const dataSource: DataSource = new DataSource(dataSourceOptions);
        console.log("1");
        (await dataSource.initialize())
            .synchronize(false)
            .then(async () => {
                console.log("Postgres connected successfully\n".yellow.bold);
            })
            .catch(() => {
                console.log("Failed to sync data source".red.bold);
            });
        return dataSource;
    } catch (error: any) {
        console.error("Error connecting to the database:", error.message);
        throw error;
    }
};
