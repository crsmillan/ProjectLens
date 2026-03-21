import React from 'react';
import { Project, ProjectMetrics } from '../types';
import { ChevronRight, MoreHorizontal, Clock, CheckCircle2 } from 'lucide-react';

interface ProjectListRowProps {
  project: Project;
  metrics?: ProjectMetrics;
}

const ProjectListRow: React.FC<ProjectListRowProps> = ({ project, metrics }) => {
  const progress = metrics?.progress || 0;
  const isCompleted = progress === 100;

  return (
    <div className="group bg-surface-lowest hover:bg-white rounded-2xl shadow-ambient border border-outline-variant/5 p-6 transition-all duration-300 flex items-center gap-8 cursor-pointer relative overflow-hidden">
      {/* Decorative accent on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
      
      {/* Status Icon */}
      <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
        isCompleted ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
      }`}>
        {isCompleted ? <CheckCircle2 size={24} /> : <Clock size={24} />}
      </div>

      {/* Main Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors truncate">
            {project.name}
          </h3>
          <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-md ${
            isCompleted ? 'bg-secondary/10 text-secondary' : 'bg-surface-high text-outline'
          }`}>
            {isCompleted ? 'Archived' : 'In Curation'}
          </span>
        </div>
        <p className="text-outline text-sm line-clamp-1 font-body">
          {project.description || 'No specialized description provided for this curation.'}
        </p>
      </div>

      {/* Progress & Stats */}
      <div className="hidden md:flex flex-col items-end gap-2 min-w-[120px]">
        <div className="flex justify-between w-full text-[10px] font-bold text-outline uppercase tracking-tighter">
          <span>Progress</span>
          <span className="text-on-surface">{progress.toFixed(0)}%</span>
        </div>
        <div className="w-full h-1.5 bg-surface-high rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Team */}
      <div className="hidden lg:flex -space-x-2 shrink-0">
        {[1, 2].map((i) => (
          <div key={i} className="w-8 h-8 rounded-full border-2 border-surface-lowest bg-surface-high overflow-hidden">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Staff${i + (project.name.length)}`} alt="Staff" />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1">
        <button className="text-outline/40 hover:text-primary p-2 rounded-lg hover:bg-primary/5 transition-all">
          <MoreHorizontal size={18} />
        </button>
        <ChevronRight size={20} className="text-outline/20 group-hover:text-primary" />
      </div>
    </div>
  );
};

export default ProjectListRow;
