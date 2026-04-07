// src/__tests__/dashboard-list.test.tsx
import { test, expect } from "vitest";
import { screen, fireEvent, within } from "@testing-library/react";
import { renderWithProviders } from "../test-utils/renderWithProviders";
import Dashboard from "../Dashboard";
import { TaskContext, type TaskContextValue, type Task } from "../TaskContext";

test("renders tasks in list view", () => {
  const mockTasks: Task[] = [
    {
      id: 1,
      title: "Buy groceries",
      description: "Milk, eggs, bread",
      dueDate: "2026-04-10",
      priority: "Medium",
      completed: false,
      urgency: "Not Urgent",
      importance: "Not Important",
      energyLevel: "Low",
    },
    {
      id: 2,
      title: "Walk dogs",
      description: "Ellie + Virgil",
      dueDate: "2026-04-11",
      priority: "High",
      completed: false,
      urgency: "Urgent",
      importance: "Important",
      energyLevel: "High",
    },
  ];

  const mockContext: TaskContextValue = {
    tasks: mockTasks,
    addTask: () => {},
    toggleTaskCompleted: () => {},
    updateTask: () => {},
    deleteTask: () => {},
  };

  renderWithProviders(
    <TaskContext.Provider value={mockContext}>
      <Dashboard />
    </TaskContext.Provider>,
  );

  expect(screen.getByText("Buy groceries")).toBeInTheDocument();
  expect(screen.getByText("Walk dogs")).toBeInTheDocument();
});

test("adds a new task through the form", () => {
  renderWithProviders(<Dashboard />);

  fireEvent.change(screen.getByLabelText(/task title/i), {
    target: { value: "New Task" },
  });

  fireEvent.change(screen.getByLabelText(/description/i), {
    target: { value: "Details" },
  });

  fireEvent.click(screen.getByRole("button", { name: /add task/i }));

  expect(screen.getByText("New Task")).toBeInTheDocument();
});

test("toggles task completion", () => {
  renderWithProviders(<Dashboard />);

  fireEvent.change(screen.getByLabelText(/task title/i), {
    target: { value: "Toggle me" },
  });
  fireEvent.change(screen.getByLabelText(/description/i), {
    target: { value: "Test" },
  });
  fireEvent.click(screen.getByRole("button", { name: /add task/i }));

  const checkboxes = screen.getAllByRole("checkbox");
  const checkbox = checkboxes[checkboxes.length - 1]; // grab the last one added

  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

test("deletes a task", () => {
  renderWithProviders(<Dashboard />);

  fireEvent.change(screen.getByLabelText(/task title/i), {
    target: { value: "Delete me" },
  });
  fireEvent.change(screen.getByLabelText(/description/i), {
    target: { value: "Test" },
  });
  fireEvent.click(screen.getByRole("button", { name: /add task/i }));

  // Find the specific task item containing "Delete me"
  const taskItems = screen.getAllByRole("heading", { level: 3 });
  const targetTask = taskItems.find((h) => h.textContent === "Delete me");
  const taskCard = targetTask!.closest(".task-item") as HTMLElement;

  fireEvent.click(within(taskCard).getByRole("button", { name: /delete/i }));

  expect(screen.queryByText("Delete me")).not.toBeInTheDocument();
});
