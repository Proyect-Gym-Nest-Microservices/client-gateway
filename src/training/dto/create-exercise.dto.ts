import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DifficultiesList, Difficulty } from '../enums/difficulties.enu';
import { CategoriesList, Category } from '../enums/categories.enum';


export class CreateExerciseDto {
    @IsString()
    @IsNotEmpty()
    mediaUrl?: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(DifficultiesList, {
        message: `Possible level value are ${DifficultiesList}`
    })
    @IsNotEmpty()
    level: Difficulty;

    @IsEnum(CategoriesList, {
        message: `Possible category value are ${CategoriesList}`
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
    muscleGroupsIds: number[];

    @IsOptional()
    @IsString()
    recommendation?: string;

    @IsBoolean()
    @IsOptional()
    isDeleted?: boolean
}