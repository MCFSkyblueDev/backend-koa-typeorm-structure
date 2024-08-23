import {Body, Controller, Get, Post} from "routing-controllers";
import {Service} from "typedi";
import {Config} from "@src/config";
import {QuizService} from "@service/mongo/quiz.service";
import {CreateQuizDto} from "@dto/request/create-quiz.dto";
import {ErrorApiDecorator} from "@decorator/error-api.decorator";
import {TransformResultDecorator} from "@decorator/transform.decorator";

@Controller("/quiz")
@Service()
export class QuizController {
    constructor(private readonly quizService: QuizService, private readonly config: Config) {
    }

    @Get("/")
    @ErrorApiDecorator()
    @TransformResultDecorator()
    async getQuiz() {
        return await this.quizService.findAll();
    }

    @Post("/")
    @ErrorApiDecorator()
    @TransformResultDecorator()
    async createQuiz(@Body() createQuizDto: CreateQuizDto) {
        return await this.quizService.create(createQuizDto);
    }
}