import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Save, Coins, Type } from 'lucide-react';
import { toast } from 'sonner';

export const AdminSettingsPage = () => {
  const [currencyName, setCurrencyName] = useState('Anilhas');
  const [pointsPerReal, setPointsPerReal] = useState('10');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!currencyName.trim()) {
      toast.error('Informe o nome da moeda');
      return;
    }
    if (!pointsPerReal || Number(pointsPerReal) <= 0) {
      toast.error('Informe um valor válido para a conversão');
      return;
    }

    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success('Configurações salvas com sucesso!');
    setIsSaving(false);
  };

  return (
    <AdminLayout title="Configurações">
      <div className="max-w-lg space-y-6">
        <div className="card-elevated">
          <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <Settings size={18} className="text-primary" />
            Configurações Gerais
          </h3>

          <div className="space-y-5">
            {/* Currency name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Type size={14} className="text-muted-foreground" />
                Nome da Moeda
              </Label>
              <Input
                value={currencyName}
                onChange={(e) => setCurrencyName(e.target.value)}
                placeholder="Ex: Anilhas, Pontos, Moedas..."
              />
              <p className="text-xs text-muted-foreground">
                Nome que será exibido para os clientes (ex: "Você tem 500 <strong>{currencyName || '...'}</strong>")
              </p>
            </div>

            {/* Points per real */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Coins size={14} className="text-muted-foreground" />
                Conversão: Cada R$ 1,00 equivale a
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="1"
                  value={pointsPerReal}
                  onChange={(e) => setPointsPerReal(e.target.value)}
                  className="w-28"
                />
                <span className="text-sm text-muted-foreground font-medium">
                  {currencyName || 'pontos'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Exemplo: Uma compra de R$ 100,00 dará ao cliente{' '}
                <strong>{(100 * Number(pointsPerReal || 0)).toLocaleString('pt-BR')} {currencyName || 'pontos'}</strong>
              </p>
            </div>

            <Button variant="gradient" onClick={handleSave} disabled={isSaving} className="w-full">
              {isSaving ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Salvando...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Salvar Configurações
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
