import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

// Types
export type Task = {
  name: string;
  completed: boolean;
};

// Utility functions
export const taskStatus = (completed: boolean): string => {
  return completed ? "Completed" : "Incomplete";
};

// Task Item Component Props
interface TaskItemProps {
  task: Task;
  index: number;
  onToggle: (index: number) => void;
  onRemove: (index: number) => void;
}

// Individual Task Item Component
export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  onToggle,
  onRemove,
}) => {
  return (
    <View style={styles.taskContainer}>
      <Text style={styles.taskName}>{task.name}</Text>
      <Text style={styles.taskStatus}>{`Is ${taskStatus(task.completed)}`}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title={task.completed ? "Undo" : "Complete"}
          onPress={() => onToggle(index)}
        />
        <Button title="Remove" onPress={() => onRemove(index)} />
      </View>
    </View>
  );
};

// Task List Component Props
interface TaskListProps {
  tasks: Task[];
  onToggleTask: (index: number) => void;
  onRemoveTask: (index: number) => void;
}

// Task List Component
export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onRemoveTask,
}) => {
  if (tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tasks yet. Add one below!</Text>
      </View>
    );
  }

  return (
    <>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          onToggle={onToggleTask}
          onRemove={onRemoveTask}
        />
      ))}
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  taskContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  taskName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  taskStatus: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
  },
});

export default TaskItem;