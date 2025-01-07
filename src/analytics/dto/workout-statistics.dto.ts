import { IsInt } from "class-validator";
import { DatePeriodDto } from './date-period.dto';

export class WorkoutStatisticsDto extends DatePeriodDto {

    @IsInt()
    workoutId: number;


}