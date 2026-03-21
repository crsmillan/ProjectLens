'use client';

import { useEffect, useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import ProjectListRow from '../components/ProjectListRow';
import {
  Plus,
  Rocket,
  Loader2,
  PlusCircle,
  FolderOpen, // Added
  LayoutDashboard // Added
} from 'lucide-react';

export default function Home() {
  const {
    projects,
    loading,
    fetchProjects,
    isSidebarCollapsed
  } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="min-h-screen bg-background text-on-surface flex font-body">
      <Sidebar />
      <main className={`flex-1 relative min-h-screen transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}>
        <TopNavbar />

        <div className="pt-24 px-8 pb-12 max-w-7xl mx-auto">
          {/* Dashboard Hub Header */}
          <section className="mb-12">
            <div className="animate-in fade-in slide-in-from-left-4 duration-500 max-w-2xl mb-12">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-[1px] w-8 bg-primary/30"></span>
                <span className="text-primary font-headline font-bold tracking-widest uppercase text-[10px]">
                  Curation Overview
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-headline font-extrabold text-on-surface tracking-tighter leading-[0.95]">
                Dashboard <br />Hub.
              </h2>
            </div>

            {/* Stats Grid - Jira Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-surface-lowest shadow-ambient rounded-2xl p-6 group hover:bg-white transition-all border border-outline-variant/5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <FolderOpen size={20} />
                </div>
                <p className="text-xs text-outline font-bold uppercase tracking-widest mb-1">Total Projects</p>
                <p className="text-3xl font-black text-on-surface">{projects.length}</p>
              </div>

              <div className="bg-surface-lowest shadow-ambient rounded-2xl p-6 group hover:bg-white transition-all border border-outline-variant/5">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4">
                  <Rocket size={20} />
                </div>
                <p className="text-xs text-outline font-bold uppercase tracking-widest mb-1">Active Tasks</p>
                <p className="text-3xl font-black text-on-surface">24</p>
              </div>

              <div className="bg-surface-lowest shadow-ambient rounded-2xl p-6 group hover:bg-white transition-all border border-outline-variant/5">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                  <PlusCircle size={20} />
                </div>
                <p className="text-xs text-outline font-bold uppercase tracking-widest mb-1">Completed</p>
                <p className="text-3xl font-black text-on-surface">12</p>
              </div>

              <div className="bg-surface-lowest shadow-ambient rounded-2xl p-6 group hover:bg-white transition-all border border-outline-variant/5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                  <LayoutDashboard size={20} />
                </div>
                <p className="text-xs text-outline font-bold uppercase tracking-widest mb-1">Efficiency</p>
                <p className="text-3xl font-black text-on-surface">94%</p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Project Pulse */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-headline font-bold text-on-surface">Project Pulse</h3>
                <button className="text-xs font-bold text-primary hover:underline">View All Projects</button>
              </div>

              <div className="space-y-4">
                {projects.slice(0, 3).map((project) => (
                  <div key={project._id} className="bg-surface-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/5 flex items-center gap-4 group hover:shadow-md transition-all">
                    <div className="w-2 h-12 bg-primary/20 rounded-full overflow-hidden shrink-0">
                      <div className="bg-primary w-full transition-all duration-700" style={{ height: `${(project.name.length * 7.5) % 100}%` }}></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">{project.name}</h4>
                      <p className="text-xs text-outline line-clamp-1">{project.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-on-surface">{((project.name.length * 7.5) % 100).toFixed(0)}%</p>
                      <p className="text-[10px] text-outline font-bold uppercase">Progress</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Key Activity */}
            <div className="space-y-6">
              <h3 className="text-xl font-headline font-bold text-on-surface">Activity</h3>
              <div className="bg-surface-lowest rounded-2xl shadow-sm border border-outline-variant/5 overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-4 border-b border-outline-variant/5 last:border-0 flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-high flex items-center justify-center shrink-0">
                      <Plus size={14} className="text-outline" />
                    </div>
                    <div>
                      <p className="text-xs text-on-surface"><span className="font-bold">Staff member</span> updated <span className="text-primary font-bold">Metadata</span></p>
                      <p className="text-[10px] text-outline">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


      </main>
    </div>
  );
}
