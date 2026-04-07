// src/EisenhowerMatrix.tsx
import { useTasks } from "./useTasks";
import { Link } from "react-router-dom";
import "./EisenhowerMatrix.css";

export default function EisenhowerMatrix() {
  const { tasks } = useTasks();

  const q1 = tasks.filter(
    (t) => t.urgency === "Urgent" && t.importance === "Important",
  );
  const q2 = tasks.filter(
    (t) => t.urgency === "Not Urgent" && t.importance === "Important",
  );
  const q3 = tasks.filter(
    (t) => t.urgency === "Urgent" && t.importance === "Not Important",
  );
  const q4 = tasks.filter(
    (t) => t.urgency === "Not Urgent" && t.importance === "Not Important",
  );

  return (
    <div className="matrix-grid">
      <div className="matrix-box">
        <div className="matrix-title">Urgent + Important</div>
        {q1.length === 0 && <p>No tasks</p>}
        {q1.map((t) => (
          <Link key={t.id} to={`/tasks/${t.id}`} className="matrix-link">
            {t.title}
          </Link>
        ))}
      </div>

      <div className="matrix-box">
        <div className="matrix-title">Not Urgent + Important</div>
        {q2.length === 0 && <p>No tasks</p>}
        {q2.map((t) => (
          <Link key={t.id} to={`/tasks/${t.id}`} className="matrix-link">
            {t.title}
          </Link>
        ))}
      </div>

      <div className="matrix-box">
        <div className="matrix-title">Urgent + Not Important</div>
        {q3.length === 0 && <p>No tasks</p>}
        {q3.map((t) => (
          <Link key={t.id} to={`/tasks/${t.id}`} className="matrix-link">
            {t.title}
          </Link>
        ))}
      </div>

      <div className="matrix-box">
        <div className="matrix-title">Not Urgent + Not Important</div>
        {q4.length === 0 && <p>No tasks</p>}
        {q4.map((t) => (
          <Link key={t.id} to={`/tasks/${t.id}`} className="matrix-link">
            {t.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
