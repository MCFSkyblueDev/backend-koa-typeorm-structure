import {IMongoBaseDocument, IMongoBaseModel} from "@entity/mongo/base.entity";
import {InternalServerError} from "routing-controllers";
import {ApiError} from "@helper/api-error";

export class MongoBaseService<T extends IMongoBaseDocument> {
    private model: IMongoBaseModel<T>;

    constructor(model: IMongoBaseModel<T>) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        try {
            const result = await this.model.create(data);
            return result.toObject();
        } catch (error) {
            throw new ApiError(InternalServerError, (error as any).message)
        }
    }

    async findById(id: string): Promise<T | null> {
        try {
            return this.model.findById(id).exec();
        } catch (error) {
            throw new ApiError(InternalServerError, (error as any).message)
        }
    }

    async findAll(filter: Partial<T> = {}): Promise<T[]> {
        try {
            const result: any[] = await this.model.find(filter as any);
            return result.map(doc => doc.toObject());
            // return result.map(doc => {
            //     const docResult = doc.toObject();
            //     if (docResult?._id) delete docResult._id;
            //     if (docResult?.__v) delete docResult.__v;
            //     return docResult;
            // });
        } catch (error) {
            throw new ApiError(InternalServerError, (error as any).message)
        }
    }

    async updateById(id: string, data: Partial<T>): Promise<T | null> {
        try {
            return this.model.findByIdAndUpdate(id, data, {new: true}).exec();
        } catch (error) {
            throw new ApiError(InternalServerError, (error as any).message)
        }
    }

    async deleteById(id: string): Promise<T | null> {
        try {
            return this.model.findByIdAndDelete(id).exec();
        } catch (error) {
            throw new ApiError(InternalServerError, (error as any).message)
        }

    }
}