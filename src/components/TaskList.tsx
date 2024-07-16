import React from 'react';
import './TaskList.css';
import { Task } from '../lib/types';

interface TaskListProps {
  tasks: Task[],
  removeTask: (id: string) => void,
  toggleCompletion: (task: Task) => void,
}

function TaskList({ tasks, removeTask, toggleCompletion}: TaskListProps) {
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
            <div className="content" onClick={() => toggleCompletion(task)}>
              { task.completed ? 
                <span className="status-completed">&#x2611;</span>
                :
                <span className="status-waiting">&#x2610;</span>
              }

              <span className={task.completed ? 'completed' : ''}>{task.description}</span>
            <button onClick={(e) => { e.stopPropagation(); removeTask(task.id); } }>Delete</button>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
