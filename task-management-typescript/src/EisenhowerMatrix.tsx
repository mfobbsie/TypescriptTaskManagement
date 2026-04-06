// src/EisenhowerMatrix.tsx

import { useTasks } from "./useTasks";
import { Link } from "react-router-dom";

const boxStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 16,
  background: "#fafafa",
  minHeight: 180,
};

const titleStyle: React.CSSProperties = {
  fontWeight: 600,
  marginBottom: 8,
};

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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
        marginTop: 24,
      }}
    >
      <div style={boxStyle}>
        <div style={titleStyle}>Urgent + Important</div>
        {q1.length === 0 && <p>No tasks</p>}
        {q1.map((t) => (
          <Link key={t.id} to={`/task/${t.id}`}>
            <p>{t.title}</p>
          </Link>
        ))}
      </div>

      <div style={boxStyle}>
        <div style={titleStyle}>Not Urgent + Important</div>
        {q2.length === 0 && <p>No tasks</p>}
        {q2.map((t) => (
          <Link key={t.id} to={`/task/${t.id}`}>
            <p>{t.title}</p>
          </Link>
        ))}
      </div>

      <div style={boxStyle}>
        <div style={titleStyle}>Urgent + Not Important</div>
        {q3.length === 0 && <p>No tasks</p>}
        {q3.map((t) => (
          <Link key={t.id} to={`/task/${t.id}`}>
            <p>{t.title}</p>
          </Link>
        ))}
      </div>

      <div style={boxStyle}>
        <div style={titleStyle}>Not Urgent + Not Important</div>
        {q4.length === 0 && <p>No tasks</p>}
        {q4.map((t) => (
          <Link key={t.id} to={`/task/${t.id}`}>
            <p>{t.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
