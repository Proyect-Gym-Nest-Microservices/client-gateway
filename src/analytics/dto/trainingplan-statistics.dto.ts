import { IsInt } from 'class-validator';
import { DatePeriodDto } from './date-period.dto';

export class TrainingPlanStatisticsDto extends DatePeriodDto {

    @IsInt()
    trainingPlanId: number;

}
