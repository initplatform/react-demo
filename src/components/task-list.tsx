// src/components/TaskList.tsx
import React from 'react';
import TaskItem from '@/components/task-item';
import { Task } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleTaskCompletion, deleteTask }) => {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-lg">
        <h1 className="text-xl font-bold mb-4">Tasks</h1>
        <ul className="space-y-3">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      </div>
    );
  };
  
export default TaskList;
