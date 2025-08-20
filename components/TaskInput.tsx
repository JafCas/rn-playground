import { isValidTaskName } from "@/utils/taskUtils";
import React, { useState } from "react";
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface TaskInputProps {
  onAddTask: (name: string) => void;
  tasksCount: number;
}

export const TaskInput: React.FC<TaskInputProps> = ({
  onAddTask,
  tasksCount,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();

    if (!isValidTaskName(trimmedValue)) {
      Alert.alert(
        "Invalid Task",
        "Please enter a task name between 1 and 100 characters."
      );
      return;
    }

    onAddTask(trimmedValue);
    setInputValue("");
  };

  const handleQuickAdd = () => {
    onAddTask(`Task ${tasksCount + 1}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleQuickAdd} style={styles.quickAddButton}>
        <Text style={styles.quickAddText}>Add Quick Task</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add New Task"
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "24%",
    marginTop: 20,
    padding: 16,
  },
  quickAddButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  quickAddText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  textInput: {
    padding: 12,
    fontSize: 16,
  },
});

// Remove default export since we're using named export
