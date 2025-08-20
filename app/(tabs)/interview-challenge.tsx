import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";

type Task = {
  name: string;
  completed: boolean;
};

export default function InterviewChallenge() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const TASK = "TASKS";

  const taskStatus = (completed: boolean): string => {
    return completed ? "Completed" : "Incomplete";
  };

  const handleAddTask = async (name: string) => {
    setTasks((prevTasks) => [...prevTasks, { name, completed: false }]);
    await storeTasks([...tasks, { name, completed: false }]);
  };

  const handleToggleTask = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleRemoveTask = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const storeTasks = async (tasks: Task[]) => {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem(TASK, jsonValue);
    } catch (e) {
      // saving error
      console.error("Error saving tasks:", e);
    }
  };

  const getTasks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(TASK);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // error reading value
      console.error("Error reading tasks:", e);
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      const storedTasks = await getTasks();
      if (storedTasks.length > 0) {
        setTasks(storedTasks);
      }
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Tasks List */}
        {tasks.map((task, index) => (
          <View key={index} style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{task.name}</Text>
            <Text>{`Is: ${taskStatus(task.completed)}`}</Text>
            <Button
              title={task.completed ? "Undo" : "Complete"}
              onPress={() => handleToggleTask(index)}
            />
            <Button title="Remove" onPress={() => handleRemoveTask(index)} />
          </View>
        ))}

        {/* Input for new tasks */}
        <View style={{ marginTop: 20 }}>
          <Text onPress={() => handleAddTask(`Task ${tasks.length + 1}`)}>
            Add Task
          </Text>
          <TextInput
            placeholder="Add New Task"
            onSubmitEditing={(event) => handleAddTask(event.nativeEvent.text)}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// create Task component

const styles = StyleSheet.create({});
