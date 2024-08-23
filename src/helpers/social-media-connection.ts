import {Context} from "koa";
import {plainToClass} from "class-transformer";
import axios from "axios";
import {UserInfo} from "@dto/informations/user.info";
import {UserTwitterEntity} from "@entity/postgres/user-twitter.entity";
import {Config} from "@src/config";
import {config} from "dotenv";
import {UserTwitterService} from "@service/postgres/user-twitter.service";
import {AccountService} from "@service/postgres/account.service";
import {ApiError} from "@helper/api-error";
import {BadRequestError} from "routing-controllers";

class SocialMediaConnection {
    constructor(private readonly config: Config, private readonly userTwitterService: UserTwitterService, private readonly accountService: AccountService) {
    }

    public async connectToTwitter(code: any, redirectUri: any, challenge: any, type: any, user : UserInfo) {
        const TWITTER_OAUTH_TOKEN_URL = "https://api.twitter.com/2/oauth2/token";
        // const twClientId =
        //     type == "event"
        //         ? process.env.EVENT_TWITTER_CLIENT_ID
        //         : process.env.TWITTER_CLIENT_ID;

        // const twSecret =
        //     type == "event"
        //         ? process.env.EVENT_TWITTER_CLIENT_SECRET
        //         : process.env.TWITTER_CLIENT_SECRET;

        const twitterOauthTokenParams = {
            client_id: this.config.TWITTER_CLIENT_ID,
            // based on code_challenge
            code_verifier: challenge || "challenge",
            redirect_uri: redirectUri || process.env.MARKET_PRODUCT_URL,
            grant_type: "authorization_code",
            code
        };

        const BasicAuthToken = Buffer.from(
            `${this.config.TWITTER_CLIENT_ID}:${this.config.TWITTER_CLIENT_SECRET}`,
            "utf8"
        ).toString("base64");

        try {
            const res = await axios({
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${BasicAuthToken}`
                },
                url: TWITTER_OAUTH_TOKEN_URL,
                data: twitterOauthTokenParams,
                method: "POST"
            });

            const userTwitter = await axios.get<{ data: any }>(
                "https://api.twitter.com/2/users/me",
                {
                    headers: {
                        "Content-type": "application/json",
                        // put the access token in the Authorization Bearer token
                        Authorization: `Bearer ${res.data.access_token}`
                    }
                }
            );
            if (userTwitter && userTwitter.data) {
                // const checkVenomTW = await getRepository(UserTwitterEntity)
                //     .createQueryBuilder("vut")
                //     .select("*")
                //     .where("username = :username", {
                //         username: userTwitter?.data?.data?.username
                //     })
                //     .getRawOne();
                const checkVenomTW = await this.userTwitterService.getByUsername(userTwitter?.data?.data?.username);
                if (!checkVenomTW) {
                    // await getRepository(UserTwitterEntity).save({
                    //     twitterId: userTwitter?.data?.data?.id,
                    //     accessToken: res.data.access_token,
                    //     refreshToken: res.data.refresh_token,
                    //     name: userTwitter?.data?.data?.name,
                    //     username: userTwitter?.data?.data?.username
                    // });
                    await this.userTwitterService.save({
                        twitterId: userTwitter?.data?.data?.id,
                        accessToken: res.data.access_token,
                        refreshToken: res.data.refresh_token,
                        name: userTwitter?.data?.data?.name,
                        username: userTwitter?.data?.data?.username
                    })
                } else {
                    const existUserTwitter = await this.userTwitterService.getByTwitterId(userTwitter?.data?.data?.id);
                    if (existUserTwitter) {
                        Object.assign(existUserTwitter, {
                            twitterId: userTwitter?.data?.data?.id,
                            accessToken: res.data.access_token,
                            refreshToken: res.data.refresh_token,
                            name: userTwitter?.data?.data?.name,
                            username: userTwitter?.data?.data?.username
                        })
                        await this.userTwitterService.save(existUserTwitter);
                    }
                    // await getRepository(UserTwitterEntity)
                    //     .createQueryBuilder()
                    //     .update()
                    //     .set({
                    //         twitterId: userTwitter?.data?.data?.id,
                    //         accessToken: res.data.access_token,
                    //         refreshToken: res.data.refresh_token,
                    //         name: userTwitter?.data?.data?.name,
                    //         username: userTwitter?.data?.data?.username
                    //     })
                    //     .where("twitter_id = :twitterId", {
                    //         twitterId: userTwitter?.data?.data?.id
                    //     })
                    //     .execute();
                }
            }

            // const checkUsed = await getRepository(AccountEntity)
            //     .createQueryBuilder("acc")
            //     .select("*")
            //     .where("acc.id != :userId AND acc.twitter_uid = :twitterUid", {
            //         userId: user.id,
            //         twitterUid: userTwitter?.data?.data?.id
            //     })
            //     .getRawOne();
            const checkedUsed = await this.accountService.checkUsedBySocialMediaId(user.id,userTwitter?.data?.data?.id)
            // if (checkUsed) {
            //     throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0023);
            // }
            // const saveResult = await getRepository(AccountEntity)
            //     .createQueryBuilder()
            //     .update()
            //     .set({
            //         twitterUid: userTwitter?.data?.data?.id,
            //         twitterName: userTwitter?.data?.data?.name,
            //         twitterUsername: userTwitter?.data?.data?.username
            //     }).where("id = :userId", {
            //             //         userId: user.id
            //
            //     })
            //     .returning("*")
            //     .updateEntity(true)
            //     .execute();
            if(checkedUsed) {
                // throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0023);
                throw new ApiError(BadRequestError, "");
            }
            const saveResult = await this.accountService.updateByCriteria({id : user.id}, {twitterUid: userTwitter?.data?.data?.id,
                twitterName: userTwitter?.data?.data?.name,
                twitterUsername: userTwitter?.data?.data?.username
            })
            // ctx.body = new ResponseBuilder(saveResult).build();
        } catch (error) {
            console.error(error);
            // throw new ApiError(
            //     StatusCodes.BAD_REQUEST,
            //     error.response &&
            //     error.response.data.error_description ==
            //     "Value passed for the authorization code was invalid."
            //         ? ResponseCodeEnum.CM0025
            //         : error._errorCode || ResponseCodeEnum.CM0017
            // );
        }
    }
}