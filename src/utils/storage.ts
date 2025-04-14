import localforage from "localforage";
import { Task } from "../types/task";

const TASKS_KEY = "tasks";

// Initialize a localforage instance named 'todo-app'
const storage = localforage.createInstance({
  name: "todo-app",
});

// Helper to parse tasks and restore Date objects
function parseTasks(raw: any): Task[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((t) => ({
    ...t,
    createdAt: t.createdAt ? new Date(t.createdAt) : new Date(),
  }));
}

// Get all tasks
export async function getTasks(): Promise<Task[]> {
  try {
    const data = await storage.getItem<Task[]>(TASKS_KEY);
    return parseTasks(data);
  } catch (err) {
    return [];
  }
}

// Save all tasks
export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await storage.setItem(TASKS_KEY, tasks);
  } catch (err) {
    // Fail silently
  }
}

// Add a new task
export async function addTask(task: Task): Promise<void> {
  try {
    const tasks = await getTasks();
    tasks.push(task);
    await saveTasks(tasks);
  } catch (err) {
    // Fail silently
  }
}

// Update a task by ID
export async function updateTask(updatedTask: Task): Promise<void> {
  try {
    const tasks = await getTasks();
    const idx = tasks.findIndex((t) => t.id === updatedTask.id);
    if (idx !== -1) {
      tasks[idx] = updatedTask;
      await saveTasks(tasks);
    }
  } catch (err) {
    // Fail silently
  }
}

// Delete a task by ID
export async function deleteTask(id: string): Promise<void> {
  try {
    const tasks = await getTasks();
    const filtered = tasks.filter((t) => t.id !== id);
    await saveTasks(filtered);
  } catch (err) {
    // Fail silently
  }
}