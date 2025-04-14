import { useState, useEffect, FormEvent } from "react";
import type { Task } from "../types/task";

interface TaskFormProps {
  onSubmit: (task: Task | { title: string }) => void;
  task?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, task = null }) => {
  const [title, setTitle] = useState<string>(task?.title || "");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setTitle(task?.title || "");
    setError("");
  }, [task]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title cannot be empty.");
      return;
    }
    if (task) {
      onSubmit({ ...task, title: title.trim() });
    } else {
      onSubmit({ title: title.trim() });
    }
    setTitle("");
    setError("");
  };

  return (
    <form
      className="flex flex-col sm:flex-row items-stretch gap-3 mb-6 bg-white dark:bg-gray-900 p-4 rounded shadow"
      onSubmit={handleSubmit}
      aria-label={task ? "Edit Task" : "Add Task"}
    >
      <div className="flex-1 flex flex-col">
        <label htmlFor="task-title" className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
          Task Title
        </label>
        <input
          id="task-title"
          type="text"
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          aria-invalid={!!error}
          aria-describedby={error ? "task-title-error" : undefined}
        />
        {error && (
          <span id="task-title-error" className="text-red-500 dark:text-red-400 text-xs mt-1">
            {error}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label={task ? "Update Task" : "Add Task"}
      >
        {task ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default TaskForm;