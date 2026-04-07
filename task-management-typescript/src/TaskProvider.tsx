// src/TaskProvider.tsx

import { useEffect, useState, type ReactNode } from "react";
import { type Task } from "./TaskContext";
import { TaskContext } from "./TaskContext";

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  const addTask = (task: Omit<Task, "id">) => {
    setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
  };

  const toggleTaskCompleted = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const updateTask = (id: number, updates: Omit<Task, "id">) => {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === id);
      if (!exists) return prev;
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