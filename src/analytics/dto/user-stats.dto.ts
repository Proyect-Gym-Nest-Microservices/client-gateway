import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { Period } from '../enums/analytics.enum';
import { Type } from 'class-transformer';


export class UserStatsDto {
    @IsEnum(Period)
    @IsNotEmpty({ message: 'The period field cannot be empty.' })
    period: Period;

    @IsDate({ message: 'The date must be a valid Date object.' })
    @Type(() => Date) // Ensures the date is transformed into a Date object
    date: Date;
}