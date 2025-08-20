import {
    SkeuomorphicStyles,
    createSkeuomorphicStyle,
} from "@/utils/skeuomorphicStyles";
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
  const [isButtonPressed, setIsButtonPressed] = useState(false);

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
      <View style={styles.rowContainer}>
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
        <Text
          style={[
            styles.quickAddText,
            { color: SkeuomorphicStyles.colors.text.secondary },
          ]}
        >
          Or
        </Text>

        <TouchableOpacity
          onPress={handleQuickAdd}
          onPressIn={() => setIsButtonPressed(true)}
          onPressOut={() => setIsButtonPressed(false)}
          style={[
            styles.quickAddButton,
            isButtonPressed && styles.quickAddButtonPressed,
          ]}
        >
          <Text style={styles.quickAddText}>Quick Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "17%",
    marginTop: 4,
    padding: 16,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    ...SkeuomorphicStyles.shadows.medium,
    ...SkeuomorphicStyles.borders.raised,
  },
  inputContainer: {
    flex: 1,
    ...createSkeuomorphicStyle.inset("#f8f9fa", 8),
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textInput: {
    fontSize: 16,
    color: SkeuomorphicStyles.colors.text.primary,
    fontWeight: "500",
  },
  quickAddButton: {
    ...createSkeuomorphicStyle.raised(SkeuomorphicStyles.colors.accent, 8),
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 90,
  },
  quickAddButtonPressed: {
    ...SkeuomorphicStyles.shadows.pressed,
    transform: [{ translateY: 1 }],
  },
  quickAddText: {
    color: SkeuomorphicStyles.colors.text.white,
    fontSize: 14,
    fontWeight: "600",
    ...SkeuomorphicStyles.textShadows.subtle,
  },
});

// Remove default export since we're using named export
