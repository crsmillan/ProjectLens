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
      className={`group flex items-center justify-between p-5 rounded-2xl transition-all duration-500 ease-out
        ${isCompleted 
          ? 'bg-surface-low/50 opacity-60 grayscale' 
          : 'bg-white shadow-ambient hover:shadow-elevation border border-outline-variant/5 hover:border-primary/20 hover:-translate-y-0.5'}`}
    >
      <div className="flex items-center gap-5">
        <button 
          onClick={() => onComplete(task._id)}
          className={`transition-all duration-300 transform hover:scale-110 active:scale-95 ${
            isCompleted ? 'text-primary' : 'text-outline group-hover:text-primary'
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 size={24} className="stroke-[2.5px]" />
          ) : (
            <Circle size={24} className="stroke-[2px]" />
          )}
        </button>
        <span className={`text-base font-body transition-all duration-300 ${
          isCompleted ? 'line-through text-outline' : 'text-on-surface font-semibold'
        }`}>
          {task.name}
        </span>
      </div>
      
      {!isCompleted && (
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 px-3 py-1 bg-primary/5 rounded-lg tracking-widest uppercase">
            Mark as Done
          </span>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
