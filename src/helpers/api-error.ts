import {HttpError} from 'routing-controllers';

export class ApiError<T extends HttpError> extends HttpError {
    public additionalInfo?: any;
    public statusCode: number;

    constructor(
        errorClass: new (...args: any[]) => T,
        message: string,
        additionalInfo?: any,
    ) {
        super(Number(message));
        const errorInstance = new errorClass(message);
        this.additionalInfo = additionalInfo;
        this.statusCode = errorInstance.httpCode;
        this.message = errorInstance.message;
    }
}