import React from 'react';
import { Project } from '../types';

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
  return (
    <div className="flex flex-col gap-2 mb-10">
      <div className="flex items-center gap-4">
        <div className="h-12 w-1.5 bg-primary rounded-full" />
        <h1 className="text-4xl font-bold text-on-surface">
          {project.name}
        </h1>
      </div>
      {project.description && (
        <p className="text-outline text-lg ml-6 font-light italic">
          {project.description}
        </p>
      )}
    </div>
  );
};

export default ProjectHeader;
