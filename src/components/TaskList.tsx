import { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onEdit, onDelete }) => {
  return (
    <div className="mt-6">
      {tasks.length === 0 ? (
        <div className="text-center text-gray-500">
          No tasks yet—add one to get started!
        </div>
      ) : (
        <ul className="w-full max-w-xl mx-auto p-0 list-none" role="list">
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
      )}
    </div>
  );
};

export default TaskList;