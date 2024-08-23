import {
    Column,
    Entity,
} from 'typeorm';
import {CustomBaseEntity} from "@entity/postgres/base.entity";

@Entity('user_twitter')
export class UserTwitterEntity extends CustomBaseEntity {
    @Column()
    sortIndex: number;

    @Column()
    timestamp: number;

    @Column()
    username: string;

    @Column({name: 'twitter_id'})
    twitterId: string;

    @Column({name: 'access_token'})
    accessToken: string;

    @Column({name: 'refresh_token'})
    refreshToken: string;

    @Column({name: 'name'})
    name: string;

}