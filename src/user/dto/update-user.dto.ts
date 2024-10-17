import { IsBoolean, IsOptional, IsString } from "class-validator";
import { Role } from "../enum/roles.enum";

export class UpdateUserDto {

    @IsString()
    id: string;

    @IsOptional()
    @IsString()
    name?:string

    @IsString()
    @IsOptional()
    avatarUrl?: string 

    @IsBoolean()
    @IsOptional()
    isActive?: boolean

    @IsOptional()
    roles?: Role[] 

}