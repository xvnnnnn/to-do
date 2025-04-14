import { useState, useEffect, FormEvent } from "react";
import type { Task } from "../types/task";

interface TaskFormProps {
  onSubmit: (task: Task | { title: string }) => void;
  task?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, task = null }) => {
  const [title, setTitle] = useState<string>(task?.title || "");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTitle(task?.title || "");
    setError(null);
  }, [task]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title cannot be empty");
      return;
    }
    setIsLoading(true);
    try {
      if (task) {
        await Promise.resolve(onSubmit({ ...task, title: title.trim() }));
      } else {
        await Promise.resolve(onSubmit({ title: title.trim() }));
      }
      setTitle("");
      setError(null);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit}
        aria-label={task ? "Edit Task" : "Add Task"}
      >
        <label
          htmlFor="task-title"
          className="text-sm font-medium text-gray-700"
        >
          Task Title
        </label>
        <input
          id="task-title"
          type="text"
          className="bg-white border border-gray-300 rounded-md p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
          aria-invalid={!!error}
          aria-describedby={error ? "task-title-error" : undefined}
          disabled={isLoading}
        />
        {error && (
          <p
            id="task-title-error"
            className="text-red-500 text-sm"
            role="alert"
          >
            {error}
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white uppercase rounded-lg shadow-sm hover:bg-blue-700 hover:scale-105 transition-transform focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2 font-semibold"
          aria-label={task ? "Update Task" : "Add Task"}
          disabled={isLoading || !title.trim()}
        >
          {isLoading ? (task ? "Updating..." : "Adding...") : task ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;