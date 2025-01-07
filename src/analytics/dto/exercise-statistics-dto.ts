import { IsInt } from "class-validator";
import { DatePeriodDto } from './date-period.dto';

export class ExerciseStatisticsDto extends DatePeriodDto {
    @IsInt()
    exerciseId: number;
}
