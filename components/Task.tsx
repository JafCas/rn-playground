import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Types
export type Task = {
  name: string;
  completed: boolean;
};

// Utility functions
export const taskStatus = (completed: boolean): string => {
  return completed ? "Completed" : "Incomplete";
};

// Custom Skeuomorphic Button Component
interface SkeuButtonProps {
  title: string;
  onPress: () => void;
  type: 'complete' | 'undo' | 'remove';
}

const SkeuButton: React.FC<SkeuButtonProps> = ({ title, onPress, type }) => {
  const [isPressed, setIsPressed] = useState(false);

  const getButtonStyle = () => {
    const buttonTypeStyles = {
      complete: styles.completeButton,
      undo: styles.undoButton,
      remove: styles.removeButton,
    };

    return [
      styles.button,
      buttonTypeStyles[type],
      isPressed && styles.buttonPressed
    ].filter(Boolean);
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={1}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
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
      <View style={styles.statusContainer}>
        <View style={[
          styles.statusIndicator,
          task.completed ? styles.completedIndicator : styles.incompleteIndicator
        ]} />
        <Text style={[
          styles.taskStatus,
          task.completed ? styles.completedStatus : styles.incompleteStatus
        ]}>
          {taskStatus(task.completed)}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <SkeuButton
          title={task.completed ? "Undo" : "Complete"}
          onPress={() => onToggle(index)}
          type={task.completed ? "undo" : "complete"}
        />
        
        <SkeuButton
          title="Remove"
          onPress={() => onRemove(index)}
          type="remove"
        />
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
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    // Enhanced skeuomorphic shadow and depth
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
    // Multi-layered border for depth
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderTopColor: "#f8f8f8",
    borderLeftColor: "#f5f5f5",
    borderRightColor: "#e0e0e0",
    borderBottomColor: "#ddd",
    // Subtle inner shadow simulation
    position: "relative",
  },
  taskName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#2c3e50",
    // Subtle text shadow for depth
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  taskStatus: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
    // Subtle embossed text effect
    textShadowColor: "rgba(255, 255, 255, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f8f9fa",
    borderRadius: 20,
    alignSelf: "flex-start",
    // Inset shadow effect
    borderWidth: 1,
    borderTopColor: "#e9ecef",
    borderBottomColor: "#ffffff",
    borderLeftColor: "#e9ecef",
    borderRightColor: "#ffffff",
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    // 3D effect for indicator
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  completedIndicator: {
    backgroundColor: "#27ae60",
    borderWidth: 1,
    borderTopColor: "#2ecc71",
    borderLeftColor: "#2ecc71",
    borderRightColor: "#1e8449",
    borderBottomColor: "#1e8449",
  },
  incompleteIndicator: {
    backgroundColor: "#e74c3c",
    borderWidth: 1,
    borderTopColor: "#ec7063",
    borderLeftColor: "#ec7063",
    borderRightColor: "#cb4335",
    borderBottomColor: "#cb4335",
  },
  completedStatus: {
    color: "#27ae60",
  },
  incompleteStatus: {
    color: "#e74c3c",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  // Custom button styles for skeuomorphic effect
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    // 3D button effect
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    minHeight: 44, // Accessibility touch target
  },
  completeButton: {
    backgroundColor: "#27ae60",
    borderTopColor: "#2ecc71",
    borderLeftColor: "#2ecc71",
    borderRightColor: "#1e8449",
    borderBottomColor: "#17734a",
    // Additional depth
    shadowColor: "#1e8449",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  undoButton: {
    backgroundColor: "#f39c12",
    borderTopColor: "#f4d03f",
    borderLeftColor: "#f4d03f",
    borderRightColor: "#d68910",
    borderBottomColor: "#b7950b",
    // Additional depth
    shadowColor: "#d68910",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  removeButton: {
    backgroundColor: "#e74c3c",
    borderTopColor: "#f1948a",
    borderLeftColor: "#f1948a",
    borderRightColor: "#cb4335",
    borderBottomColor: "#a93226",
    // Additional depth
    shadowColor: "#cb4335",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    // Text shadow for better readability
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  buttonPressed: {
    // Pressed state - makes button appear pressed in
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    transform: [{ translateY: 2 }],
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 16,
    // Subtle inset shadow for empty state
    borderWidth: 2,
    borderColor: "#f8f9fa",
    borderTopColor: "#e9ecef",
    borderLeftColor: "#e9ecef",
    borderRightColor: "#ffffff",
    borderBottomColor: "#ffffff",
  },
  emptyText: {
    fontSize: 18,
    color: "#95a5a6",
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 24,
    // Subtle embossed text effect
    textShadowColor: "rgba(255, 255, 255, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
  },
});

export default TaskItem;