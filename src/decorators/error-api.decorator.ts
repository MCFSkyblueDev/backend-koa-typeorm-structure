import {HttpError} from 'routing-controllers';
import {Response as KoaResponse} from "koa";

export function ErrorApiDecorator() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const response: KoaResponse | undefined = args.find(arg => isKoaResponse(arg));
            try {
                return await originalMethod.apply(this, args);
            } catch (err) {
                if (!response) return err;
                if (err instanceof HttpError) {
                    response.status = (err as any).statusCode;
                    response.body = err;
                } else {
                    response.status = 500;
                    response.body = {message: 'An unknown error occurred'};

                }
                return response;
            }
        };
        return descriptor;
    };

    function isKoaResponse(arg: any): arg is KoaResponse {
        return arg && typeof arg === 'object' && 'status' in arg && 'set' in arg && 'body' in arg;
    }
}