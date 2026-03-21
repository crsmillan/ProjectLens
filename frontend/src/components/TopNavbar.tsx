import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { useProjectStore } from '../store/useProjectStore';

const TopNavbar = () => {
  const { isSidebarCollapsed } = useProjectStore();

  return (
    <header className={`fixed top-0 right-0 left-0 z-40 h-16 bg-white/80 backdrop-blur-xl flex justify-between items-center px-8 shadow-ambient transition-all duration-300 ease-in-out ${
      isSidebarCollapsed ? 'md:left-20' : 'md:left-64'
    }`}>
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl" size={18} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full bg-surface-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary focus:bg-surface-lowest transition-all outline-none"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 text-outline hover:bg-surface-low rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 text-outline hover:bg-surface-low rounded-full transition-colors">
          <Settings size={20} />
        </button>
        <div className="h-8 w-[1px] bg-outline-variant/30 mx-2"></div>
        <div className="flex items-center gap-3 pl-2">
          <div className="w-8 h-8 rounded-full bg-surface-highest overflow-hidden border-2 border-white shadow-sm">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
              alt="User profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
