import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { BottomNav } from './BottomNav';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoBody from '@/assets/logo-body.webp';

interface AppLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  headerTitle?: string;
  showNav?: boolean;
}

export const AppLayout = ({
  children,
  showHeader = true,
  headerTitle,
  showNav = true,
}: AppLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {showHeader && (
        <header className="header-gradient sticky top-0 z-40">
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoBody} alt="Body Suplementos" className="h-10 w-auto" />
              {headerTitle && (
                <h1 className="font-display font-bold text-lg">{headerTitle}</h1>
              )}
            </div>
            {user && (
              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
                aria-label="Sair"
              >
                <LogOut size={20} />
              </button>
            )}
          </div>
        </header>
      )}
      <main className={`max-w-lg mx-auto ${showNav ? 'pb-20' : ''}`}>{children}</main>
      {showNav && <BottomNav />}
    </div>
  );
};
