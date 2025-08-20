import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { TaskList } from "@/components/Task";
import { TaskInput } from "@/components/TaskInput";
import { useTaskStorage } from "@/hooks/useTaskStorage";
import { getTaskStats } from "@/utils/taskUtils";

export default function HomeScreen() {
  const {
    tasks,
    isLoading,
    addTask,
    toggleTask,
    removeTask,
  } = useTaskStorage();

  const taskStats = getTaskStats(tasks);

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
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <TaskList
            tasks={tasks}
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
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  scrollView: {
    flex: 0,
    backgroundColor: "#fff",
  },
});
