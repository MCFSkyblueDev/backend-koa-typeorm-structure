import { Schema, model, ObjectId} from 'mongoose';
import {IMongoBaseDocument} from "@entity/mongo/base.entity";

export interface ITask {
    key: string;
    title: string;
    socialType: string;
}

export interface IPuzzle extends IMongoBaseDocument {
    puzzleId: number;
    task: ITask;
    quiz:  ObjectId;
}

const PuzzleSchema: Schema<IPuzzle> = new Schema(
    {
        puzzleId: {
            type: Number,
        },
        task: {
            key: String,
            title: String,
            socialType: String,
        },
        quiz: {
            type: Schema.Types.ObjectId,
            ref: 'quiz',
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
);
const PuzzleModel = model<IPuzzle>(
    'puzzle',
    PuzzleSchema,
);
export {PuzzleModel, PuzzleSchema};
export default PuzzleModel;
