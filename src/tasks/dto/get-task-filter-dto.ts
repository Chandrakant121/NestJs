import { TaskStatus } from "../task.model";
import { IsOptional, IsEnum, IsString } from "class-validator"

export class GetTaskFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    search?: string;
}