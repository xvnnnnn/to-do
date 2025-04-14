import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <li
      className="flex items-center justify-between px-4 sm:px-6 py-2 bg-white dark:bg-gray-800 rounded shadow mb-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
      aria-label={`Task: ${task.title}`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          className="w-5 h-5 accent-blue-500 cursor-pointer"
        />
        <span
          className={`text-lg truncate ${task.completed ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-gray-100"}`}
          aria-label={task.completed ? "Completed task" : "Incomplete task"}
        >
          {task.title}
        </span>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <button
          onClick={() => onEdit(task)}
          className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Edit task"
          type="button"
        >
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.414 1.414-4.243a4 4 0 01.828-1.414z"
            />
          </svg>
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Delete task"
          type="button"
        >
          <svg
            className="w-5 h-5 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default TaskItem;