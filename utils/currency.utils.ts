interface Params {
  amount: number;
  style?: "currency" | "decimal" | "percent" | "unit";
  notation?: "compact" | "scientific" | "engineering" | "standard";
  currency?: "NGN" | "USD";
}
export const formatNumber = (params: Params): string => {
  return new Intl.NumberFormat("en", {
    style: params.style || "currency",
    currency: params.currency || "NGN",
    notation: params.notation,
  }).format(params.amount);
};
