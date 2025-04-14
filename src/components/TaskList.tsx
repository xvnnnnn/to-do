import { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="w-full max-w-xl mx-auto mt-6 p-6 sm:p-8 bg-white dark:bg-gray-900 rounded shadow text-center text-gray-500 dark:text-gray-300">
        No tasks
      </div>
    );
  }

  return (
    <ul className="w-full max-w-xl mx-auto mt-6 p-0 list-none" role="list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;