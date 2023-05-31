import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './task.entity';
import { createTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './task.status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private readonly taskRepository: TaskRepository,) { }

    getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto)
    }

    async getTaskById(id): Promise<Task> {
        const found = await this.taskRepository.findOne(id)
        if (!found) {
            throw new NotFoundException(`Task with ${id} not found`)
        }
        return found
    }

    createTask(createTaskDto: createTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto)
    }

    async deleteTask(id: string): Promise<void> {
        const result = await this.taskRepository.delete(id)

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`)
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)

        task.status = status
        await this.taskRepository.save(task)
        return task
    }


}




// import { Injectable, NotFoundException } from '@nestjs/common';
// import { Task, TaskStatus } from './task.model';
// import { v4 as uuid } from "uuid"
// import { createTaskDto } from './dto/create-task-dto';
// import { GetTaskFilterDto } from './dto/get-task-filter-dto';

// @Injectable()
// export class TasksService {

//     private tasks: Task[] = [];

//     getAllTasks(): Task[] {
//         return this.tasks;
//     }

//     createTask(createTaskDto: createTaskDto): Task {
//         const { title, description } = createTaskDto
//         const task: Task = {
//             id: uuid(),
//             title,
//             description,
//             status: TaskStatus.OPEN
//         }
//         this.tasks.push(task)
//         return task
//     }

//     getTaskById(id: string): Task {

//         const found = this.tasks.find((task) => task.id === id)

//         if (!found) {
//             throw new NotFoundException(`Task with ${id} not found`)
//         }
//         return found
//     }

//     deleteTask(id: string): void {
//         const found = this.getTaskById(id)
//         this.tasks = this.tasks.filter((task) => task.id !== found.id)
//     }

//     updateTaskStatus(id: string, status: TaskStatus) {
//         const task = this.getTaskById(id)
//         task.status = status
//         return task
//     }

//     getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {

//         const { status, search } = filterDto

//         let tasks = this.getAllTasks()

//         if (status) {
//             tasks = tasks.filter((task) => task.status === status)
//         }

//         if (search) {
//             tasks = tasks.filter((task) => {
//                 if (task.title.includes(search) || task.description.includes(search)) {
//                     return true;
//                 }
//                 return false;
//             })

//         }
//         return tasks
//     }


// }
