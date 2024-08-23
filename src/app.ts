import Koa from "koa";
import {DefaultState, DefaultContext} from "koa";
import "colors";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import {
    createKoaServer,
    useContainer,
    Action,
    UnauthorizedError,
} from "routing-controllers";
import {connectWithDatabase} from "@entity/postgres";
import {AuthController} from "@controller/auth.controller";

import {Container} from "typedi";
import {decode, verify} from "jsonwebtoken";
import validationMiddleware from "./middlewares/validation.middleware";

import "reflect-metadata";
import {DataSource, DeepPartial} from "typeorm";
import {Config} from "@src/config";
import {connectWithMongo} from "@entity/mongo";
import {AccountEntity} from "@entity/postgres/account.entity";
import {controllers} from "@controller/index";
import {PostgresBaseService} from "@service/postgres/base.service";
import {MongoBaseService} from "@service/mongo/base.service";
import {postgresServices} from "@service/postgres";
import {mongoServices} from "@service/mongo";


const startApp = async () => {
    const config: Config = new Config();
    const dataSource = await connectWithDatabase();
    await connectWithMongo();

    const app: Koa<DefaultState, DefaultContext> = createKoaServer({
        controllers: controllers,
        async authorizationChecker(action: Action): Promise<boolean> {
            return await authCheck(action, config, dataSource);
        },
        async currentUserChecker(action: Action) {
            return await userCheck(action, config, dataSource)
        },
    });

    app.context.database = dataSource;


    app.use(bodyParser());
    app.use(
        cors({
            origin: "*",
            credentials: true,
            // allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
            // allowHeaders: ["Content-Type", "Authorization"],
        })
    );

    app.use(validationMiddleware);

    //? Set up service
    postgresServices.forEach((service) => {
        Container.set(service, new service(app.context.database));
    });
    mongoServices.forEach((service) => {
        Container.set(service, new service());
    });
    Container.set(PostgresBaseService, new PostgresBaseService(app.context.database));
    // Container.set(MongoBaseService, new MongoBaseService());
    Container.set(Config, new Config());
    useContainer(Container);


    app.listen(config.PORT || 3000, () => {
        try {
            const port = config.PORT || 3000;
            console.log(`Server started on port ${port}, go to http://localhost:${port}`.blue.bold);
        } catch (error) {
            console.error("Error while starting server:", error);
        }
    });
};

const getJWT = ({authorization}: any) => {
    const [_, token]: string = authorization.split(" ");
    return token;
};

const decodeJWT = async (
    token: string
): Promise<DeepPartial<AccountEntity>> => {
    return decode(token) as DeepPartial<AccountEntity>;
};

const authCheck = async (action: Action, config: Config, dataSource: DataSource): Promise<boolean> => {
    const token = getJWT(action.request.headers);
    if (!verify(token, config.JWT_SECRET))
        throw new UnauthorizedError();
    let user: DeepPartial<AccountEntity>;
    try {
        const decoderUser: DeepPartial<AccountEntity> =
            await decodeJWT(token);
        user = (await dataSource
            .getRepository(AccountEntity)
            .findOne({
                where: {id: decoderUser.id},
            })) as DeepPartial<AccountEntity>;
        console.log(user);
    } catch (error) {
        throw new UnauthorizedError();
    }
    if (user) {
        action.context.user = user;
        return true;
    } else {
        throw new UnauthorizedError();
    }
}

const userCheck = async (action: Action, config: Config, dataSource: DataSource) => {
    let user: DeepPartial<AccountEntity>;
    try {
        const token = getJWT(action.request.headers);
        const decoderUser: DeepPartial<AccountEntity> =
            await decodeJWT(token);
        user = (await dataSource
            .getRepository(AccountEntity)
            .findOne({
                where: {id: decoderUser.id},
            })) as DeepPartial<AccountEntity>;
        console.log(user);

    } catch (error) {
        throw new UnauthorizedError();
    }
    if (user) {
        return user;
    } else {
        throw new UnauthorizedError();
    }
}


startApp().then(r => {
    console.log("Running")
});
