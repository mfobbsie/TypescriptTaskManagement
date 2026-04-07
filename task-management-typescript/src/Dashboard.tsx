// src/Dashboard.tsx
import React, { useMemo, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useTasks } from "./useTasks";
import { type Task } from "./TaskContext";
import EisenhowerMatrix from "./EisenhowerMatrix";

type SortOption = "none" | "dueDate" | "priority";

const Dashboard: React.FC = () => {
  const { tasks, addTask, toggleTaskCompleted } = useTasks();
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
      // Energy filter
      if (energy === "Low" && t.energyLevel !== "Low") return false;
      if (energy === "Medium" && t.energyLevel === "High") return false;

      // Intention filter
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

      {/* View Toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setView("list")}>List View</button>
        <button onClick={() => setView("matrix")}>Eisenhower Matrix</button>
      </div>

      {/* How Are You Feeling Prompt */}
      <div className="dashboard-panel"
        style={{
          marginBottom: 24,
          padding: 16,
          borderRadius: 12,
          background: "#f7f7f7",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        <h3 style={{ marginBottom: 12 }}>How are you feeling today?</h3>

        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button onClick={() => setEnergy("Low")}>Low Energy</button>
          <button onClick={() => setEnergy("Medium")}>Medium Energy</button>
          <button onClick={() => setEnergy("High")}>High Energy</button>
        </div>

        <h4 style={{ marginBottom: 8 }}>What do you want to lean into?</h4>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setIntention("Self-Care")}>Self‑Care</button>
          <button onClick={() => setIntention("Productivity")}>
            Productivity
          </button>
          <button onClick={() => setIntention("Inspiration")}>
            Inspiration
          </button>
        </div>
      </div>

      {/* Add Task Form */}
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

        {/* NEW FIELDS */}
        <div className="form-group">
          <label>Urgency</label>
          <select
            name="urgency"
            value={newTask.urgency}
            onChange={handleInputChange}
          >
            <option value="Urgent">Urgent</option>
            <option value="Not Urgent">Not Urgent</option>
          </select>
        </div>

        <div className="form-group">
          <label>Importance</label>
          <select
            name="importance"
            value={newTask.importance}
            onChange={handleInputChange}
          >
            <option value="Important">Important</option>
            <option value="Not Important">Not Important</option>
          </select>
        </div>

        <div className="form-group">
          <label>Energy Level</label>
          <select
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

      {/* Recommended Tasks */}
      {(energy || intention) && (
        <div className="dashboard-panel"
          style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 12,
            background: "#fff7e6",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
        >
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

      {/* CONDITIONAL RENDERING */}
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
            </div>
          ))}
        </div>
      )}

      {view === "matrix" && <EisenhowerMatrix />}
    </div>
  );
};

export default Dashboard;
