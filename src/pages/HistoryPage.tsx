import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { mockMovements, formatDate } from '@/lib/mockData';
import { TrendingUp, TrendingDown, Filter, ShoppingCart, Users, Gift, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FilterType = 'all' | 'credit' | 'debit';
type OriginType = 'all' | 'compra' | 'indicacao' | 'campanha' | 'resgate';

const originIcons = {
  compra: ShoppingCart,
  indicacao: Users,
  campanha: Gift,
  resgate: Ticket,
};

const originLabels = {
  compra: 'Compra',
  indicacao: 'Indicação',
  campanha: 'Campanha',
  resgate: 'Resgate',
};

export const HistoryPage = () => {
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [originFilter, setOriginFilter] = useState<OriginType>('all');

  const filteredMovements = mockMovements.filter((movement) => {
    if (typeFilter !== 'all' && movement.type !== typeFilter) return false;
    if (originFilter !== 'all' && movement.origin !== originFilter) return false;
    return true;
  });

  const totalCredits = filteredMovements
    .filter((m) => m.type === 'credit')
    .reduce((sum, m) => sum + m.amount, 0);

  const totalDebits = filteredMovements
    .filter((m) => m.type === 'debit')
    .reduce((sum, m) => sum + m.amount, 0);

  return (
    <AppLayout headerTitle="Histórico">
      <div className="p-4 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up">
          <div className="card-elevated">
            <div className="flex items-center gap-2 text-success mb-1">
              <TrendingUp size={18} />
              <span className="text-xs font-medium">Créditos</span>
            </div>
            <p className="font-display text-xl font-bold text-success">
              +{totalCredits.toLocaleString('pt-BR')}
            </p>
          </div>
          <div className="card-elevated">
            <div className="flex items-center gap-2 text-destructive mb-1">
              <TrendingDown size={18} />
              <span className="text-xs font-medium">Débitos</span>
            </div>
            <p className="font-display text-xl font-bold text-destructive">
              -{totalDebits.toLocaleString('pt-BR')}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="card-elevated animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-3">
            <Filter size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Filtros</span>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Tipo</p>
              <div className="flex gap-2">
                {(['all', 'credit', 'debit'] as FilterType[]).map((type) => (
                  <Button
                    key={type}
                    variant={typeFilter === type ? 'default' : 'secondary'}
                    size="sm"
                    onClick={() => setTypeFilter(type)}
                  >
                    {type === 'all' ? 'Todos' : type === 'credit' ? 'Créditos' : 'Débitos'}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground mb-2">Origem</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={originFilter === 'all' ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => setOriginFilter('all')}
                >
                  Todas
                </Button>
                {(['compra', 'indicacao', 'campanha', 'resgate'] as OriginType[]).map((origin) => {
                  if (origin === 'all') return null;
                  const Icon = originIcons[origin];
                  return (
                    <Button
                      key={origin}
                      variant={originFilter === origin ? 'default' : 'secondary'}
                      size="sm"
                      onClick={() => setOriginFilter(origin)}
                    >
                      <Icon size={14} />
                      {originLabels[origin]}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Movements List */}
        <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {filteredMovements.length === 0 ? (
            <div className="card-elevated text-center py-8">
              <p className="text-muted-foreground">
                Nenhuma movimentação encontrada
              </p>
            </div>
          ) : (
            filteredMovements.map((movement) => {
              const OriginIcon = originIcons[movement.origin];
              return (
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
                      <OriginIcon size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {movement.description}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(movement.date)}
                        </span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
                          {originLabels[movement.origin]}
                        </span>
                      </div>
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
              );
            })
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default HistoryPage;
