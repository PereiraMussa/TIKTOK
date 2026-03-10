import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Search, Plus, MessageSquare, User } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Discover', path: '/explore' },
    { icon: Plus, label: '', path: '/upload', isSpecial: true },
    { icon: MessageSquare, label: 'Inbox', path: '/messages' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="flex h-[100dvh] w-full bg-zinc-950 justify-center items-center overflow-hidden font-sans">
      {/* Mobile App Frame (Constrained on Desktop, Full on Mobile) */}
      <div className="w-full max-w-[400px] h-full bg-black relative flex flex-col shadow-2xl sm:h-[850px] sm:rounded-[40px] sm:border-[8px] sm:border-zinc-800 overflow-hidden">
        
        {/* Main Content Area */}
        <main className="flex-1 relative overflow-hidden bg-black">
          <Outlet />
        </main>

        {/* Authentic Bottom Navigation */}
        <nav className="h-[60px] bg-black text-white flex justify-around items-center px-2 z-50 border-t border-zinc-900 pb-safe">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            if (item.isSpecial) {
              return (
                <Link key={item.path} to={item.path} className="flex items-center justify-center mt-1">
                  <div className="h-8 w-12 bg-white text-black rounded-xl flex items-center justify-center relative active:scale-95 transition-transform">
                    <div className="absolute -left-1 w-4 h-8 bg-cyan-400 rounded-l-xl -z-10"></div>
                    <div className="absolute -right-1 w-4 h-8 bg-pink-500 rounded-r-xl -z-10"></div>
                    <item.icon className="w-5 h-5 font-bold" />
                  </div>
                </Link>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center transition-opacity active:scale-95",
                  isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                )}
              >
                <item.icon className={cn("w-6 h-6", isActive && "fill-current")} />
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
