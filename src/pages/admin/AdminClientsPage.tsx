import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { mockAllUsers } from '@/lib/mockData';
import { Search, Phone, User, Dumbbell } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const AdminClientsPage = () => {
  const [search, setSearch] = useState('');

  const filteredUsers = mockAllUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search)
  );

  return (
    <AdminLayout title="Gestão de Clientes">
      <div className="space-y-6">
        {/* Search */}
        <div className="card-elevated animate-slide-up">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Buscar por nome ou telefone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Clients List */}
        <div className="space-y-3">
          {filteredUsers.length === 0 ? (
            <div className="card-elevated text-center py-8">
              <p className="text-muted-foreground">Nenhum cliente encontrado</p>
            </div>
          ) : (
            filteredUsers.map((user, index) => (
              <div
                key={user.id}
                className="card-elevated animate-slide-up"
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{user.name}</h4>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                        <Phone size={12} />
                        {user.phone}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        CPF: {user.cpf}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-accent">
                      <Dumbbell size={16} />
                      <span className="font-bold">{user.anilhasBalance.toLocaleString('pt-BR')}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">anilhas</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminClientsPage;
