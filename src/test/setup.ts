import 'dotenv/config';
import 'module-alias/register';
import TaskController from '@/resources/task/task.controller';
import TaskModel from '@/resources/task/task.model';
import { Express } from 'express';
import App from '../app';

declare global {
  var app: Express;
}

let app = new App([new TaskController()], Number(process.env.PORT));
const taskModel = new TaskModel();

beforeAll(() => {
  app.listen();
});

beforeEach(async () => {
  await taskModel.clearData();
});

afterAll(() => {
  app.server.close();
});

global.app = app.express;
