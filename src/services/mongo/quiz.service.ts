import {MongoBaseService} from "@service/mongo/base.service";
import {IQuiz, QuizModel} from "@entity/mongo/quiz.entity";

export class QuizService extends MongoBaseService<IQuiz> {
    constructor() {
        super(QuizModel);
    }

}