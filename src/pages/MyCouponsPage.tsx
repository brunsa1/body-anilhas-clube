import { AppLayout } from '@/components/AppLayout';
import { mockUserCoupons, formatDate } from '@/lib/mockData';
import { Ticket, Tag, Gift, Check, X, Clock, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const typeIcons = {
  desconto: Tag,
  produto: Gift,
  brinde: Gift,
};

const statusConfig = {
  ativo: {
    label: 'Ativo',
    icon: Check,
    className: 'bg-success/10 text-success border-success/20',
  },
  usado: {
    label: 'Usado',
    icon: Check,
    className: 'bg-muted text-muted-foreground border-muted',
  },
  vencido: {
    label: 'Vencido',
    icon: X,
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
};

export const MyCouponsPage = () => {
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Código copiado!');
  };

  const activeCoupons = mockUserCoupons.filter((c) => c.status === 'ativo');
  const inactiveCoupons = mockUserCoupons.filter((c) => c.status !== 'ativo');

  return (
    <AppLayout headerTitle="Meus Cupons">
      <div className="p-4 space-y-6">
        {/* Active Coupons */}
        <div>
          <h3 className="font-display font-bold text-foreground flex items-center gap-2 mb-3">
            <Ticket size={18} className="text-success" />
            Cupons Ativos
          </h3>
          
          {activeCoupons.length === 0 ? (
            <div className="card-elevated text-center py-8 animate-slide-up">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Ticket className="text-muted-foreground" size={28} />
              </div>
              <p className="text-muted-foreground">Você não tem cupons ativos</p>
              <p className="text-sm text-muted-foreground mt-1">
                Resgate cupons na aba "Resgatar"
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeCoupons.map((coupon, index) => {
                const Icon = typeIcons[coupon.type];
                const status = statusConfig[coupon.status];
                
                return (
                  <div
                    key={coupon.id}
                    className="card-elevated border-2 border-success/20 animate-slide-up"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                          <Icon className="text-success" size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{coupon.name}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${status.className}`}>
                            {status.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/50 rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Código</p>
                        <p className="font-mono font-bold text-foreground">{coupon.code}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(coupon.code)}
                      >
                        <Copy size={14} />
                        Copiar
                      </Button>
                    </div>
                    
                    {coupon.validity && (
                      <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={12} />
                        Válido até {formatDate(coupon.validity)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Inactive Coupons */}
        {inactiveCoupons.length > 0 && (
          <div>
            <h3 className="font-display font-bold text-muted-foreground flex items-center gap-2 mb-3">
              <Ticket size={18} />
              Histórico de Cupons
            </h3>
            
            <div className="space-y-2">
              {inactiveCoupons.map((coupon, index) => {
                const Icon = typeIcons[coupon.type];
                const status = statusConfig[coupon.status];
                const StatusIcon = status.icon;
                
                return (
                  <div
                    key={coupon.id}
                    className="card-elevated opacity-60 animate-slide-up"
                    style={{ animationDelay: `${0.1 * (index + activeCoupons.length)}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <Icon className="text-muted-foreground" size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{coupon.name}</h4>
                          <p className="text-xs text-muted-foreground font-mono">
                            {coupon.code}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${status.className}`}>
                        <StatusIcon size={10} />
                        {status.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default MyCouponsPage;
