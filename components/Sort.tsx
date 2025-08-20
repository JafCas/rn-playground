import { SkeuomorphicStyles, createSkeuomorphicStyle } from "@/utils/skeuomorphicStyles";
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
          trackColor={{ 
            false: SkeuomorphicStyles.colors.light.tertiary, 
            true: SkeuomorphicStyles.colors.accent 
          }}
          thumbColor={currentSort !== "none" ? "#fff" : "#f8f8f8"}
          ios_backgroundColor={SkeuomorphicStyles.colors.light.tertiary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 130,
  },
  label: {
    // Apply skeuomorphic label styling
    ...SkeuomorphicStyles.presets.labelText,
    fontSize: 14,
    marginBottom: 6,
  },
  switchContainer: {
    // Apply skeuomorphic raised surface styling
    ...createSkeuomorphicStyle.raised("#ffffff", 10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 14,
    minHeight: 44,
    // Enhanced shadow for container prominence
    shadowOpacity: 0.18,
    // Multi-layered border effect
    borderWidth: 1,
    borderTopColor: SkeuomorphicStyles.colors.light.primary,
    borderLeftColor: SkeuomorphicStyles.colors.light.secondary,
    borderRightColor: SkeuomorphicStyles.colors.dark.primary,
    borderBottomColor: SkeuomorphicStyles.colors.dark.secondary,
  },
  sortLabel: {
    fontSize: 14,
    color: SkeuomorphicStyles.colors.text.primary,
    fontWeight: "500",
    flex: 1,
    // Subtle embossed text effect
    ...SkeuomorphicStyles.textShadows.embossed,
  },
});

export default Sort;
