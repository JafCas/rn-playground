import { SkeuomorphicStyles } from "@/utils/skeuomorphicStyles";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Filter from "./Filter";
import Sort from "./Sort";
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

  const applyFilterAndSort = React.useCallback(
    (filter: FilterType, sort: SortType) => {
      let filteredTasks = [...tasks];

      // Apply filter
      switch (filter) {
        case "completed":
          filteredTasks = filteredTasks.filter((task) => task.completed);
          break;
        case "incomplete":
          filteredTasks = filteredTasks.filter((task) => !task.completed);
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
    },
    [tasks, onFilteredTasksChange]
  );

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
      <View style={styles.controlsContainer}>
        <Filter
          currentFilter={currentFilter}
          onFilterChange={handleFilterChange}
          taskCount={tasks.length}
        />
        <Sort currentSort={currentSort} onSortChange={handleSortChange} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Apply skeuomorphic surface styling
    ...SkeuomorphicStyles.presets.surface,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 4,
    borderRadius: 12,
    // Enhanced shadow for management section
    ...SkeuomorphicStyles.shadows.medium,
  },
  title: {
    // Apply skeuomorphic label text styling
    ...SkeuomorphicStyles.presets.labelText,
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
    // Enhanced embossed effect
    textShadowColor: "rgba(255, 255, 255, 0.9)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 16,
  },
});

export default TaskManagement;
