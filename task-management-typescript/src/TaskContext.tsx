// src/TaskContext.tsx
import { createContext } from "react";

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;

  urgency?: "Urgent" | "Not Urgent";
  importance?: "Important" | "Not Important";
  energyLevel?: "Low" | "Medium" | "High";
}

export interface TaskContextValue {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  toggleTaskCompleted: (id: number) => void;
  updateTask: (id: number, updates: Omit<Task, "id">) => void;
  deleteTask: (id: number) => void;
}

export const TaskContext = createContext<TaskContextValue | undefined>(
  undefined,
);