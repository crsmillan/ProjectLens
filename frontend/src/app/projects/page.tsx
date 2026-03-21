'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Rocket,
  Loader2,
  PlusCircle
} from 'lucide-react';
import { useProjectStore } from '../../store/useProjectStore';
import Sidebar from '../../components/Sidebar';
import TopNavbar from '../../components/TopNavbar';
import ProjectListRow from '../../components/ProjectListRow';

import { useRouter } from 'next/navigation';

export default function ProjectsPage() {
  const {
    projects,
    loading,
    fetchProjects,
    createProject,
    isSidebarCollapsed
  } = useProjectStore();

  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All Projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newProjectName.trim()) {
      await createProject(newProjectName);
      setNewProjectName('');
      setIsModalOpen(false);
    }
  };

  const filteredProjects = projects.filter(project => {
    if (activeTab === 'All Projects') return true;
    if (activeTab === 'Active') return project.status === 'ACTIVE';
    if (activeTab === 'Archived') return project.status === 'ARCHIVED';
    if (activeTab === 'Team Focus') return project.isTeamFocus;
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-on-surface flex font-body">
      <Sidebar />
      <main className={`flex-1 relative min-h-screen transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}>
        <TopNavbar />

        <div className="pt-24 px-8 pb-12 max-w-7xl mx-auto">
          {/* Projects Page Header */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
              <div className="animate-in fade-in slide-in-from-left-4 duration-500 max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-[1px] w-8 bg-primary/30"></span>
                  <span className="text-primary font-headline font-bold tracking-widest uppercase text-[10px]">
                    Project Management
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-headline font-extrabold text-on-surface tracking-tighter leading-[0.95]">
                  Active <br />Boards.
                </h2>
              </div>

              <div className="flex gap-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Plus size={18} />
                  Create Project
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-6 border-b border-outline-variant/10 pb-4">
              {['All Projects', 'Active', 'Archived', 'Team Focus'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-bold transition-all relative pb-4 -mb-[17px] ${activeTab === tab ? 'text-on-surface border-b-2 border-primary' : 'text-outline hover:text-on-surface'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </section>

          {/* Project List View */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {loading && projects.length === 0 ? (
              <div className="py-32 flex justify-center items-center">
                <Loader2 className="animate-spin text-primary" size={48} />
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredProjects.map((project) => (
                  <div key={project._id} onClick={() => router.push(`/projects/${project._id}`)}>
                    <ProjectListRow
                      project={project}
                      metrics={{
                        progress: (project.name.length * 7.5) % 100,
                        totalTasks: 8,
                        completedTasks: Math.floor((project.name.length * 7.5) % 100 / 12.5),
                        averageCompletionTimeMinutes: 0
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-40 flex flex-col items-center justify-center text-center">
                <Rocket className="text-outline/20 mb-6" size={64} />
                <p className="text-outline italic text-lg mb-8 max-w-md">
                  {activeTab === 'All Projects' ? 'No projects in your workspace yet.' : `No projects found for "${activeTab}" status.`}
                </p>
                {activeTab === 'All Projects' && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg"
                  >
                    Start First Project
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-on-surface/20 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10 animate-in zoom-in-95 duration-300">
              <h3 className="text-3xl font-headline font-black mb-2 text-on-surface">New Project Board</h3>
              <p className="text-outline mb-8">Set up a new workspace for your team.</p>

              <form onSubmit={handleCreateProject} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-outline tracking-widest">BOARD NAME</label>
                  <input
                    autoFocus
                    type="text"
                    placeholder="Enter board name..."
                    className="bg-surface-low px-6 py-3 rounded-xl border-none text-lg focus:ring-1 focus:ring-primary outline-none"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 text-outline font-bold hover:text-on-surface transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                  >
                    Create Board
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
