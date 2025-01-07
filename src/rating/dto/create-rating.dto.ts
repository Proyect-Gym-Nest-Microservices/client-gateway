import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { TargetType } from "../enums/target-type.enum";

export class createRatingDto {

    @IsNumber()
    @Min(0, { message: 'Score must be at least 0' })
    @Max(5, { message: 'Score cannot be greater than 5' })
    score: number;

    @IsString()
    @IsOptional()
    @IsMongoId()
    userId?: string;

    
    @IsNumber()
    targetId: number;

    @IsEnum(TargetType)
    targetType: TargetType;

}
