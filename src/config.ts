import {config} from "dotenv";
import {injectable} from "inversify";
import * as process from "node:process";

config();

@injectable()
export class Config {
    public NODE_ENV;
    public PORT;
    public TZ;
    public DATABASE_URL;
    public DATABASE_URL_VENTORY;
    public DB_CONN_STRING;
    public DB_NAME;

    MONGO_URI;
    public DATABASE_HOST;
    public DATABASE_USER;
    public DATABASE_PASSWORD;
    public DATABASE_NAME;
    public DATABASE_PORT;


    public REDIS_PORT;
    public REDIS_HOST;
    public REDIS_USER;
    public REDIS_PASSWORD;

    public JWT_SECRET;
    public ACCESS_TOKEN_TIMEOUT;
    public REFRESH_TOKEN_TIMEOUT;
    public LOGIN_MESSAGE;

    public DISCORD_CLIENT_ID;
    public DISCORD_CLIENT_SECRET;
    public DISCORD_CALLBACK_URL;

    public GOOGLE_CLIENT_ID;
    public GOOGLE_CLIENT_SECRET;
    public GOOGLE_CALLBACK_URL;

    public TWITTER_CLIENT_ID;
    public TWITTER_CLIENT_SECRET;


    constructor() {
        this.NODE_ENV = process.env.NODE_ENV || 'development';
        this.PORT = parseInt(process.env.PORT ?? "3000") || 3000;
        this.TZ = parseInt(process.env.TZ ?? "7") || 7;
        this.DATABASE_URL = process.env.DATABASE_URL || ""
        this.DATABASE_URL_VENTORY = process.env.DATABASE_URL_VENTORY || "";
        this.DB_CONN_STRING = process.env.DB_CONN_STRING || "";
        this.DB_NAME = process.env.DB_NAME || "api_starksailor_dev";

        this.MONGO_URI = process.env.MONGO_URI || "";
        this.DATABASE_HOST = process.env.DATABASE_HOST || ""
        this.DATABASE_USER = process.env.DATABASE_USER || ""
        this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || ""
        this.DATABASE_NAME = process.env.DATABASE_NAME || "sailor"
        this.DATABASE_PORT = parseInt(process.env.DATABASE_PORT ?? "19096") || 19096

        this.REDIS_PORT = parseInt(process.env.REDIS_PORT ?? "12558") || 12558
        this.REDIS_HOST = process.env.REDIS_HOST || "redis-12558.c56.east-us.azure.cloud.redislabs.com"
        this.REDIS_USER = process.env.REDIS_USER || "default"
        this.REDIS_PASSWORD = process.env.REDIS_PASSWORD || "q0xV9rp5p5XcvQgWk0ZpbFk0irXurKQ2"

        this.JWT_SECRET = process.env.JWT_SECRET || "sailor_api"
        this.ACCESS_TOKEN_TIMEOUT = parseInt(process.env.ACCESS_TOKEN_TIMEOUT ?? "86400") || 86400
        this.REFRESH_TOKEN_TIMEOUT = parseInt(process.env.REFRESH_TOKEN_TIMEOUT ?? "86400") || 86400
        this.LOGIN_MESSAGE = process.env.LOGIN_MESSAGE || ""

        this.DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || ""
        this.DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || ""
        this.DISCORD_CALLBACK_URL = process.env.DISCORD_CALLBACK_URL || ""

        this.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ""
        this.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ""
        this.GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || ""

        this.TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID || ""
        this.TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET || ""
    }

}
