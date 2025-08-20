import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Task, TaskList } from "@/components/Task";
import { TaskInput } from "@/components/TaskInput";
import { TaskManagement } from "@/components/TaskManagement";
import { useTaskStorage } from "@/hooks/useTaskStorage";
import { SkeuomorphicStyles } from "@/utils/skeuomorphicStyles";
import { getTaskStats } from "@/utils/taskUtils";

export default function HomeScreen() {
  const {
    tasks,
    isLoading,
    addTask,
    toggleTask,
    removeTask,
  } = useTaskStorage();

  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  // Initialize filtered tasks when tasks change
  React.useEffect(() => {
    if (filteredTasks.length === 0) {
      setFilteredTasks(tasks);
    }
  }, [tasks, filteredTasks.length]);

  const taskStats = getTaskStats(tasks);
  
  // Use filtered tasks for display, fallback to all tasks if no filter applied
  const displayTasks = filteredTasks.length === 0 && tasks.length > 0 ? tasks : filteredTasks;

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading tasks...</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Tasks</Text>
          <Text style={styles.subtitle}>
            {taskStats.total === 0 
              ? "No tasks yet" 
              : `${taskStats.completed} of ${taskStats.total} completed (${taskStats.completionRate}%)`
            }
          </Text>
          <TaskManagement
            tasks={tasks}
            onFilteredTasksChange={setFilteredTasks}
          />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <TaskList
            tasks={displayTasks}
            onToggleTask={toggleTask}
            onRemoveTask={removeTask}
          />
        </ScrollView>

        <TaskInput
          onAddTask={addTask}
          tasksCount={tasks.length}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5", // Slightly warmer background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // Add skeuomorphic loading container
    ...SkeuomorphicStyles.presets.surface,
    marginHorizontal: 20,
    marginVertical: 40,
    borderRadius: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: SkeuomorphicStyles.colors.text.secondary,
    // Add subtle text styling
    ...SkeuomorphicStyles.presets.subtitleText,
  },
  header: {
    // Apply skeuomorphic header preset
    ...SkeuomorphicStyles.presets.header,
    // Override margin to remove default spacing
    marginHorizontal: 0,
    marginVertical: 0,
    borderRadius: 0,
    // Add subtle bottom border for separation
    borderBottomWidth: 2,
    borderBottomColor: SkeuomorphicStyles.colors.light.tertiary,
    // Enhanced shadow for header prominence
    ...SkeuomorphicStyles.shadows.large,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
  },
  title: {
    // Apply skeuomorphic title styling
    ...SkeuomorphicStyles.presets.titleText,
    marginBottom: 8,
    // Enhanced text shadow for prominence
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  subtitle: {
    // Apply skeuomorphic subtitle styling  
    ...SkeuomorphicStyles.presets.subtitleText,
    marginBottom: 16,
    // Subtle inset text effect
    textShadowColor: "rgba(255, 255, 255, 0.9)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
  },
  scrollView: {
    flex: 0,
    backgroundColor: "#fff",
  },
});
