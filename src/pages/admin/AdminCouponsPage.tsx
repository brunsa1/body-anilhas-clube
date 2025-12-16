import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { mockCoupons, formatDate } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Ticket, Plus, Edit, Trash2, Check, X, Tag, Gift } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const typeLabels = {
  desconto: 'Desconto',
  produto: 'Produto',
  brinde: 'Brinde',
};

export const AdminCouponsPage = () => {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<typeof mockCoupons[0] | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'desconto' as 'desconto' | 'produto' | 'brinde',
    anilhasCost: '',
    description: '',
    validity: '',
  });

  const openNewDialog = () => {
    setEditingCoupon(null);
    setFormData({
      name: '',
      type: 'desconto',
      anilhasCost: '',
      description: '',
      validity: '',
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (coupon: typeof mockCoupons[0]) => {
    setEditingCoupon(coupon);
    setFormData({
      name: coupon.name,
      type: coupon.type,
      anilhasCost: coupon.anilhasCost.toString(),
      description: coupon.description,
      validity: coupon.validity || '',
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.anilhasCost || !formData.description) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    if (editingCoupon) {
      setCoupons(
        coupons.map((c) =>
          c.id === editingCoupon.id
            ? {
                ...c,
                ...formData,
                anilhasCost: parseInt(formData.anilhasCost),
                validity: formData.validity || null,
              }
            : c
        )
      );
      toast.success('Cupom atualizado!');
    } else {
      const newCoupon = {
        id: Date.now().toString(),
        ...formData,
        anilhasCost: parseInt(formData.anilhasCost),
        validity: formData.validity || null,
        active: true,
      };
      setCoupons([newCoupon, ...coupons]);
      toast.success('Cupom criado!');
    }

    setIsDialogOpen(false);
  };

  const toggleActive = (id: string) => {
    setCoupons(
      coupons.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
    toast.success('Status atualizado!');
  };

  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter((c) => c.id !== id));
    toast.success('Cupom excluído!');
  };

  return (
    <AdminLayout title="Gestão de Cupons">
      <div className="space-y-6">
        {/* Actions */}
        <div className="flex justify-end">
          <Button variant="gradient" onClick={openNewDialog}>
            <Plus size={18} />
            Novo Cupom
          </Button>
        </div>

        {/* Coupons List */}
        <div className="space-y-3">
          {coupons.map((coupon, index) => (
            <div
              key={coupon.id}
              className={`card-elevated animate-slide-up ${!coupon.active ? 'opacity-60' : ''}`}
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    coupon.type === 'desconto'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-success/10 text-success'
                  }`}>
                    {coupon.type === 'desconto' ? <Tag size={22} /> : <Gift size={22} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">{coupon.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        coupon.active
                          ? 'bg-success/10 text-success'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {coupon.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {coupon.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="font-semibold text-accent">
                        {coupon.anilhasCost} anilhas
                      </span>
                      <span>Tipo: {typeLabels[coupon.type]}</span>
                      {coupon.validity && (
                        <span>Até: {formatDate(coupon.validity)}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleActive(coupon.id)}
                    title={coupon.active ? 'Desativar' : 'Ativar'}
                  >
                    {coupon.active ? <X size={16} /> : <Check size={16} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(coupon)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteCoupon(coupon.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingCoupon ? 'Editar Cupom' : 'Novo Cupom'}
            </DialogTitle>
            <DialogDescription>
              {editingCoupon
                ? 'Atualize as informações do cupom'
                : 'Preencha os dados do novo cupom'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome do Cupom *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: 10% OFF"
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: 'desconto' | 'produto' | 'brinde') =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desconto">Desconto</SelectItem>
                  <SelectItem value="produto">Produto</SelectItem>
                  <SelectItem value="brinde">Brinde</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Custo em Anilhas *</Label>
              <Input
                type="number"
                value={formData.anilhasCost}
                onChange={(e) => setFormData({ ...formData, anilhasCost: e.target.value })}
                placeholder="Ex: 500"
              />
            </div>

            <div className="space-y-2">
              <Label>Descrição *</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Ex: 10% de desconto em qualquer compra"
              />
            </div>

            <div className="space-y-2">
              <Label>Validade (opcional)</Label>
              <Input
                type="date"
                value={formData.validity}
                onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="gradient" onClick={handleSave}>
              {editingCoupon ? 'Salvar' : 'Criar Cupom'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCouponsPage;
