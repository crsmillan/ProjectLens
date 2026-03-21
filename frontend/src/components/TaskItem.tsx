import React from 'react';
import { Task, TaskStatus } from '../types';
import { CheckCircle2, Circle } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete }) => {
  const isCompleted = task.status === TaskStatus.COMPLETED;

  return (
    <div 
      className={`group flex items-center justify-between p-4 rounded-xl transition-all duration-200 
        ${isCompleted ? 'bg-background/50 opacity-60' : 'bg-surface-card hover:bg-primary-container/10 shadow-sm hover:shadow-md'}`}
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={() => !isCompleted && onComplete(task._id)}
          disabled={isCompleted}
          className={`transition-colors ${isCompleted ? 'text-primary' : 'text-outline group-hover:text-primary'}`}
        >
          {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </button>
        <span className={`text-lg transition-all ${isCompleted ? 'line-through text-outline' : 'text-on-surface font-medium'}`}>
          {task.name}
        </span>
      </div>
      {!isCompleted && (
        <span className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 bg-primary/10 rounded-full">
          COMPLETE
        </span>
      )}
    </div>
  );
};

export default TaskItem;
