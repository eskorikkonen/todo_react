import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskCreateForm from './components/TaskCreateForm';
import { listTasks, addTask, deleteTask } from './lib/localStorageData';
import { Task } from './lib/types';

function App() {
  let [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    setTasks(listTasks());
  }, []);
  
  const removeTask = (id: string) => {
    deleteTask(id);
    setTasks([...listTasks()]);
  }

  const createNewTask = (task: Task) => {
    addTask(task);
    setTasks([...listTasks()]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Taskmaster </h1>
        <p>(not affiliated with Taskmaster TV-series)</p>
      </header>
      <main>
        <TaskCreateForm createNewTask={createNewTask}/>
        <TaskList tasks={tasks} removeTask={removeTask} />
      </main>
    </div>
  );
}

export default App;
