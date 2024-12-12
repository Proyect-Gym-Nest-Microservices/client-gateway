import { ArrayUnique, IsArray, IsBoolean, IsEnum, IsMongoId, IsNumber, IsOptional, IsString, Matches } from "class-validator";
import { FitnessLevel, Gender, Goal, UserType } from "../enum/user.enum";

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    name?: string

    @IsString()
    @IsOptional()
    avatarUrl?: string

    @IsEnum(UserType)
    @IsOptional()
    userType?: UserType;

    @IsNumber()
    @IsOptional()
    age?: number;

    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender;

    @IsNumber()
    @IsOptional()
    weight?: number; // Peso del usuario

    @IsNumber()
    @IsOptional()
    height?: number; // Altura del usuario

    @IsEnum(FitnessLevel)
    @IsOptional()
    fitnessLevel?: FitnessLevel; // Nivel de estado físico

    @IsEnum(Goal)
    @IsOptional()
    goal?: Goal; // Objetivo del usuario (e.g. perder peso, ganar músculo)

    @IsString()
    @IsOptional()
    injury?: string; // Lesión del usuario (si tiene)


    @IsArray()
    @IsOptional()
    @ArrayUnique()
    @IsMongoId({each:true,message: 'Invalid MongoDB ID format'})
    nutritionIds?: string[];

    @IsArray()
    @IsOptional()
    @ArrayUnique()
    @IsNumber({}, { each: true, message: 'Each workoutId must be a number (PostgreSQL ID)' })
    workoutIds?: number[];

    @IsArray()
    @IsOptional()
    @ArrayUnique()
    @IsNumber({}, { each: true, message: 'Each trainingPlanId must be a number (PostgreSQL ID)' })
    trainingPlanIds?: number[];

    @IsBoolean()
    @IsOptional()
    isActive?: boolean

}

