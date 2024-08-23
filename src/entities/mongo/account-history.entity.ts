import {Schema, model} from 'mongoose';
import {IMongoBaseDocument} from "@entity/mongo/base.entity";

export interface IAccountHistory extends IMongoBaseDocument {
    walletAddress: string;
    typeAction: string;
    status: number;
    checkTask: boolean;
    checkQuiz: boolean;
    puzzleId: number;
}

const AccountHistorySchema: Schema<IAccountHistory> = new Schema(
    {
        walletAddress: {
            type: String,
            isUnique: true
        },
        typeAction: String,
        status: Number,
        checkTask: {type: Boolean, default: false},
        checkQuiz: {type: Boolean, default: false},
        puzzleId: Number,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    }
);
const AccountHistoryModel = model<IAccountHistory>(
    'account-history',
    AccountHistorySchema,
);
export {AccountHistoryModel, AccountHistorySchema};
export default AccountHistoryModel;
