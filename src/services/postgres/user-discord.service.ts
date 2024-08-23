import {DataSource} from "typeorm";
import {Service} from "typedi";
import {PostgresBaseService} from "@service/postgres/base.service";
import {UserDiscordEntity} from "@entity/postgres/user-discord.entity";

@Service()
export class UserDiscord extends PostgresBaseService<UserDiscordEntity> {
    constructor(database: DataSource) {
        super(database.getRepository(UserDiscordEntity));
    }


}
