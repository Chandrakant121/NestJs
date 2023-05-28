import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { createTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {

        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto)
        }

        else {
            return this.taskService.getAllTasks();
        }

    }

    @Post()
    createTask(@Body() createTaskDto: createTaskDto): Task {
        // console.log('title', title)
        // console.log('description', description)
        return this.taskService.createTask(createTaskDto)
    }

    // Path Parameter :
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        return this.taskService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
        return this.taskService.updateTaskStatus(id, status)
    }

}
