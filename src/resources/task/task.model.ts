import { v4 as uuidv4 } from 'uuid';
import Task, { TaskStatus } from './task.interface';

class TaskModel {
  private data: Task[] = [];

  public async clearData(): Promise<void> {
    return new Promise((resolve) => {
      this.data = [];
      resolve();
    });
  }

  public async findTask(id: string): Promise<Task> {
    return new Promise((resolve, reject) => {
      const task: Task | undefined = this.data.find(
        (task: Task) => task.id === id
      );

      if (!task) {
        return reject({ message: `Task with id: ${id} not found.` });
      }

      resolve(task);
    });
  }

  public async findAllTask(): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      resolve(this.data);
    });
  }

  public async createTask(
    title: string,
    description: string
  ): Promise<Task> {
    return new Promise((resolve, reject) => {
      const task: Task = {
        id: uuidv4(),
        title: title,
        description: description,
        status: TaskStatus.Open,
      };

      this.data = [...this.data, task];
      resolve(task);
    });
  }

  public async updateTask(task: Task): Promise<Task> {
    return new Promise((resolve, reject) => {
      const index = this.data.findIndex(
        (_: Task) => _.id === task.id
      );

      this.data[index] = { ...task };
      resolve(task);
    });
  }

  public async deleteTask(task: Task): Promise<Task> {
    return new Promise((resolve, reject) => {
      const tasks = this.data.filter((_: Task) => _.id !== task.id);
      this.data = [...tasks];
      resolve(task);
    });
  }

  public async updateAllTask(tasks: Task[]): Promise<Task[]> {
    this.data = [...tasks];
    return this.data;
  }
}

export default TaskModel;
