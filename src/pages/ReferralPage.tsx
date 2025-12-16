import { AppLayout } from '@/components/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Users, Share2, Copy, Gift, Check } from 'lucide-react';
import { toast } from 'sonner';

export const ReferralPage = () => {
  const { user } = useAuth();

  if (!user) return null;

  const referralLink = `https://body.com.br/indicar/${user.referralCode}`;
  
  const whatsappMessage = encodeURIComponent(
    `🏋️ Vem fazer parte do Body Afiliados!\n\nGanhe anilhas em cada compra e troque por descontos e brindes exclusivos!\n\nUse meu código: ${user.referralCode}\n\n${referralLink}`
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Link copiado!');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    toast.success('Código copiado!');
  };

  const handleShareWhatsApp = () => {
    window.open(`https://wa.me/?text=${whatsappMessage}`, '_blank');
  };

  return (
    <AppLayout headerTitle="Indicar Amigos">
      <div className="p-4 space-y-5">
        {/* Hero Card */}
        <div className="card-elevated text-center relative overflow-hidden animate-slide-up">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full -ml-16 -mb-16" />
          
          <div className="relative py-4">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="text-primary" size={36} />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Indique e Ganhe!
            </h2>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              Quando seu amigo fizer a primeira compra, vocês dois ganham <span className="font-bold text-accent">150 anilhas</span>!
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="card-elevated text-center">
            <p className="font-display text-3xl font-bold text-primary">
              {user.referralCount}
            </p>
            <p className="text-sm text-muted-foreground">Amigos indicados</p>
          </div>
          <div className="card-elevated text-center">
            <p className="font-display text-3xl font-bold text-accent">
              {user.referralCount * 150}
            </p>
            <p className="text-sm text-muted-foreground">Anilhas ganhas</p>
          </div>
        </div>

        {/* Referral Code */}
        <div className="card-elevated animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Gift size={18} className="text-primary" />
            Seu código de indicação
          </h3>
          
          <div className="bg-secondary/50 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Código</p>
              <p className="font-display text-2xl font-bold text-foreground tracking-wider">
                {user.referralCode}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleCopyCode}>
              <Copy size={14} />
              Copiar
            </Button>
          </div>
        </div>

        {/* Share Actions */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Button
            variant="gradient"
            size="xl"
            className="w-full"
            onClick={handleShareWhatsApp}
          >
            <Share2 size={20} />
            Compartilhar no WhatsApp
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleCopyLink}
          >
            <Copy size={18} />
            Copiar Link
          </Button>
        </div>

        {/* How it works */}
        <div className="card-elevated animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="font-semibold text-foreground mb-4">Como funciona?</h3>
          <div className="space-y-4">
            {[
              { step: 1, text: 'Compartilhe seu código com amigos' },
              { step: 2, text: 'Seu amigo se cadastra e faz a primeira compra' },
              { step: 3, text: 'Vocês dois recebem 150 anilhas!' },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {step}
                </div>
                <p className="text-sm text-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ReferralPage;
