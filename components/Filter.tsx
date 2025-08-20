import { SkeuomorphicStyles, createSkeuomorphicStyle } from "@/utils/skeuomorphicStyles";
import React, { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FilterType } from "./TaskManagement";

interface FilterOption {
  label: string;
  value: FilterType;
}

interface FilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCount: number;
}

const Filter: React.FC<FilterProps> = ({
  currentFilter,
  onFilterChange,
  taskCount,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const filterOptions: FilterOption[] = [
    { label: `All (${taskCount})`, value: "all" },
    { label: "Completed", value: "completed" },
    { label: "Incomplete", value: "incomplete" },
  ];

  const getCurrentFilterLabel = () => {
    const option = filterOptions.find(opt => opt.value === currentFilter);
    return option?.label || "All";
  };

  const handleFilterSelect = (filter: FilterType) => {
    onFilterChange(filter);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filter:</Text>
      <TouchableOpacity 
        style={styles.dropdownButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.dropdownText}>{getCurrentFilterLabel()}</Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={filterOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    currentFilter === item.value && styles.selectedOption
                  ]}
                  onPress={() => handleFilterSelect(item.value)}
                >
                  <Text style={[
                    styles.optionText,
                    currentFilter === item.value && styles.selectedOptionText
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
  dropdownButton: {
    // Apply skeuomorphic raised button styling
    ...createSkeuomorphicStyle.raised("#ffffff", 10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    minHeight: 44,
    // Enhanced shadow for button prominence
    shadowOpacity: 0.18,
    // Multi-layered border effect
    borderWidth: 1,
    borderTopColor: SkeuomorphicStyles.colors.light.primary,
    borderLeftColor: SkeuomorphicStyles.colors.light.secondary,
    borderRightColor: SkeuomorphicStyles.colors.dark.primary,
    borderBottomColor: SkeuomorphicStyles.colors.dark.secondary,
  },
  dropdownText: {
    fontSize: 14,
    color: SkeuomorphicStyles.colors.text.primary,
    fontWeight: "500",
    flex: 1,
    // Subtle text shadow
    ...SkeuomorphicStyles.textShadows.embossed,
  },
  dropdownArrow: {
    fontSize: 12,
    color: SkeuomorphicStyles.colors.text.secondary,
    fontWeight: "bold",
    // Shadow for depth
    textShadowColor: "rgba(255, 255, 255, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    minWidth: 220,
    maxHeight: 300,
    // Enhanced skeuomorphic modal shadow
    ...SkeuomorphicStyles.shadows.large,
    shadowOpacity: 0.25,
    // Multi-layered border for depth
    borderWidth: 1,
    borderTopColor: SkeuomorphicStyles.colors.light.primary,
    borderLeftColor: SkeuomorphicStyles.colors.light.secondary,
    borderRightColor: SkeuomorphicStyles.colors.dark.primary,
    borderBottomColor: SkeuomorphicStyles.colors.dark.secondary,
  },
  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: SkeuomorphicStyles.colors.light.tertiary,
    // Subtle inset effect for options
    backgroundColor: "#fafafa",
  },
  selectedOption: {
    backgroundColor: SkeuomorphicStyles.colors.accent,
    // Inner shadow effect for selected state
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    borderLeftColor: "rgba(0, 0, 0, 0.1)",
  },
  optionText: {
    fontSize: 14,
    color: SkeuomorphicStyles.colors.text.primary,
    fontWeight: "500",
    // Embossed text effect
    ...SkeuomorphicStyles.textShadows.embossed,
  },
  selectedOptionText: {
    color: SkeuomorphicStyles.colors.text.white,
    fontWeight: "600",
    // Engraved text effect for selected
    ...SkeuomorphicStyles.textShadows.engraved,
  },
});

export default Filter;
