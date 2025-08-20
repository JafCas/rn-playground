# TaskManagement Component Documentation

## Overview
The `TaskManagement` component provides filtering and sorting functionality for task lists. It consists of two sub-components: `Filter` and `Sort`, which allow users to manipulate how tasks are displayed.

## Components

### TaskManagement
Main component that orchestrates filtering and sorting operations.

**Props:**
- `tasks: Task[]` - Array of all tasks
- `onFilteredTasksChange: (filteredTasks: Task[]) => void` - Callback when filtered/sorted tasks change

**Features:**
- Combines filtering and sorting logic
- Maintains filter and sort state
- Automatically applies changes when tasks update

### Filter Component
Provides dropdown-style filtering options for tasks.

**Props:**
- `currentFilter: FilterType` - Current filter selection
- `onFilterChange: (filter: FilterType) => void` - Callback when filter changes
- `taskCount: number` - Total number of tasks (for display)

**Filter Options:**
- `"all"` - Show all tasks (default)
- `"completed"` - Show only completed tasks
- `"incomplete"` - Show only incomplete tasks

**Features:**
- Custom dropdown implementation with modal
- Visual indication of current selection
- Task count display for "All" option

### Sort Component
Provides sorting functionality with a toggle switch interface.

**Props:**
- `currentSort: SortType` - Current sort selection
- `onSortChange: (sort: SortType) => void` - Callback when sort changes

**Sort Options:**
- `"none"` - No sorting (original order)
- `"name"` - Sort alphabetically by task name
- `"status"` - Sort by completion status (incomplete first)

**Features:**
- Switch-based interface
- Cycles through sort options when enabled
- Clear visual indication of current sort method

## Types

```typescript
export type FilterType = "all" | "completed" | "incomplete";
export type SortType = "name" | "status" | "none";
```

## Usage Example

```tsx
import { TaskManagement } from "@/components/TaskManagement";

export default function TaskScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  return (
    <View>
      <TaskManagement
        tasks={tasks}
        onFilteredTasksChange={setFilteredTasks}
      />
      <TaskList tasks={filteredTasks} />
    </View>
  );
}
```

## Integration with Main App

The TaskManagement component is integrated into the header section of the main screen (`index.tsx`):

1. **State Management**: Uses local state to track filtered tasks
2. **Automatic Updates**: Responds to changes in the main task list
3. **Seamless Integration**: Works with existing task operations (add, toggle, remove)

## Styling

- Consistent with app design language
- Responsive layout that works on different screen sizes
- Accessible touch targets for mobile interaction
- Clear visual hierarchy and feedback

## Benefits

- **Enhanced UX**: Users can quickly find specific tasks
- **Flexible Display**: Multiple ways to organize task lists
- **Performance**: Efficient filtering and sorting operations
- **Modularity**: Components can be used independently
- **Extensibility**: Easy to add new filter/sort options

## Future Enhancements

- **Date-based filtering**: Filter by creation date, due date
- **Priority-based sorting**: Add task priority levels
- **Custom filters**: User-defined filter criteria
- **Search functionality**: Text-based task search
- **Saved views**: Remember user's preferred filter/sort combinations
