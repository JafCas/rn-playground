import { Task } from "@/components/Task";
import { TASK_STORAGE_KEY, isValidTaskName } from "@/utils/taskUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useTaskStorage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Storage operations
  const storeTasks = async (tasksToStore: Task[]) => {
    try {
      const jsonValue = JSON.stringify(tasksToStore);
      await AsyncStorage.setItem(TASK_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  const getTasks = async (): Promise<Task[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(TASK_STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error("Error reading tasks:", error);
      return [];
    }
  };

  // Task operations
  const addTask = async (name: string) => {
    if (!isValidTaskName(name)) {
      console.warn("Invalid task name provided");
      return;
    }
    
    const newTask: Task = { name: name.trim(), completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await storeTasks(updatedTasks);
  };

  const toggleTask = async (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await storeTasks(updatedTasks);
  };

  const removeTask = async (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    await storeTasks(updatedTasks);
  };

  const clearAllTasks = async () => {
    setTasks([]);
    await storeTasks([]);
  };

  // Load tasks on hook initialization
  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      const storedTasks = await getTasks();
      if (storedTasks.length > 0) {
        setTasks(storedTasks);
      }
      setIsLoading(false);
    };

    loadTasks();
  }, []);

  return {
    tasks,
    isLoading,
    addTask,
    toggleTask,
    removeTask,
    clearAllTasks,
  };
};

// Remove default export since we're using named export
