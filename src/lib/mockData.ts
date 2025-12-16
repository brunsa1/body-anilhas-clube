// Mock data for Body Afiliados MVP
// This simulates the data that will come from the backend API

export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthDate: string;
  anilhasBalance: number;
  referralCode: string;
  referralCount: number;
  createdAt: string;
}

export interface AnilhaMovement {
  id: string;
  date: string;
  type: 'credit' | 'debit';
  amount: number;
  origin: 'compra' | 'indicacao' | 'campanha' | 'resgate';
  description: string;
}

export interface Coupon {
  id: string;
  name: string;
  type: 'desconto' | 'produto' | 'brinde';
  anilhasCost: number;
  validity: string | null;
  description: string;
  active: boolean;
}

export interface UserCoupon {
  id: string;
  couponId: string;
  code: string;
  name: string;
  type: 'desconto' | 'produto' | 'brinde';
  status: 'ativo' | 'usado' | 'vencido';
  validity: string | null;
  redeemedAt: string;
}

// Mock current user
export const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao.silva@email.com',
  cpf: '123.456.789-00',
  phone: '(11) 99999-8888',
  birthDate: '1990-05-15',
  anilhasBalance: 2450,
  referralCode: 'JOAO2024',
  referralCount: 5,
  createdAt: '2024-01-15',
};

// Mock anilha movements
export const mockMovements: AnilhaMovement[] = [
  {
    id: '1',
    date: '2024-12-15',
    type: 'credit',
    amount: 450,
    origin: 'compra',
    description: 'Compra Whey Protein 900g',
  },
  {
    id: '2',
    date: '2024-12-10',
    type: 'credit',
    amount: 150,
    origin: 'indicacao',
    description: 'Amigo Pedro realizou primeira compra',
  },
  {
    id: '3',
    date: '2024-12-05',
    type: 'debit',
    amount: 500,
    origin: 'resgate',
    description: 'Resgate: 10% OFF próxima compra',
  },
  {
    id: '4',
    date: '2024-12-01',
    type: 'credit',
    amount: 300,
    origin: 'compra',
    description: 'Compra Creatina 300g',
  },
  {
    id: '5',
    date: '2024-11-28',
    type: 'credit',
    amount: 200,
    origin: 'campanha',
    description: 'Bônus Black Friday',
  },
  {
    id: '6',
    date: '2024-11-20',
    type: 'credit',
    amount: 600,
    origin: 'compra',
    description: 'Compra BCAA + Glutamina',
  },
];

// Mock available coupons
export const mockCoupons: Coupon[] = [
  {
    id: '1',
    name: '10% OFF',
    type: 'desconto',
    anilhasCost: 500,
    validity: '2025-03-31',
    description: '10% de desconto em qualquer compra',
    active: true,
  },
  {
    id: '2',
    name: '15% OFF',
    type: 'desconto',
    anilhasCost: 800,
    validity: '2025-03-31',
    description: '15% de desconto em qualquer compra',
    active: true,
  },
  {
    id: '3',
    name: 'Shaker Grátis',
    type: 'brinde',
    anilhasCost: 300,
    validity: null,
    description: 'Ganhe um shaker exclusivo Body',
    active: true,
  },
  {
    id: '4',
    name: 'Amostra Whey',
    type: 'produto',
    anilhasCost: 200,
    validity: null,
    description: 'Sachê de Whey Protein 30g',
    active: true,
  },
  {
    id: '5',
    name: '20% OFF Whey',
    type: 'desconto',
    anilhasCost: 1000,
    validity: '2025-02-28',
    description: '20% de desconto em qualquer Whey',
    active: true,
  },
  {
    id: '6',
    name: 'Coqueteleira Premium',
    type: 'brinde',
    anilhasCost: 1500,
    validity: null,
    description: 'Coqueteleira premium com compartimentos',
    active: true,
  },
];

// Mock user coupons
export const mockUserCoupons: UserCoupon[] = [
  {
    id: '1',
    couponId: '1',
    code: 'BODY10-ABC123',
    name: '10% OFF',
    type: 'desconto',
    status: 'ativo',
    validity: '2025-01-31',
    redeemedAt: '2024-12-10',
  },
  {
    id: '2',
    couponId: '3',
    code: 'SHAKER-XYZ789',
    name: 'Shaker Grátis',
    type: 'brinde',
    status: 'usado',
    validity: null,
    redeemedAt: '2024-11-15',
  },
];

// Mock admin users list
export const mockAllUsers: User[] = [
  mockUser,
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    cpf: '987.654.321-00',
    phone: '(11) 98888-7777',
    birthDate: '1985-08-22',
    anilhasBalance: 1200,
    referralCode: 'MARIA2024',
    referralCount: 3,
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro.costa@email.com',
    cpf: '456.789.123-00',
    phone: '(21) 97777-6666',
    birthDate: '1995-12-10',
    anilhasBalance: 800,
    referralCode: 'PEDRO2024',
    referralCount: 1,
    createdAt: '2024-03-10',
  },
];

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

// Helper function to format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// Helper to generate coupon code
export const generateCouponCode = (prefix: string): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${code}`;
};
