import {Schema, model, Document, Model} from 'mongoose';

// Generic interface for a Mongoose document
export interface IMongoBaseDocument extends Document {
    createdAt: Date;
    updatedAt: Date;
}

export interface IMongoBaseModel<T extends IMongoBaseDocument> extends Model<T> {
}

// export function createModel<T extends IMongoBaseDocument>(
//     name: string,
//     schemaDefinition: Record<string, any>,
//     options: Record<string, any> = {}
// ): IMongoBaseModel<T> {
//     const schema = new Schema(schemaDefinition, {
//         timestamps: true,
//         ...options,
//     });
//
//     return model<T, IMongoBaseModel<T>>(name, schema);
// }

export function createModel<T extends IMongoBaseDocument>(
    name: string,
    schema: Schema<T>
): IMongoBaseModel<T> {
    schema.set('timestamps', true);
    return model<T, IMongoBaseModel<T>>(name, schema);
}
