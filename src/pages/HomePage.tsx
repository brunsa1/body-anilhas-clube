import { useAuth } from '@/contexts/AuthContext';
import { AppLayout } from '@/components/AppLayout';
import { AnilhaBadge } from '@/components/AnilhaBadge';
import { Button } from '@/components/ui/button';
import { mockMovements, formatDate } from '@/lib/mockData';
import { Gift, Users, History, TrendingUp, TrendingDown, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  const recentMovements = mockMovements.slice(0, 3);

  return (
    <AppLayout headerTitle="Body Afiliados">
      <div className="p-4 space-y-5">
        {/* Welcome & Balance Card */}
        <div className="card-elevated relative overflow-hidden animate-slide-up">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full -ml-12 -mb-12" />
          
          <div className="relative">
            <p className="text-muted-foreground text-sm">Olá,</p>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              {user.name.split(' ')[0]}! 👋
            </h2>
            
            <div className="bg-secondary/50 rounded-xl p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-1">Seu saldo</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center animate-pulse-soft">
                  <Dumbbell className="text-accent" size={24} />
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-foreground">
                    {user.anilhasBalance.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-sm text-muted-foreground">anilhas</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link to="/resgatar">
                <Button variant="gradient" className="w-full" size="lg">
                  <Gift size={18} />
                  Resgatar
                </Button>
              </Link>
              <Link to="/indicar">
                <Button variant="outline" className="w-full" size="lg">
                  <Users size={18} />
                  Indicar
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="card-elevated">
            <div className="flex items-center gap-2 text-success mb-1">
              <TrendingUp size={18} />
              <span className="text-xs font-medium">Este mês</span>
            </div>
            <p className="font-display text-2xl font-bold text-foreground">+1.050</p>
            <p className="text-xs text-muted-foreground">anilhas ganhas</p>
          </div>
          <div className="card-elevated">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Users size={18} />
              <span className="text-xs font-medium">Indicações</span>
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{user.referralCount}</p>
            <p className="text-xs text-muted-foreground">amigos indicados</p>
          </div>
        </div>

        {/* Recent Movements */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-bold text-foreground flex items-center gap-2">
              <History size={18} className="text-primary" />
              Últimas Movimentações
            </h3>
            <Link
              to="/historico"
              className="text-sm text-primary font-medium hover:underline"
            >
              Ver tudo
            </Link>
          </div>
          <div className="space-y-2">
            {recentMovements.map((movement) => (
              <div
                key={movement.id}
                className="card-elevated flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      movement.type === 'credit'
                        ? 'bg-success/10 text-success'
                        : 'bg-destructive/10 text-destructive'
                    }`}
                  >
                    {movement.type === 'credit' ? (
                      <TrendingUp size={18} />
                    ) : (
                      <TrendingDown size={18} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {movement.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(movement.date)}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-bold ${
                    movement.type === 'credit' ? 'text-success' : 'text-destructive'
                  }`}
                >
                  {movement.type === 'credit' ? '+' : '-'}{movement.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
