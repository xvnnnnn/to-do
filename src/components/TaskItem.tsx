import { Task } from "../types/task";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <div
      className="border border-gray-200 rounded-lg p-3 shadow-sm flex items-center justify-between hover:bg-gray-50 transition-all animate-fade-in my-2 group"
      aria-label={`Task: ${task.title}`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
        />
        <span
          className={`text-base text-gray-800 truncate ${
            task.completed
              ? "line-through text-gray-500 opacity-60"
              : ""
          }`}
          aria-label={task.completed ? "Completed task" : "Incomplete task"}
        >
          {task.title}
        </span>
      </div>
      <div className="flex gap-4 ml-4">
        {/* Edit Icon with tooltip */}
        <div className="group relative">
          <button
            onClick={() => onEdit(task)}
            className="h-5 w-5 text-gray-600 hover:text-blue-600 focus:ring-2 focus:ring-blue-500"
            aria-label="Edit task"
            type="button"
          >
            <FiEdit2 />
          </button>
          <span
            className="invisible group-hover:visible absolute -top-7 left-0 text-xs bg-gray-800 text-white p-1 rounded z-20 whitespace-nowrap"
          >
            Edit
          </span>
        </div>
        {/* Delete Icon with tooltip */}
        <div className="group relative">
          <button
            onClick={() => onDelete(task.id)}
            className="h-5 w-5 text-gray-600 hover:text-red-600 focus:ring-2 focus:ring-red-500"
            aria-label="Delete task"
            type="button"
          >
            <FiTrash2 />
          </button>
          <span
            className="invisible group-hover:visible absolute -top-7 left-0 text-xs bg-gray-800 text-white p-1 rounded z-20 whitespace-nowrap"
          >
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;