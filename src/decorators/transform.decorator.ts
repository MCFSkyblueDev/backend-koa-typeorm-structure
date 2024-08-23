import {Response as KoaResponse} from "koa";
import {isArray} from "class-validator";

export function TransformResultDecorator() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            try {
                const result = await originalMethod.apply(this, args);

                // Transform the result
                if (Array.isArray(result)) {
                    return result.map(item => transformItem(item));
                } else {
                    return transformItem(result);
                }
            } catch (err) {
                throw err;
            }
        }
        return descriptor;


        function transformItem(data: any): any {
            if (isArray(data)) {
                data.map(item => {
                    const {_id, ...rest} = item;
                    return rest;
                });
            }
            if (data && typeof data === 'object') {
                const {_id, ...rest} = data;
                return rest;
            }
            return data;
        }
    };
}