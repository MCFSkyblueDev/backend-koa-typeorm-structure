import {registerDecorator, ValidationOptions, ValidationArguments} from 'class-validator';

export function MinArrayLength(length: number, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'minArrayLength',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [length],
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return Array.isArray(value) && value.length > args.constraints[0];
                },
                defaultMessage(args: ValidationArguments) {
                    return `Array ${args.property} must contain more than ${args.constraints[0]} elements.`;
                },
            },
        });
    };
}