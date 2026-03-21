'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Layout, Settings, Users, BarChart } from 'lucide-react';
import Sidebar from '../../../components/Sidebar';
import TopNavbar from '../../../components/TopNavbar';
import { useProjectStore } from '../../../store/useProjectStore';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { projects, isSidebarCollapsed } = useProjectStore();

  const project = projects.find(p => p._id === id);

  return (
    <div className="min-h-screen bg-background text-on-surface flex font-body">
      <Sidebar />
      <main className={`flex-1 relative min-h-screen transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}>
        <TopNavbar />

        <div className="pt-24 px-8 pb-12 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-in fade-in slide-in-from-left-4 duration-500">
            <button
              onClick={() => router.push('/projects')}
              className="flex items-center gap-2 text-outline hover:text-primary transition-colors mb-6 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Back to Projects</span>
            </button>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-headline font-black text-on-surface tracking-tighter mb-2">
                  {project?.name || 'Project Board'}
                </h1>
                <p className="text-outline max-w-2xl">
                  {project?.description || 'Loading project specifications...'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="p-3 bg-surface-low rounded-xl text-outline hover:text-primary transition-colors">
                  <Settings size={20} />
                </button>
                <button className="bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                  Invite Team
                </button>
              </div>
            </div>
          </div>

          {/* Placeholder Tabs */}
          <div className="flex items-center gap-8 border-b border-outline-variant/10 mb-12">
            {[
              { icon: Layout, label: 'Backlog', active: true },
              { icon: Users, label: 'Team', active: false },
              { icon: BarChart, label: 'Reports', active: false },
            ].map((tab) => (
              <button
                key={tab.label}
                className={`flex items-center gap-2 pb-4 border-b-2 transition-all font-bold text-sm ${tab.active ? 'border-primary text-on-surface' : 'border-transparent text-outline hover:text-on-surface'
                  }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Empty State / Coming Soon */}
          <div className="bg-surface-lowest rounded-3xl border border-dashed border-outline-variant/20 py-32 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-700">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
              <Layout size={32} className="text-primary/40" />
            </div>
            <h2 className="text-2xl font-headline font-black text-on-surface mb-3">Project details are arriving soon.</h2>
            <p className="text-outline max-w-sm mb-8 italic">
              "We are finalizing the architectural layout with Stitch to bring you the best-in-class Agile board experience."
            </p>
            <div className="flex gap-4">
              <div className="h-2 w-24 bg-primary/20 rounded-full animate-pulse"></div>
              <div className="h-2 w-16 bg-primary/10 rounded-full animate-pulse delay-75"></div>
              <div className="h-2 w-20 bg-primary/5 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
