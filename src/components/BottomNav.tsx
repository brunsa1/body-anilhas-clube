import { Link, useLocation } from 'react-router-dom';
import { Home, History, Gift, Ticket, Users } from 'lucide-react';

const navItems = [
  { path: '/home', icon: Home, label: 'Início' },
  { path: '/historico', icon: History, label: 'Histórico' },
  { path: '/resgatar', icon: Gift, label: 'Resgatar' },
  { path: '/meus-cupons', icon: Ticket, label: 'Cupons' },
  { path: '/indicar', icon: Users, label: 'Indicar' },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon
                size={22}
                className={`mb-0.5 transition-transform duration-200 ${
                  isActive ? 'scale-110' : ''
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
