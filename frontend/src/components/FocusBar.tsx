import React from 'react';
import { Target, Zap } from 'lucide-react';

const FocusBar = () => {
  return (
    <div className="mt-24 mb-12 bg-white/40 backdrop-blur-md rounded-[1.5rem] p-1 border border-white/50 shadow-ambient animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
      <div className="bg-white rounded-[1.25rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
            <Zap size={24} fill="currentColor" />
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-headline font-bold text-lg">ProjectLens Focus</h4>
            <p className="text-xs text-outline">
              You are currently viewing <span className="text-primary font-bold">your project dashboard</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-6 py-2.5 rounded-full bg-surface-low text-sm font-bold hover:bg-surface-high transition-colors">
            View Analytics
          </button>
          <button className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
            Quick Action
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusBar;
