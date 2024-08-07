import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskCreateForm from './components/TaskCreateForm';
import { initDB, listTasks, upsertTask, deleteTask } from './lib/indexedDBData';
import { Task } from './lib/types';

function App() {
  let [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const initializeData = async () => {
      await initDB().then(successful => {
        if (successful) {
          listTasks().then(tasks => setTasks([...tasks]));
        } else {
          console.error('Unable to initialize indexedDB')
        }
      });
    }

    initializeData().catch(console.error);
  }, []);

  const removeTask = (id: string) => {
    deleteTask(id)
      .then(() => refreshTasks())
      .catch(console.error);
  }

  const toggleCompletion = (task: Task) => {
    upsertTask({ ...task, completed: !task.completed })
        .then(() => refreshTasks());
  }

  const createNewTask = (task: Task): Promise<boolean> => {
    return new Promise((resolve) => {
      upsertTask(task)
        .then(() => refreshTasks().then(() => resolve(true)))
        .catch(error => {
          console.error(error);
          resolve(false);
        })
    });
  }

  const refreshTasks = () => listTasks().then(tasks => setTasks([...tasks])).catch(console.error);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Taskmaster</h1>
        <p>(Not affiliated with the Taskmaster TV-series.)</p>
      </header>
      <main>
        <TaskCreateForm createNewTask={createNewTask} />
        <TaskList tasks={tasks} removeTask={removeTask} toggleCompletion={toggleCompletion} />
      </main>
    </div>
  );
}

export default App;
