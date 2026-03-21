'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Layout, Settings, Users, BarChart, Plus, Loader2, Sparkles } from 'lucide-react';
import Sidebar from '../../../components/Sidebar';
import TopNavbar from '../../../components/TopNavbar';
import TaskItem from '../../../components/TaskItem';
import { useProjectStore } from '../../../store/useProjectStore';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { 
    currentProject, 
    currentTasks, 
    currentMetrics, 
    loading, 
    fetchProjectData, 
    createTask, 
    completeTask,
    isSidebarCollapsed 
  } = useProjectStore();

  const [newTaskName, setNewTaskName] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('Backlog');

  React.useEffect(() => {
    if (id) {
      fetchProjectData(id as string);
    }
  }, [id, fetchProjectData]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskName.trim() && id) {
      await createTask(id as string, newTaskName);
      setNewTaskName('');
    }
  };

  if (loading && !currentProject) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface flex font-body">
      <Sidebar />
      <main className={`flex-1 relative min-h-screen transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}>
        <TopNavbar />

        <div className="pt-24 px-8 pb-12 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10 animate-in fade-in slide-in-from-left-4 duration-500">
            <button
              onClick={() => router.push('/projects')}
              className="flex items-center gap-2 text-outline hover:text-primary transition-colors mb-6 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Back to Projects</span>
            </button>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-primary/10 text-primary text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest">
                    Project Board
                  </span>
                  <span className="text-outline/40 text-[10px] font-bold uppercase tracking-widest">
                    PRJ-{id?.toString().slice(-4).toUpperCase()}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-headline font-black text-on-surface tracking-tighter mb-2">
                  {currentProject?.name}
                </h1>
                <p className="text-outline font-medium leading-relaxed">
                  {currentProject?.description || 'Active software delivery stream for the ProjectLens ecosystem.'}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block mr-4">
                  <div className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">Health</div>
                  <div className="text-xl font-headline font-black text-primary">
                    {Math.round(currentMetrics?.progress || 0)}%
                  </div>
                </div>
                <button className="p-3 bg-surface-low rounded-2xl text-outline hover:text-primary transition-all shadow-sm hover:shadow-md">
                  <Settings size={20} />
                </button>
                <button className="bg-primary text-white px-7 py-3.5 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
                  <Users size={18} />
                  Assemble Team
                </button>
              </div>
            </div>
          </div>

          {/* Project Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            {[
              { label: 'Total Issues', value: currentMetrics?.totalTasks || 0 },
              { label: 'Completed', value: currentMetrics?.completedTasks || 0 },
              { label: 'Velocity', value: '4.2 pts/d' },
              { label: 'Sprint', value: 'SP-24' },
            ].map((stat, i) => (
              <div key={i} className="bg-white shadow-ambient border border-outline-variant/5 p-4 rounded-2xl hover:shadow-elevation transition-all duration-300">
                <div className="text-[9px] font-black text-outline uppercase tracking-[0.2em] mb-1">{stat.label}</div>
                <div className="text-xl font-headline font-bold text-on-surface">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-8 border-b border-outline-variant/10 mb-8 animate-in fade-in duration-500 delay-200">
            {[
              { icon: Layout, label: 'Backlog' },
              { icon: Sparkles, label: 'Active Sprint' },
              { icon: Users, label: 'Resources' },
              { icon: BarChart, label: 'Analytics' },
            ].map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`flex items-center gap-2 pb-4 border-b-2 transition-all font-bold text-sm tracking-tight ${activeTab === tab.label ? 'border-primary text-on-surface' : 'border-transparent text-outline hover:text-on-surface'
                  }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            {activeTab === 'Backlog' ? (
              <div className="flex flex-col gap-8">
                {/* Active Column */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-black text-on-surface uppercase tracking-[0.2em]">Open Issues</h3>
                    <span className="bg-surface-low px-2 py-0.5 rounded-md text-[10px] font-black text-outline">
                      {currentTasks.filter(t => t.status !== 'COMPLETED').length}
                    </span>
                  </div>

                  <form onSubmit={handleAddTask} className="mb-6 group">
                    <div className="relative">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary">
                        <Plus size={20} />
                      </div>
                      <input
                        type="text"
                        placeholder="Create a new issue... (Press Enter)"
                        className="w-full bg-white px-14 py-5 rounded-2xl shadow-ambient border border-outline-variant/5 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body font-medium"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                      />
                    </div>
                  </form>

                  <div className="flex flex-col gap-3">
                    {currentTasks.filter(t => t.status !== 'COMPLETED').map((task) => (
                      <TaskItem 
                        key={task._id} 
                        task={task} 
                        onComplete={completeTask} 
                      />
                    ))}
                  </div>
                </div>

                {/* Completed Column */}
                {currentTasks.some(t => t.status === 'COMPLETED') && (
                  <div>
                    <h3 className="text-xs font-black text-outline uppercase tracking-[0.2em] mb-6">Recently Resolved</h3>
                    <div className="flex flex-col gap-3">
                      {currentTasks.filter(t => t.status === 'COMPLETED').map((task) => (
                        <TaskItem 
                          key={task._id} 
                          task={task} 
                          onComplete={completeTask} 
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-surface-lowest rounded-3xl border border-dashed border-outline-variant/20 py-32 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                  <Sparkles size={28} className="text-primary/40" />
                </div>
                <h2 className="text-xl font-headline font-black text-on-surface mb-2">View not yet configured.</h2>
                <p className="text-outline max-w-sm mb-4 italic text-sm">
                  We are finalizing the architectural layout for the {activeTab} view.
                </p>
                <button 
                  onClick={() => setActiveTab('Backlog')}
                  className="text-xs font-black text-primary uppercase tracking-widest hover:underline"
                >
                  Return to Backlog
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
