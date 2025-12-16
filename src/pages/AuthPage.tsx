import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Phone, User, CreditCard, Calendar, ArrowLeft, Loader2, Mail } from 'lucide-react';
import logoBody from '@/assets/logo-body.webp';

type AuthMode = 'welcome' | 'login' | 'register';

export const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>('welcome');
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    birthDate: '',
  });
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      toast.error('Digite um telefone válido');
      return;
    }
    setIsLoading(true);
    const success = await login(phone);
    setIsLoading(false);
    if (success) {
      toast.success('Bem-vindo de volta!');
      navigate('/home');
    } else {
      toast.error('Telefone não encontrado');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, cpf, phone, birthDate } = formData;

    if (!name || !email || !cpf || !phone || !birthDate) {
      toast.error('Preencha todos os campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Email inválido');
      return;
    }

    if (cpf.replace(/\D/g, '').length !== 11) {
      toast.error('CPF inválido');
      return;
    }

    setIsLoading(true);
    const success = await register({ name, email, cpf, phone, birthDate });
    setIsLoading(false);

    if (success) {
      toast.success('Cadastro realizado! Você ganhou 100 anilhas de boas-vindas! 🎉');
      navigate('/home');
    } else {
      toast.error('Erro ao realizar cadastro');
    }
  };

  if (mode === 'welcome') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="header-gradient flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="animate-float">
            <img src={logoBody} alt="Body Suplementos" className="w-40 h-auto mb-8" />
          </div>
          <h1 className="font-display text-3xl font-bold text-center mb-2">
            Body Afiliados
          </h1>
          <p className="text-primary-foreground/80 text-center mb-12">
            Seu clube de vantagens exclusivo
          </p>
        </div>
        <div className="bg-background rounded-t-3xl -mt-8 p-6 space-y-4 animate-slide-up">
          <div className="text-center mb-6">
            <h2 className="font-display text-xl font-bold text-foreground">
              Comece agora!
            </h2>
            <p className="text-muted-foreground text-sm">
              Acumule anilhas e troque por cupons exclusivos
            </p>
          </div>
          <Button
            variant="gradient"
            size="xl"
            className="w-full"
            onClick={() => setMode('login')}
          >
            Entrar com Telefone
          </Button>
          <Button
            variant="outline"
            size="xl"
            className="w-full"
            onClick={() => setMode('register')}
          >
            Criar Conta
          </Button>
          <div className="text-center pt-4">
            <button
              onClick={() => navigate('/admin/login')}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Acesso Administrativo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="header-gradient py-6 px-4">
        <button
          onClick={() => setMode('welcome')}
          className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
        <h1 className="font-display text-2xl font-bold">
          {mode === 'login' ? 'Entrar' : 'Criar Conta'}
        </h1>
      </div>

      <div className="p-6 animate-slide-up">
        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                Telefone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                maxLength={15}
                className="h-12 text-lg"
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
                'Entrar'
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Não tem conta?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-primary font-semibold hover:underline"
              >
                Criar agora
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User size={16} className="text-primary" />
                Nome Completo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf" className="flex items-center gap-2">
                <CreditCard size={16} className="text-primary" />
                CPF
              </Label>
              <Input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                maxLength={14}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-phone" className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                Telefone
              </Label>
              <Input
                id="reg-phone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                maxLength={15}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                Data de Nascimento
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
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
                'Criar Conta'
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Já tem conta?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-primary font-semibold hover:underline"
              >
                Entrar
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
