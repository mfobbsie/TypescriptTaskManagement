// src/ViewTaskDetails.tsx
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "./useTasks";
import { type Task } from "./TaskContext";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask } = useTasks();

  const task = useMemo(
    () => tasks.find((t) => t.id === Number(id)),
    [tasks, id],
  );

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Omit<Task, "id">>(() => ({
    title: task?.title ?? "",
    description: task?.description ?? "",
    dueDate: task?.dueDate ?? "",
    priority: task?.priority ?? "Low",
    completed: task?.completed ?? false,
    urgency: task?.urgency ?? "Not Urgent",
    importance: task?.importance ?? "Not Important",
    energyLevel: task?.energyLevel ?? "Medium",
  }));

  if (!task) return <p>Task not found.</p>;

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = () => {
    if (!form.title.trim()) {
      alert("Title cannot be empty.");
      return;
    }

    if (!form.description.trim()) {
      alert("Description cannot be empty.");
      return;
    }

    updateTask(task.id, form);
    setIsEditing(false);
  };

  const onDelete = () => {
    deleteTask(task.id);
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Task Details</h2>

      <label>Title</label>
      <input
        name="title"
        value={form.title}
        onChange={onChange}
        disabled={!isEditing}
      />

      <label>Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={onChange}
        disabled={!isEditing}
      />

      <label>Due Date</label>
      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={onChange}
        disabled={!isEditing}
      />

      <label>Priority</label>
      <select
        name="priority"
        value={form.priority}
        onChange={onChange}
        disabled={!isEditing}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <label>Urgency</label>
      <select
        name="urgency"
        value={form.urgency}
        onChange={onChange}
        disabled={!isEditing}
      >
        <option value="Urgent">Urgent</option>
        <option value="Not Urgent">Not Urgent</option>
      </select>

      <label>Importance</label>
      <select
        name="importance"
        value={form.importance}
        onChange={onChange}
        disabled={!isEditing}
      >
        <option value="Important">Important</option>
        <option value="Not Important">Not Important</option>
      </select>

      <label>Energy Level</label>
      <select
        name="energyLevel"
        value={form.energyLevel}
        onChange={onChange}
        disabled={!isEditing}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <label>
        <input
          type="checkbox"
          name="completed"
          checked={form.completed}
          onChange={onChange}
          disabled={!isEditing}
        />
        Completed
      </label>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>Edit Task</button>
        ) : (
          <>
            <button onClick={onSave}>Save Changes</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        )}

        <button onClick={onDelete}>Delete Task</button>
      </div>
    </div>
  );
};

export default ViewTaskDetails;
