import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FilterComponent from "./Filter";
import SortComponent from "./Sort";
import { Task } from "./Task";

export type FilterType = "all" | "completed" | "incomplete";
export type SortType = "name" | "status" | "none";

interface TaskManagementProps {
  tasks: Task[];
  onFilteredTasksChange: (filteredTasks: Task[]) => void;
}

export const TaskManagement: React.FC<TaskManagementProps> = ({
  tasks,
  onFilteredTasksChange,
}) => {
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [currentSort, setCurrentSort] = useState<SortType>("none");

  const applyFilterAndSort = React.useCallback((filter: FilterType, sort: SortType) => {
    let filteredTasks = [...tasks];

    // Apply filter
    switch (filter) {
      case "completed":
        filteredTasks = filteredTasks.filter(task => task.completed);
        break;
      case "incomplete":
        filteredTasks = filteredTasks.filter(task => !task.completed);
        break;
      case "all":
      default:
        // Show all tasks
        break;
    }

    // Apply sort
    switch (sort) {
      case "name":
        filteredTasks.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "status":
        filteredTasks.sort((a, b) => {
          if (a.completed === b.completed) return 0;
          return a.completed ? 1 : -1; // Incomplete tasks first
        });
        break;
      case "none":
      default:
        // Keep original order
        break;
    }

    onFilteredTasksChange(filteredTasks);
  }, [tasks, onFilteredTasksChange]);

  const handleFilterChange = (filter: FilterType) => {
    setCurrentFilter(filter);
    applyFilterAndSort(filter, currentSort);
  };

  const handleSortChange = (sort: SortType) => {
    setCurrentSort(sort);
    applyFilterAndSort(currentFilter, sort);
  };

  // Apply initial filter and sort when tasks change
  React.useEffect(() => {
    applyFilterAndSort(currentFilter, currentSort);
  }, [applyFilterAndSort, currentFilter, currentSort]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Management</Text>
      <View style={styles.controlsContainer}>
        <FilterComponent
          currentFilter={currentFilter}
          onFilterChange={handleFilterChange}
          taskCount={tasks.length}
        />
        <SortComponent
          currentSort={currentSort}
          onSortChange={handleSortChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
});

export default TaskManagement;
