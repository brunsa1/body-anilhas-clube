import { Dumbbell } from 'lucide-react';

interface AnilhaBadgeProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const AnilhaBadge = ({ amount, size = 'md', showIcon = true }: AnilhaBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 18,
  };

  return (
    <span className={`anilha-badge ${sizeClasses[size]}`}>
      {showIcon && <Dumbbell size={iconSizes[size]} className="text-accent" />}
      <span className="font-bold">{amount.toLocaleString('pt-BR')}</span>
    </span>
  );
};
