import {UserTwitterService} from "@service/postgres/user-twitter.service";
import {UserDiscordEntity} from "@entity/postgres/user-discord.entity";
import {AccountService} from "@service/postgres/account.service";

export const postgresServices = [AccountService, UserTwitterService, UserDiscordEntity];
