import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { CreateExerciseInWorkoutDto } from "./exercise-in-workout.dto";
import { DifficultiesList, Difficulty } from "src/common";
import { CategoriesList, Category } from "src/common";

export class CreateWorkoutDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    frequency: number;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    duration: number;

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
    trainingType: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateExerciseInWorkoutDto)
    exercisesInWorkout: CreateExerciseInWorkoutDto[];
}
