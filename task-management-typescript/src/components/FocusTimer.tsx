//FocusTimer.tsx

import { useEffect, useState } from "react";

interface FocusTimerProps {
  taskTitle?: string;
}

export default function FocusTimer({ taskTitle }: FocusTimerProps) {
  const INITIAL_SECONDS = 180; // 3 minutes
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const start = () => {
    setSecondsLeft(INITIAL_SECONDS);
    setIsRunning(true);
  };

  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(INITIAL_SECONDS);
  };

  return (
    <div
      style={{
        marginTop: 24,
        padding: 16,
        borderRadius: 12,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        maxWidth: 260,
      }}
    >
      <h3 style={{ marginBottom: 8 }}>
        {taskTitle ? `Focus on: ${taskTitle}` : "3‑Minute Focus Timer"}
      </h3>

      <div
        style={{
          fontSize: "2rem",
          fontWeight: 600,
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        {minutes}:{seconds.toString().padStart(2, "0")}
      </div>

      {!isRunning ? (
        <button onClick={start} style={{ width: "100%" }}>
          Start 3‑Minute Timer
        </button>
      ) : (
        <button onClick={reset} style={{ width: "100%" }}>
          Reset
        </button>
      )}
    </div>
  );
}
