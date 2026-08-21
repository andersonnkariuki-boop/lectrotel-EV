export interface Wallet {
  user_amount: number;
  user_id: number;
  currency?: string;
}

export interface WalletTransaction {
  id: number;
  user_id: number;
  amount: number;
  type: 'credit' | 'debit';
  description?: string;
  reference?: string;
  created_at: string;
}

export interface TopUpRequest {
  amount: number;
  phone_number: string;
}

export interface WalletResponse {
  user_amount: number;
  user_id: number;
}

export function formatCurrency(amount: number, currency: string = 'KES'): string {
  return `${currency} ${amount.toLocaleString()}`;
}
