import {  Repository } from 'typeorm';
import { Task } from './task.entity';

// @EnityRepository(Task)
export class TaskRepository extends Repository<Task> {
  
}