import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategoriesList, Category, DifficultiesList, Difficulty } from 'src/common';


export class CreateExerciseDto {
    @IsString()
    @IsNotEmpty()
    mediaUrl?: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(DifficultiesList, {
        message: `Possible status value are ${DifficultiesList}`
    })
    @IsNotEmpty()
    level: Difficulty;

    @IsEnum(CategoriesList, {
        message: `Possible status value are ${CategoriesList}`
    })
    @IsNotEmpty()
    category: Category;

    @IsString()
    @IsNotEmpty()
    equipment: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true, message: 'Each workout ID must be an integer.' })
    muscleGroupsIds: number[];

    @IsOptional()
    @IsString()
    recommendation?: string;

    @IsBoolean()
    @IsOptional()
    isDeleted?: boolean
}