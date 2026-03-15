// src/Dashboard.tsx
import React, { useMemo, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useTasks, type Task } from "./TaskContext";

type SortOption = "none" | "dueDate" | "priority";

const Dashboard: React.FC = () => {
  const { tasks, addTask, toggleTaskCompleted } = useTasks();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<SortOption>("none");
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    completed: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const viewTask = (taskDetails: Task) => {
    navigate(`/tasks/${taskDetails.id}`, { state: { task: taskDetails } });
  };

  const sortedTasks = useMemo(() => {
    const priorityRank = { High: 3, Medium: 2, Low: 1 };

    const items = [...tasks];

    if (sortBy === "dueDate") {
      return items.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    }

    if (sortBy === "priority") {
      return items.sort(
        (a, b) => priorityRank[b.priority] - priorityRank[a.priority],
      );
    }

    return tasks;
  }, [tasks, sortBy]);

  const addNewTask = () => {
    if (!newTask.title.trim()) {
      alert("Task title is required.");
      return;
    }

    if (!newTask.description.trim()) {
      alert("Task description is required.");
      return;
    }

    addTask(newTask);
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
      completed: false,
    });
  };

  return (
    <div className="dashboard">
      <h1>Task Dashboard</h1>

      <div className="task-form">
        <div className="form-group">
          <label>Task Title</label>
          <input
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button onClick={addNewTask}>Add Task</button>
      </div>

      <div className="task-list-header">
        <label>Sort tasks by</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
        >
          <option value="none">Newest Added</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="task-list">
        {sortedTasks.map((task) => (
          <div key={task.id} className="task-item">
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompleted(task.id)}
              />
              Mark completed
            </label>

            <h3 className={task.completed ? "task-title-completed" : ""}>
              {task.title}
            </h3>

            <p>Due: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>

            {task.completed && (
              <p className="task-complete-message">
                Awesome job — this task is complete!
              </p>
            )}

            <button onClick={() => viewTask(task)}>View More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
