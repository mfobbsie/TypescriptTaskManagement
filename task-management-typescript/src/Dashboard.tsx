import React, { useMemo, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useTasks } from "./useTasks";
import { type Task } from "./TaskContext";
import EisenhowerMatrix from "./EisenhowerMatrix";

type SortOption = "none" | "dueDate" | "priority";

const Dashboard: React.FC = () => {
  const { tasks, addTask, toggleTaskCompleted, deleteTask } = useTasks();
  const navigate = useNavigate();

  const [view, setView] = useState<"list" | "matrix">("list");
  const [sortBy, setSortBy] = useState<SortOption>("none");

  const [energy, setEnergy] = useState<"Low" | "Medium" | "High" | null>(null);
  const [intention, setIntention] = useState<
    "Self-Care" | "Productivity" | "Inspiration" | null
  >(null);

  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    completed: false,
    urgency: "Not Urgent",
    importance: "Not Important",
    energyLevel: "Medium",
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
      urgency: "Not Urgent",
      importance: "Not Important",
      energyLevel: "Medium",
    });
  };

  const recommendedTasks = useMemo(() => {
    if (!energy && !intention) return [];

    return tasks.filter((t) => {
      if (energy === "Low" && t.energyLevel !== "Low") return false;
      if (energy === "Medium" && t.energyLevel === "High") return false;

      if (intention === "Self-Care" && t.priority !== "Low") return false;
      if (intention === "Productivity" && t.priority === "Low") return false;
      if (
        intention === "Inspiration" &&
        !t.description.toLowerCase().includes("creative")
      )
        return false;

      return true;
    });
  }, [tasks, energy, intention]);

  return (
    <div className="dashboard">
      <h1>Task Dashboard</h1>

      {/* Theme Toggle */}
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}
      >
        <button
          onClick={() => {
            const current = document.documentElement.getAttribute("data-theme");
            document.documentElement.setAttribute(
              "data-theme",
              current === "dark" ? "light" : "dark",
            );
          }}
        >
          Toggle Theme
        </button>
      </div>

      {/* View Toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <button onClick={() => setView("list")}>List View</button>
        <button onClick={() => setView("matrix")}>Eisenhower Matrix</button>
      </div>

      {/* How Are You Feeling */}
      <div className="dashboard-panel">
        <h3 style={{ marginBottom: 12 }}>How are you feeling today?</h3>

        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button
            className={energy === "Low" ? "choice selected" : "choice"}
            onClick={() => setEnergy("Low")}
          >
            Low Energy
          </button>

          <button
            className={energy === "Medium" ? "choice selected" : "choice"}
            onClick={() => setEnergy("Medium")}
          >
            Medium Energy
          </button>

          <button
            className={energy === "High" ? "choice selected" : "choice"}
            onClick={() => setEnergy("High")}
          >
            High Energy
          </button>
        </div>

        <h4 style={{ marginBottom: 8 }}>What do you want to lean into?</h4>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            className={intention === "Self-Care" ? "choice selected" : "choice"}
            onClick={() => setIntention("Self-Care")}
          >
            Self-Care
          </button>

          <button
            className={
              intention === "Productivity" ? "choice selected" : "choice"
            }
            onClick={() => setIntention("Productivity")}
          >
            Productivity
          </button>

          <button
            className={
              intention === "Inspiration" ? "choice selected" : "choice"
            }
            onClick={() => setIntention("Inspiration")}
          >
            Inspiration
          </button>
        </div>
      </div>

      <div className="section-divider" />

      {/* Add Task Form */}
      <div className="task-form">
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            id="title"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* KEEP THESE — the correct versions */}
        <div className="form-group">
          <label htmlFor="urgency">Urgency</label>
          <select
            id="urgency"
            name="urgency"
            value={newTask.urgency}
            onChange={handleInputChange}
          >
            <option value="Urgent">Urgent</option>
            <option value="Not Urgent">Not Urgent</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="importance">Importance</label>
          <select
            id="importance"
            name="importance"
            value={newTask.importance}
            onChange={handleInputChange}
          >
            <option value="Important">Important</option>
            <option value="Not Important">Not Important</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="energyLevel">Energy Level</label>
          <select
            id="energyLevel"
            name="energyLevel"
            value={newTask.energyLevel}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button onClick={addNewTask}>Add Task</button>
      </div>

      <div className="section-divider" />

      {/* Sort Dropdown */}
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

      <div className="section-divider" />

      {/* Recommended Tasks */}
      {(energy || intention) && (
        <div className="dashboard-panel recommended-panel">
          <h3 style={{ marginBottom: 12 }}>Recommended for You</h3>

          {recommendedTasks.length === 0 && (
            <p>No tasks match your current energy and intention.</p>
          )}

          {recommendedTasks.map((task) => (
            <div key={task.id} style={{ marginBottom: 8 }}>
              <strong>{task.title}</strong>
              <button style={{ marginLeft: 12 }} onClick={() => viewTask(task)}>
                View
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Conditional Rendering */}
      {view === "list" && (
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
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {view === "matrix" && <EisenhowerMatrix />}
    </div>
  );
};

export default Dashboard;
