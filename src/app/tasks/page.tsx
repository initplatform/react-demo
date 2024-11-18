'use client';

import React, { useState, useEffect } from 'react';
import TaskList from '@/components/task-list';
import TaskForm from '@/components/task-form';
import { Task } from '@/types/task';
import { Filter } from '@/types/filter';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'all'
      ? true
      : filter === 'completed'
      ? task.completed
      : !task.completed
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Task Manager 5000
        </h1>
        <TaskForm addTask={addTask} />
        <div className="mb-4 flex justify-center gap-4">
          <button
            className={`px-4 py-2 text-sm rounded-lg ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-lg ${
              filter === 'completed'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-lg ${
              filter === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
        </div>
        <TaskList
          tasks={filteredTasks}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default TasksPage;
