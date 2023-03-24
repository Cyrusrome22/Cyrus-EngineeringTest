export enum TaskStatus {
  'Completed' = 'Completed',
  'Open' = 'Open',
  'In Progress' = 'In Progress',
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export default Task;
