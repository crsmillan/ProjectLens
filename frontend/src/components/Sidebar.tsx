import React from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  BarChart3, 
  Archive, 
  Plus, 
  HelpCircle, 
  LogOut,
  Target,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProjectStore } from '../store/useProjectStore';

const Sidebar = () => {
  const { isSidebarCollapsed, toggleSidebar } = useProjectStore();
  const pathname = usePathname();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: FolderOpen, label: 'Projects', href: '/projects' },
    { icon: Users, label: 'Team', href: '#' },
    { icon: BarChart3, label: 'Analytics', href: '#' },
    { icon: Archive, label: 'Archive', href: '#' },
  ];

  return (
    <aside className={`h-full fixed left-0 top-0 z-50 bg-surface-low flex flex-col p-6 gap-4 font-headline text-sm font-semibold border-r border-outline-variant/10 hidden md:flex transition-all duration-300 ease-in-out ${
      isSidebarCollapsed ? 'w-20' : 'w-64'
    }`}>
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-primary text-white p-1 rounded-full shadow-lg hover:scale-110 transition-transform z-[60]"
      >
        {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className={`flex items-center gap-3 mb-8 transition-opacity duration-300 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
          <Target size={24} />
        </div>
        {!isSidebarCollapsed && (
          <div className="animate-in fade-in duration-300">
            <h1 className="text-xl font-black text-on-surface leading-tight font-headline">ProjectLens</h1>
            <p className="text-[10px] text-outline uppercase tracking-widest font-headline">Editorial PM</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out ${
                isActive 
                  ? 'text-primary bg-white shadow-sm' 
                  : 'text-outline hover:text-on-surface hover:bg-white/50'
              } ${isSidebarCollapsed ? 'justify-center px-2' : ''}`}
              title={isSidebarCollapsed ? item.label : undefined}
            >
              <item.icon size={20} className="shrink-0" />
              {!isSidebarCollapsed && <span className="animate-in fade-in duration-300">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1">
        <Link href="#" className={`flex items-center gap-3 px-4 py-3 text-outline hover:text-on-surface rounded-xl transition-colors ${isSidebarCollapsed ? 'justify-center px-1' : ''}`}>
          <HelpCircle size={20} />
          {!isSidebarCollapsed && <span className="animate-in fade-in duration-300">Help</span>}
        </Link>
        <Link href="#" className={`flex items-center gap-3 px-4 py-3 text-outline hover:text-on-surface rounded-xl transition-colors ${isSidebarCollapsed ? 'justify-center px-1' : ''}`}>
          <LogOut size={20} />
          {!isSidebarCollapsed && <span className="animate-in fade-in duration-300">Logout</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
