import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Shield, Loader2, ArrowLeft } from 'lucide-react';
import logoBody from '@/assets/logo-body.webp';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginAsAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Preencha todos os campos');
      return;
    }

    setIsLoading(true);
    const success = await loginAsAdmin(email, password);
    setIsLoading(false);

    if (success) {
      toast.success('Bem-vindo ao painel administrativo!');
      navigate('/admin');
    } else {
      toast.error('Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="header-gradient py-6 px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
        <div className="flex items-center gap-3">
          <img src={logoBody} alt="Body Suplementos" className="h-10 w-auto" />
          <div>
            <h1 className="font-display text-xl font-bold">Área Administrativa</h1>
            <p className="text-primary-foreground/70 text-sm">Body Afiliados</p>
          </div>
        </div>
      </div>

      <div className="p-6 animate-slide-up">
        <div className="card-elevated mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="text-primary" size={24} />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Acesso Restrito</h2>
              <p className="text-sm text-muted-foreground">
                Use suas credenciais de administrador
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@body.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
            />
          </div>
          <Button
            type="submit"
            variant="gradient"
            size="xl"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Shield size={18} />
                Entrar
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-secondary/50 rounded-lg text-center">
          <p className="text-xs text-muted-foreground">
            Demo: admin@body.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
