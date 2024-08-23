import {DataSource, Not} from "typeorm";
import {Service} from "typedi";
import {PostgresBaseService} from "@service/postgres/base.service";
import {AccountEntity} from "@entity/postgres/account.entity";

@Service()
export class AccountService extends PostgresBaseService<AccountEntity> {
    constructor(database: DataSource) {
        super(database.getRepository(AccountEntity));
    }


    async checkUsedBySocialMediaId(id: any, socialMediaId: string): Promise<AccountEntity | null> {
        return await this.repository.findOne({
            where: {
                id: Not(id),
                twitterUid: socialMediaId
            }
        });
    }
}
