// src/components/TaskItem.tsx
import React from 'react';
import { Task } from '@/types/task';

interface TaskItemProps {
  task: Task;
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTaskCompletion, deleteTask }) => {
    return (
      <li className="flex justify-between items-center p-4 bg-white border rounded-md shadow hover:shadow-lg transition-shadow">
        <span
          className={`cursor-pointer ${
            task.completed ? 'line-through text-gray-400' : ''
          }`}
          onClick={() => toggleTaskCompletion(task.id)}
        >
          {task.text}
        </span>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-md text-white ${
              task.completed ? 'bg-gray-500' : 'bg-green-500'
            } hover:opacity-80`}
            onClick={() => toggleTaskCompletion(task.id)}
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button
            className="px-3 py-1 rounded-md bg-red-500 text-white hover:opacity-80"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      </li>
    );
  };
  
export default TaskItem;
