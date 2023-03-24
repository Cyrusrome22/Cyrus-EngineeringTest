import Task, { TaskStatus } from './task.interface';
import TaskModel from './task.model';

class TaskService {
  private task = new TaskModel();

  public async create(
    title: string,
    description: string
  ): Promise<Task | Error> {
    const task = await this.task.createTask(title, description);
    return task;
  }

  public async get(id: string): Promise<Task | Error> {
    const task = await this.task.findTask(id);
    return task;
  }

  public async getAll(): Promise<Task[] | Error> {
    const tasks = await this.task.findAllTask();
    return tasks;
  }

  public async update(
    id: string,
    title: string,
    description: string,
    status: TaskStatus
  ): Promise<Task | Error> {
    const tasks = await this.task.findAllTask();
    let task = tasks.find((task: Task) => task.id === id);

    if (!task) {
      throw new Error(`Task with id: ${id} not found.`);
    }

    task = {
      id,
      title,
      description,
      status,
    };

    task = await this.task.updateTask(task);
    return task;
  }

  public async delete(id: string): Promise<Task | Error> {
    const tasks = await this.task.findAllTask();
    let task = tasks.find((task: Task) => task.id === id);

    if (!task) {
      throw new Error(`Task with id: ${id} not found.`);
    }

    task = await this.task.deleteTask(task);
    return task;
  }

  public async reorderTask(
    id: string,
    position: number
  ): Promise<Task | Error> {
    let tasks = await this.task.findAllTask();

    // Filter the current task
    let task = await this.task.findTask(id);
    tasks = tasks.filter((task: Task) => task.id !== id);

    if (position > tasks.length - 1) {
      position = tasks.length - 1;
    } else if (position < 0) {
      position = 0;
    }

    tasks.splice(position, 0, task);
    tasks = await this.task.updateAllTask(tasks);

    return task;
  }
}

export default TaskService;
