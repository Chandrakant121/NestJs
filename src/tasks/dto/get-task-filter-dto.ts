import { TaskStatus } from "../task.status.enum";
import { IsOptional, IsEnum, IsString } from "class-validator"

export class GetTaskFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    search?: string;
}