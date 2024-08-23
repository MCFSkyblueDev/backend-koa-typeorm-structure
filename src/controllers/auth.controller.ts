import {Body, Controller, Get, Params, Post, Res, UnauthorizedError} from "routing-controllers";
import {Service} from "typedi";
import {LoginRule} from "@dto/request/login.rule";
import {sign} from "jsonwebtoken";
import {SignatureVerification} from "@helper/signature-verification";
import {Config} from "@src/config";
import {AccountEntity} from "@entity/postgres/account.entity";
import {AccountService} from "@service/postgres/account.service";
import {ApiError} from "@helper/api-error";
import {Response} from "koa";
import {ErrorApiDecorator} from "@decorator/error-api.decorator";


@Controller("/auth")
@Service()
export class AuthController {
    constructor(private readonly userService: AccountService, private readonly config: Config) {
    }

    @Post("/login")
    async login(@Body() loginRequest: LoginRule): Promise<any> {
        const {
            walletAddress,
            signature,
            signData,
        } = loginRequest;
        // console.log(walletAddress);
        let isVerified: boolean = false;
        try {
            //? Verify the signature
            isVerified = await SignatureVerification.verifySignatureStarknet({
                walletAddress,
                signature,
                signData,
            } as any);
        } catch (error) {
            throw new UnauthorizedError("User not found");
        }
        if (!isVerified) {
            throw new UnauthorizedError("Can not verify signature");
        }

        const user: AccountEntity | null =
            await this.userService.getOneByCriteria({rootAddress: walletAddress});
        // console.log(user);
        if (user) {
            const jwt = sign(
                JSON.parse(
                    JSON.stringify({
                        walletAddress: user.rootAddress,
                    })
                ),
                this.config.JWT_SECRET
            );
            console.log(jwt);
            return {token: jwt};
        } else {
            throw new UnauthorizedError("User not found");
        }
    }

    @Get("")
    @ErrorApiDecorator()
    async getConfig(@Res() response: Response) {
        if (1 == 4 - 2) return {a: 1};

        throw new ApiError(
            UnauthorizedError,
            'Unauthorized access',
            { details: 'You need to provide valid credentials to access this resource.' },
        );
    }


}
