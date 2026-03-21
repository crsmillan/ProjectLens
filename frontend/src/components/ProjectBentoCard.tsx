import React from 'react';
import { Project, ProjectMetrics } from '../types';
import { MoreHorizontal } from 'lucide-react';

interface ProjectBentoCardProps {
  project: Project;
  metrics?: ProjectMetrics;
  isLarge?: boolean;
}

const ProjectBentoCard: React.FC<ProjectBentoCardProps> = ({ project, metrics, isLarge = false }) => {
  const progress = metrics?.progress || 0;

  return (
    <div className={`${isLarge ? 'lg:col-span-2' : ''} bg-surface-lowest shadow-ambient rounded-xl p-8 group hover:bg-white transition-all border border-transparent hover:border-primary/5 flex flex-col`}>
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-3">
          <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-tighter">
            {progress > 80 ? 'Near Completion' : 'In Progress'}
          </span>
          {isLarge && (
            <span className="px-3 py-1 bg-surface-high text-on-surface-variant text-[10px] font-bold rounded-full uppercase tracking-tighter">
              Active Project
            </span>
          )}
        </div>
        <button className="text-outline hover:text-primary transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <h3 className={`${isLarge ? 'text-2xl' : 'text-lg'} font-headline font-bold mb-3 group-hover:text-primary transition-colors`}>
        {project.name}
      </h3>
      
      {project.description && (
        <p className="text-outline text-sm mb-10 max-w-lg leading-relaxed line-clamp-2">
          {project.description}
        </p>
      )}

      <div className="mt-auto">
        <div className="flex justify-between items-end mb-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-surface-highest overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`} alt="Team member" />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-highest flex items-center justify-center text-[10px] font-bold text-outline">
              +2
            </div>
          </div>
          <span className="text-primary font-bold text-sm">{progress.toFixed(0)}% Complete</span>
        </div>
        <div className="w-full h-1.5 bg-surface-highest rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectBentoCard;
