import { AdminLayout } from '@/components/AdminLayout';
import { mockAllUsers, mockCoupons, mockMovements } from '@/lib/mockData';
import { Users, Ticket, Dumbbell, TrendingUp } from 'lucide-react';

export const AdminDashboardPage = () => {
  const totalAnilhas = mockAllUsers.reduce((sum, user) => sum + user.anilhasBalance, 0);
  const totalCredits = mockMovements
    .filter((m) => m.type === 'credit')
    .reduce((sum, m) => sum + m.amount, 0);

  const stats = [
    {
      label: 'Clientes Cadastrados',
      value: mockAllUsers.length,
      icon: Users,
      color: 'bg-primary/10 text-primary',
    },
    {
      label: 'Cupons Ativos',
      value: mockCoupons.filter((c) => c.active).length,
      icon: Ticket,
      color: 'bg-success/10 text-success',
    },
    {
      label: 'Total de Anilhas',
      value: totalAnilhas.toLocaleString('pt-BR'),
      icon: Dumbbell,
      color: 'bg-accent/20 text-accent-foreground',
    },
    {
      label: 'Anilhas Distribuídas',
      value: totalCredits.toLocaleString('pt-BR'),
      icon: TrendingUp,
      color: 'bg-primary/10 text-primary',
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="card-elevated animate-slide-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon size={24} />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="card-elevated animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="font-display font-bold text-foreground mb-4">
            Atividade Recente
          </h3>
          <div className="space-y-3">
            {mockMovements.slice(0, 5).map((movement) => (
              <div
                key={movement.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {movement.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(movement.date).toLocaleDateString('pt-BR')}
                  </p>
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
    </AdminLayout>
  );
};

export default AdminDashboardPage;
