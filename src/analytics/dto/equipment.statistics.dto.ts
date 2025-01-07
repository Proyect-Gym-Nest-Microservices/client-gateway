import { IsInt } from 'class-validator';
import { DatePeriodDto } from './date-period.dto';

export class EquipmentStatisticsDto extends DatePeriodDto{

    @IsInt()
    equipmentId: number;
  
}

