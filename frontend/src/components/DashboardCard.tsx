import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  color?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  description,
  color = 'text-primary'
}) => {
  return (
    <div className="bg-surface-card rounded-card p-6 shadow-ambient flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-full bg-background ${color}`}>
          <Icon size={24} />
        </div>
      </div>
      <div>
        <h3 className="text-outline text-sm font-medium uppercase tracking-wider">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-on-surface">{value}</span>
        </div>
        {description && (
          <p className="text-outline text-xs mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
