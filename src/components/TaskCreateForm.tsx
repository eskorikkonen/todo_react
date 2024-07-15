import React, { useState } from 'react';
import './TaskCreateForm.css'
import { Task } from '../lib/types';

interface TaskCreateFormProps {
    createNewTask: (task: Task) => void,
}

function TaskCreateForm({ createNewTask }: TaskCreateFormProps) {
    const [description, setDescription] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createNewTask({
            id: crypto.randomUUID(),
            description,
        })
    }

    return (
        <form className="TaskCreateForm" onSubmit={handleSubmit}>
            <label htmlFor="task-description">New task: </label>
            <input
                id="task-description"
                type="text"
                placeholder='Enter task description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input type="submit" value="Create" />
        </form>
    );
}

export default TaskCreateForm;
