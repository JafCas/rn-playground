import { Task } from "@/components/Task";

// Constants
export const TASK_STORAGE_KEY = "TASKS";

// Task statistics helpers
export const getTaskStats = (tasks: Task[]) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    pending,
    completionRate,
  };
};

// Task filtering helpers
export const filterTasks = {
  all: (tasks: Task[]) => tasks,
  completed: (tasks: Task[]) => tasks.filter(task => task.completed),
  pending: (tasks: Task[]) => tasks.filter(task => !task.completed),
};

// Task validation
export const isValidTaskName = (name: string): boolean => {
  return name.trim().length > 0 && name.trim().length <= 100;
};

// Task sorting helpers
export const sortTasks = {
  byName: (tasks: Task[]) => [...tasks].sort((a, b) => a.name.localeCompare(b.name)),
  byStatus: (tasks: Task[]) => [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1; // Pending tasks first
  }),
};

export default {
  TASK_STORAGE_KEY,
  getTaskStats,
  filterTasks,
  isValidTaskName,
  sortTasks,
};
