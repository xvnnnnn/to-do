import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, addTask, updateTask, deleteTask } from "./utils/storage";
import { Task } from "./types/task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Load tasks on mount
  useEffect(() => {
    const loadTasks = async () => {
      const loadedTasks = await getTasks();
      setTasks(loadedTasks);
    };
    loadTasks();
  }, []);

  // Unified submit handler for TaskForm
  const handleSubmit = (data: Task | { title: string }) => {
    if ("id" in data) {
      // Edit mode
      void (async () => {
        console.log("Editing task:", data);
        await updateTask(data as Task);
        const updatedTasks = await getTasks();
        setTasks(updatedTasks);
        setEditingTask(null);
      })();
    } else {
      // Add mode
      void (async () => {
        const newTask: Task = {
          ...(data as { title: string }),
          id: uuidv4(),
          completed: false,
          createdAt: new Date(),
        };
        console.log("Adding new task:", newTask);
        await addTask(newTask);
        const updatedTasks = await getTasks();
        setTasks(updatedTasks);
      })();
    }
  };

  // Toggle completion status
  const handleToggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const toggledTask = { ...task, completed: !task.completed };
    if (!task.completed) {
      console.log("Completing task:", { id: task.id, title: task.title });
    } else {
      console.log("Uncompleting task:", { id: task.id, title: task.title });
    }
    await updateTask(toggledTask);
    const updatedTasks = await getTasks();
    setTasks(updatedTasks);
  };

  // Delete a task
  const handleDeleteTask = async (id: string) => {
    console.log("Deleting task with id:", id);
    await deleteTask(id);
    const updatedTasks = await getTasks();
    setTasks(updatedTasks);
  };

  // Set task for editing
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 mt-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">To-Do App</h1>
        <TaskForm
          onSubmit={handleSubmit}
          task={editingTask}
        />
        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
}

export default App;
