import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { mockAllUsers } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Dumbbell, Plus, Minus, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

type AdjustmentType = 'credit' | 'debit';

export const AdminAnilhasPage = () => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<typeof mockAllUsers[0] | null>(null);
  const [adjustmentType, setAdjustmentType] = useState<AdjustmentType>('credit');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const filteredUsers = mockAllUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search)
  );

  const openAdjustDialog = (user: typeof mockAllUsers[0], type: AdjustmentType) => {
    setSelectedUser(user);
    setAdjustmentType(type);
    setAmount('');
    setReason('');
  };

  const handleAdjust = () => {
    if (!amount || parseInt(amount) <= 0) {
      toast.error('Digite uma quantidade válida');
      return;
    }

    if (!reason.trim()) {
      toast.error('Informe o motivo do ajuste');
      return;
    }

    toast.success(
      `${adjustmentType === 'credit' ? 'Crédito' : 'Débito'} de ${amount} anilhas realizado!`
    );
    setSelectedUser(null);
  };

  return (
    <AdminLayout title="Ajuste de Anilhas">
      <div className="space-y-6">
        {/* Search */}
        <div className="card-elevated animate-slide-up">
          <p className="text-sm text-muted-foreground mb-3">
            Selecione um cliente para realizar ajuste manual de anilhas
          </p>
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

        {/* Users List */}
        <div className="space-y-3">
          {filteredUsers.map((user, index) => (
            <div
              key={user.id}
              className="card-elevated animate-slide-up"
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{user.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Dumbbell size={14} className="text-accent" />
                      <span className="font-semibold text-accent">
                        {user.anilhasBalance.toLocaleString('pt-BR')}
                      </span>
                      <span>anilhas</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => openAdjustDialog(user, 'credit')}
                  >
                    <Plus size={16} />
                    Crédito
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openAdjustDialog(user, 'debit')}
                  >
                    <Minus size={16} />
                    Débito
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adjustment Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">
              {adjustmentType === 'credit' ? 'Creditar' : 'Debitar'} Anilhas
            </DialogTitle>
            <DialogDescription>
              {selectedUser && (
                <span>
                  Cliente: <strong>{selectedUser.name}</strong>
                  <br />
                  Saldo atual:{' '}
                  <strong>{selectedUser.anilhasBalance.toLocaleString('pt-BR')} anilhas</strong>
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Quantidade de Anilhas</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Ex: 100"
                min="1"
              />
            </div>

            <div className="space-y-2">
              <Label>Motivo do Ajuste</Label>
              <Input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Ex: Compensação por problema em pedido"
              />
            </div>

            {amount && parseInt(amount) > 0 && selectedUser && (
              <div className="p-3 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Novo saldo:</p>
                <p className="font-display text-xl font-bold text-foreground">
                  {(
                    adjustmentType === 'credit'
                      ? selectedUser.anilhasBalance + parseInt(amount)
                      : Math.max(0, selectedUser.anilhasBalance - parseInt(amount))
                  ).toLocaleString('pt-BR')}{' '}
                  anilhas
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setSelectedUser(null)}>
              Cancelar
            </Button>
            <Button
              variant={adjustmentType === 'credit' ? 'success' : 'destructive'}
              onClick={handleAdjust}
            >
              {adjustmentType === 'credit' ? (
                <>
                  <Plus size={16} />
                  Creditar
                </>
              ) : (
                <>
                  <Minus size={16} />
                  Debitar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminAnilhasPage;
