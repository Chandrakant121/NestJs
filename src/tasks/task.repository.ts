import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { createTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './task.status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { User } from 'src/auth/user.entity';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { Logger } from '@nestjs/common/services';

// @EnityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger('TasksRepository')
    async createTask(createTaskDto: createTaskDto, user: User): Promise<Task> {

        const { title, description } = createTaskDto
        const task = this.create({
            title, description, status: TaskStatus.OPEN, user
        })

        await this.save(task)
        return task
    }

    async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto

        const query = this.createQueryBuilder('task');
        query.where({ user });

        if (status) {
            query.andWhere('task.status=:status', { status });
        }
        if (search) {
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER (:search) OR LOWER (task.description) LIKE LOWER(:serach))',
                { search: `%${search}%` }
            )
        }

        try {
            const tasks = await query.getMany();
            return tasks;
        }
        catch (err) {
            this.logger.error(`Failed to get tasks for user "${user.username}.Filters:${JSON.stringify(filterDto)}"`)
            throw new InternalServerErrorException()
        }
    }
}