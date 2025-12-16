import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { AnilhaBadge } from '@/components/AnilhaBadge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { mockCoupons, formatDate, generateCouponCode } from '@/lib/mockData';
import { Gift, Ticket, Tag, Calendar, Dumbbell, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const typeIcons = {
  desconto: Tag,
  produto: Gift,
  brinde: Gift,
};

const typeLabels = {
  desconto: 'Desconto',
  produto: 'Produto',
  brinde: 'Brinde',
};

const typeColors = {
  desconto: 'bg-primary/10 text-primary',
  produto: 'bg-success/10 text-success',
  brinde: 'bg-accent/20 text-accent-foreground',
};

export const CouponsPage = () => {
  const { user } = useAuth();
  const [selectedCoupon, setSelectedCoupon] = useState<typeof mockCoupons[0] | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);

  if (!user) return null;

  const handleRedeem = async () => {
    if (!selectedCoupon) return;
    
    if (user.anilhasBalance < selectedCoupon.anilhasCost) {
      toast.error('Saldo insuficiente de anilhas');
      setSelectedCoupon(null);
      return;
    }

    setIsRedeeming(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const code = generateCouponCode(selectedCoupon.name.replace(/\s+/g, '').toUpperCase().slice(0, 6));
    
    toast.success(
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Cupom resgatado!</span>
        <span className="text-sm opacity-80">Código: {code}</span>
      </div>
    );
    
    setIsRedeeming(false);
    setSelectedCoupon(null);
  };

  const activeCoupons = mockCoupons.filter((c) => c.active);

  return (
    <AppLayout headerTitle="Resgatar Cupons">
      <div className="p-4 space-y-4">
        {/* Balance */}
        <div className="card-elevated flex items-center justify-between animate-slide-up">
          <div>
            <p className="text-sm text-muted-foreground">Seu saldo</p>
            <p className="font-display text-2xl font-bold text-foreground">
              {user.anilhasBalance.toLocaleString('pt-BR')}
            </p>
          </div>
          <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
            <Dumbbell className="text-accent" size={28} />
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-foreground flex items-center gap-2">
            <Ticket size={18} className="text-primary" />
            Cupons Disponíveis
          </h3>

          {activeCoupons.map((coupon, index) => {
            const Icon = typeIcons[coupon.type];
            const canRedeem = user.anilhasBalance >= coupon.anilhasCost;
            
            return (
              <div
                key={coupon.id}
                className="card-elevated animate-slide-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${typeColors[coupon.type]}`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-foreground">{coupon.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[coupon.type]}`}>
                        {typeLabels[coupon.type]}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {coupon.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AnilhaBadge amount={coupon.anilhasCost} size="sm" />
                        {coupon.validity && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar size={12} />
                            Até {formatDate(coupon.validity)}
                          </span>
                        )}
                      </div>
                      <Button
                        variant={canRedeem ? 'gradient' : 'secondary'}
                        size="sm"
                        onClick={() => setSelectedCoupon(coupon)}
                        disabled={!canRedeem}
                      >
                        {canRedeem ? 'Resgatar' : 'Sem saldo'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={!!selectedCoupon} onOpenChange={() => setSelectedCoupon(null)}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle className="font-display">Confirmar Resgate</DialogTitle>
            <DialogDescription>
              Você está prestes a resgatar o cupom:
            </DialogDescription>
          </DialogHeader>
          
          {selectedCoupon && (
            <div className="card-elevated my-4">
              <h4 className="font-semibold text-foreground mb-1">
                {selectedCoupon.name}
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                {selectedCoupon.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Custo:</span>
                <AnilhaBadge amount={selectedCoupon.anilhasCost} size="sm" />
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-muted-foreground">Seu saldo após:</span>
                <span className="font-semibold text-foreground">
                  {(user.anilhasBalance - selectedCoupon.anilhasCost).toLocaleString('pt-BR')} anilhas
                </span>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="secondary"
              onClick={() => setSelectedCoupon(null)}
              disabled={isRedeeming}
            >
              Cancelar
            </Button>
            <Button
              variant="gradient"
              onClick={handleRedeem}
              disabled={isRedeeming}
            >
              {isRedeeming ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Resgatando...
                </>
              ) : (
                <>
                  <Check size={18} />
                  Confirmar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default CouponsPage;
