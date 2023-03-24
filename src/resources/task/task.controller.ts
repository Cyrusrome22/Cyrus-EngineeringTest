import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import TaskService from '@/resources/task/task.service';
import TaskValidation from '@/resources/task/task.validation';
import BadRequestException from '@/utils/exceptions/bad-request.exception';

class TaskController implements Controller {
  public path = '/tasks';
  public router = Router();
  private taskService = new TaskService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // 1. The user should be able to list all tasks in the TODO list
    this.router.get(`${this.path}`, this.getAll);
    this.router.get(`${this.path}/:id`, this.get);

    // 2. The user should be able to add a task to the TODO list
    this.router.post(
      `${this.path}`,
      validationMiddleware(TaskValidation.createValidation),
      this.create
    );

    // 3. The user should be able to update the details of a task in the TODO list
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(TaskValidation.updateValidation),
      this.update
    );

    // 4. The user should be able to remove a task from the TODO list
    this.router.delete(`${this.path}/:id`, this.delete);

    // 5. The user should be able to reorder the tasks in the TODO list
    // 6. A task in the TODO list should be able to handle being moved more than 50 times
    // 7. A task in the TODO list should be able to handle being moved to more than one task away from its current position
    this.router.post(
      `${this.path}/reorder`,
      validationMiddleware(TaskValidation.reorderValidation),
      this.reorder
    );
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { title, description } = req.body;
    const task = await this.taskService.create(title, description);
    res.status(201).json(task);
  };

  private get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      if (!id) {
        return next(new BadRequestException('Id is required'));
      }

      const task = await this.taskService.get(id);
      res.status(200).json(task);
    } catch (err: any) {
      next(new BadRequestException(err.message));
    }
  };

  private getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const tasks = await this.taskService.getAll();
    res.status(200).json(tasks);
  };

  private update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;

      if (!id) {
        return next(new BadRequestException('Id is required'));
      }

      const task = await this.taskService.update(
        id,
        title,
        description,
        status
      );
      res.status(200).json(task);
    } catch (err: any) {
      next(new BadRequestException(err.message));
    }
  };

  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      if (!id) {
        return next(new BadRequestException('Id is required'));
      }

      const task = await this.taskService.delete(id);
      res.status(200).json(task);
    } catch (err: any) {
      next(new BadRequestException(err.message));
    }
  };

  private reorder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id, position } = req.body;
      const task = await this.taskService.reorderTask(id, position);
      res
        .status(200)
        .json({ ...task, message: 'Task had been reordered' });
    } catch (err: any) {
      next(new BadRequestException(err.message));
    }
  };
}

export default TaskController;
