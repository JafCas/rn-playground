import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { SortType } from "./TaskManagement";

interface SortProps {
  currentSort: SortType;
  onSortChange: (sort: SortType) => void;
}

const Sort: React.FC<SortProps> = ({
  currentSort,
  onSortChange,
}) => {
  const handleSortToggle = (isEnabled: boolean) => {
    if (isEnabled) {
      // Cycle through sort options: none -> name -> status -> none
      switch (currentSort) {
        case "none":
          onSortChange("name");
          break;
        case "name":
          onSortChange("status");
          break;
        case "status":
        default:
          onSortChange("none");
          break;
      }
    } else {
      onSortChange("none");
    }
  };

  const getSortLabel = () => {
    switch (currentSort) {
      case "name":
        return "Sort by Name";
      case "status":
        return "Sort by Status";
      case "none":
      default:
        return "No Sorting";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sort:</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.sortLabel}>{getSortLabel()}</Text>
        <Switch
          value={currentSort !== "none"}
          onValueChange={handleSortToggle}
          trackColor={{ false: "#ddd", true: "#007AFF" }}
          thumbColor={currentSort !== "none" ? "#fff" : "#f4f4f4"}
          ios_backgroundColor="#ddd"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 120,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    minHeight: 40,
  },
  sortLabel: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
});

export default Sort;
