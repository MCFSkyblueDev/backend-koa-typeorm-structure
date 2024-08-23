import {Config} from "@src/config";
import {DataSource, DataSourceOptions} from "typeorm";
import {UserDiscordEntity} from "@entity/postgres/user-discord.entity";
import {UserTwitterEntity} from "@entity/postgres/user-twitter.entity";
import {AccountEntity} from "@entity/postgres/account.entity";

const config: Config = new Config();

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    // url: config.DATABASE_URL,
    host: config.DATABASE_HOST,
    username: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    port: config.DATABASE_PORT,
    synchronize: false,
    logging: false,
    // port: Number(config.D),
    ssl: {
        rejectUnauthorized: false,
    },
    entities: [
        AccountEntity,
        UserDiscordEntity,
        UserTwitterEntity,
    ],
    // migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    migrations: ['src/migrations/*.ts'],
};

export const dataSource: DataSource = new DataSource(dataSourceOptions);