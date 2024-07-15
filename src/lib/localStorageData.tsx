import { Task } from '../lib/types';

// Comments on this storage method: 
// - Intended as an example of making a standalone react app without any backend stuff. 
// - Storing the tasks in a single localStorage item is a bit nasty - but this is just for demonstration.
// - Would be nicer to use indexedDB anyhow.
// - LocalStorage and indexedDB are not as persistent or secure as I'd like. For real app could use for example user's Google Drive etc. for storing the tasks JSON as a file, unless building a whole backend layer etc. which would involve a lot more consideration for authentication etc.

const getStoredTasks = () : Task[] => {
    const storedTasksJSON = localStorage.getItem('tasks');

    if (!storedTasksJSON) return [];
    
    return JSON.parse(storedTasksJSON);
}

const storeTasks = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const listTasks = () : Task[] => {
    let tasks = getStoredTasks();
    if (!tasks) tasks = [];

    return tasks;
}

const addTask = (task: Task) : void => {
    let tasks = getStoredTasks();
    if (!tasks) tasks = [];

    tasks.push(task);
    storeTasks(tasks);
}

const deleteTask = (id: string) : void => {
    let tasks = getStoredTasks();
    if (!tasks) return;

    const index = tasks.findIndex(task => task.id === id);

    if (!id) throw new Error(`Task id ${id} not found.`);

    tasks.splice(index, 1);
    storeTasks(tasks);
}

export { listTasks, addTask, deleteTask }; 