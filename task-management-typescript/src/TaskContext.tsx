// src/TaskContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
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

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = { ...task, id: Date.now() };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTaskCompleted = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const updateTask = (id: number, updates: Omit<Task, "id">) => {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === id);
      if (!exists) return prev; // silently ignore invalid updates

      return prev.map((t) => (t.id === id ? { ...t, ...updates } : t));
    });
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTaskCompleted, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside <TaskProvider>");
  return ctx;
}
