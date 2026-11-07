export type Subscription = {
  name: string;
  price_amount: string | number;
  price_currency?: string;
  period?: string;
  description: string;
  features?: Record<string, any>[];
  benefits: string[];
  includes_all_in?: string;
  cta?: string;
  tag?: string;
};

// export type SupscriptionFeatures={}
