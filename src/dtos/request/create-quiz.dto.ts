import {IsDefined, IsString, MinLength, ValidateNested} from "class-validator";
import {MinArrayLength} from "@decorator/validate.decorator";
import {IOption} from "@entity/mongo/quiz.entity";

export class CreateQuizDto {
    @IsDefined({always: true})
    @IsString()
    @MinLength(10)
    title: string;

    @IsDefined({always: true})
    answerId: number;

    @IsDefined({ always: true })
    @ValidateNested({ each: true })
    options: IOption[];
}


