import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { mockUserCoupons, mockAllUsers } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle, XCircle, Clock, User, Ticket } from 'lucide-react';
import { toast } from 'sonner';
import type { UserCoupon } from '@/lib/mockData';

const statusConfig = {
  ativo: { label: 'Ativo', icon: Clock, color: 'bg-primary/10 text-primary' },
  usado: { label: 'Usado', icon: CheckCircle, color: 'bg-success/10 text-success' },
  vencido: { label: 'Vencido', icon: XCircle, color: 'bg-destructive/10 text-destructive' },
};

export const AdminValidateCouponPage = () => {
  const [searchCode, setSearchCode] = useState('');
  const [redeemedCoupons, setRedeemedCoupons] = useState<(UserCoupon & { userName: string })[]>(() =>
    mockUserCoupons.map((uc) => ({
      ...uc,
      userName: mockAllUsers.find((u) => u.id === '1')?.name || 'Cliente',
    }))
  );
  const [foundCoupon, setFoundCoupon] = useState<(UserCoupon & { userName: string }) | null>(null);

  const handleSearch = () => {
    if (!searchCode.trim()) {
      toast.error('Digite o código do cupom');
      return;
    }

    const coupon = redeemedCoupons.find(
      (c) => c.code.toLowerCase() === searchCode.trim().toLowerCase()
    );

    if (coupon) {
      setFoundCoupon(coupon);
    } else {
      setFoundCoupon(null);
      toast.error('Cupom não encontrado');
    }
  };

  const handleValidate = (couponId: string) => {
    setRedeemedCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, status: 'usado' as const } : c))
    );
    setFoundCoupon((prev) => (prev && prev.id === couponId ? { ...prev, status: 'usado' } : prev));
    toast.success('Cupom validado e marcado como usado!');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <AdminLayout title="Validar Cupons">
      <div className="space-y-6">
        {/* Search by code */}
        <div className="card-elevated">
          <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
            <Search size={18} className="text-primary" />
            Buscar por Código
          </h3>
          <div className="flex gap-2">
            <Input
              placeholder="Digite o código do cupom (ex: BODY10-ABC123)"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button variant="gradient" onClick={handleSearch}>
              <Search size={16} />
              Buscar
            </Button>
          </div>

          {/* Search result */}
          {foundCoupon && (
            <div className="mt-4 p-4 rounded-xl border border-border bg-secondary/30">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Ticket size={16} className="text-primary" />
                    <h4 className="font-semibold text-foreground">{foundCoupon.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusConfig[foundCoupon.status].color}`}>
                      {statusConfig[foundCoupon.status].label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono">{foundCoupon.code}</p>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <User size={14} />
                    {foundCoupon.userName}
                  </div>
                </div>
                {foundCoupon.status === 'ativo' && (
                  <Button variant="gradient" size="sm" onClick={() => handleValidate(foundCoupon.id)}>
                    <CheckCircle size={16} />
                    Validar
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* All redeemed coupons list */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-foreground flex items-center gap-2">
            <Ticket size={18} className="text-primary" />
            Cupons Resgatados
          </h3>

          {redeemedCoupons.length === 0 ? (
            <div className="card-elevated text-center py-8">
              <p className="text-muted-foreground">Nenhum cupom resgatado ainda.</p>
            </div>
          ) : (
            redeemedCoupons.map((coupon, index) => {
              const StatusIcon = statusConfig[coupon.status].icon;
              return (
                <div
                  key={coupon.id}
                  className="card-elevated animate-slide-up"
                  style={{ animationDelay: `${0.05 * index}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusConfig[coupon.status].color}`}>
                        <StatusIcon size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{coupon.name}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${statusConfig[coupon.status].color}`}>
                            {statusConfig[coupon.status].label}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground font-mono">{coupon.code}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User size={12} />
                            {coupon.userName}
                          </span>
                          <span>Resgatado em: {new Date(coupon.redeemedAt).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                    {coupon.status === 'ativo' && (
                      <Button variant="gradient" size="sm" onClick={() => handleValidate(coupon.id)}>
                        <CheckCircle size={16} />
                        Validar
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminValidateCouponPage;
