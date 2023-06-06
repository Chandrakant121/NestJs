import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { createTaskDto } from './dto/create-task-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Logger } from '@nestjs/common';


@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TaskController') // context

    constructor(private readonly taskService: TasksService) { }

    @Get('/:id')
    getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        this.logger.verbose(`User "${user.username}" retrieving all task.`)
        return this.taskService.getTaskById(id, user)
    }

    @Post()
    createTask(@Body() createTaskDto: createTaskDto, @GetUser() user: User): Promise<Task> {
        return this.taskService.createTask(createTaskDto, user)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.taskService.deleteTask(id, user)
        // delete directly delete the entity but remove make a call to server and then remove entity
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('') UpdateTaskStatusDto: UpdateTaskStatusDto, @GetUser() user: User): Promise<Task> {
        const { status } = UpdateTaskStatusDto
        return this.taskService.updateTaskStatus(id, status, user)
    }


    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto, @GetUser() user: User): Promise<Task[]> {
        return this.taskService.getTasks(filterDto, user)
    }
}




// import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
// import { TasksService } from './tasks.service';
// import { Task, TaskStatus } from './task.model';
// import { createTaskDto } from './dto/create-task-dto';
// import { GetTaskFilterDto } from './dto/get-task-filter-dto';
// import { UpdateTaskStatusDto } from './dto/update-task-status-dto';

// @Controller('tasks')
// export class TasksController {
//     constructor(private readonly taskService: TasksService) { }

//     @Get()
//     getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {

//         if (Object.keys(filterDto).length) {
//             return this.taskService.getTasksWithFilters(filterDto)
//         }

//         else {
//             return this.taskService.getAllTasks();
//         }

//     }

//     @Post()
//     createTask(@Body() createTaskDto: createTaskDto): Task {
//         // console.log('title', title)
//         // console.log('description', description)
//         return this.taskService.createTask(createTaskDto)
//     }

//      Path Parameter :
//     @Get('/:id')
//     getTaskById(@Param('id') id: string): Task {
//         return this.taskService.getTaskById(id)
//     }

//     @Delete('/:id')
//     deleteTask(@Param('id') id: string): void {
//         return this.taskService.deleteTask(id)
//     }

//     @Patch('/:id/status')
//     updateTaskStatus(@Param('id') id: string, @Body('') UpdateTaskStatusDto: UpdateTaskStatusDto): Task {
//         const { status } = UpdateTaskStatusDto
//         return this.taskService.updateTaskStatus(id, status)
//     }

// }
