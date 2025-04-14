# To-Do App

A simple, modern to-do list application built with React, TypeScript, Vite, and Tailwind CSS. Tasks are stored locally in the browser using localforage, providing offline support and persistent data across sessions.

## Features

- Add, edit, complete, and delete tasks
- Tasks are persisted locally in the browser (offline support)
- Responsive and clean UI styled with Tailwind CSS
- Built with React functional components and TypeScript for type safety

## Tech Stack

- [React](https://react.dev/) (with Hooks)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (development/build tooling)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS framework)
- [localforage](https://localforage.github.io/localForage/) (async local storage)
- ESLint (with recommended and type-checked rules)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

```powershell
npm install
```

### Development

Start the development server with hot module replacement:

```powershell
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

To build the app for production:

```powershell
npm run build
```

The output will be in the `dist/` directory.

### Lint

To run ESLint:

```powershell
npm run lint
```

## Usage

- Add a new task using the input form.
- Click a task to toggle its completion status.
- Edit or delete tasks using the corresponding buttons.
- All tasks are saved in your browser and will persist across reloads.

## Data Model

Each task is represented by the following TypeScript interface:

```ts
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}
```

## Project Structure

```
src/
  components/      # TaskForm, TaskItem, TaskList components
  styles/          # Tailwind/global CSS
  types/           # Task type definition
  utils/           # Storage utilities (localforage)
  App.tsx          # Main app component
  main.tsx         # Entry point
public/            # Static assets
```

## License

MIT
