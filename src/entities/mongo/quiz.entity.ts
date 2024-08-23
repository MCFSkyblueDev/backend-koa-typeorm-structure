import {Schema, model} from 'mongoose';
import {IMongoBaseDocument} from "@entity/mongo/base.entity";


export interface IOption extends Document {
    optionId: number;
    content: string;
}

const OptionSchema: Schema<IOption> = new Schema({
    optionId: {type: Number, required: true},
    content: {type: String, required: true}
}, {_id: false});

export interface IQuiz extends IMongoBaseDocument {
    title: string;
    answerId: number;
    options: IOption[];
}

const QuizSchema: Schema<IQuiz> = new Schema(
    {
        title: String,
        answerId: Number,
        options: [OptionSchema],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
);
const QuizModel = model<IQuiz>(
    'quiz',
    QuizSchema,
);
export {QuizModel, QuizSchema};
export default QuizModel;
