import React from 'react';
import './TaskList.css';
import { Task } from '../lib/types';

interface TaskListProps {
  tasks: Task[],
  removeTask: (id: string) => void,
}

function TaskList({ tasks, removeTask}: TaskListProps) {
  return (
    <div className="TaskList">
      <ul>
        { (!tasks || tasks.length === 0)  &&
          <p>
            Task list empty.
          </p>
        }
        { tasks && tasks.map(task => (
          <li key={task.id}>
            {task.description} <button onClick={() => removeTask(task.id) }>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
