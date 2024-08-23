import {DataSource} from "typeorm";
import {Service} from "typedi";
import {PostgresBaseService} from "@service/postgres/base.service";
import {UserTwitterEntity} from "@entity/postgres/user-twitter.entity";

@Service()
export class UserTwitterService extends PostgresBaseService<UserTwitterEntity> {
    constructor(database: DataSource) {
        super(database.getRepository(UserTwitterEntity));
    }

    async getByUsername(username: string) {
        return await this.repository.findOne({where: {username}})
    }

    async getByTwitterId(twitterId: string) {
        return await this.repository.findOne({where: {twitterId}})
    }

}
