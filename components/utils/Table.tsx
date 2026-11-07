export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-4 text-left text-[11px] font-bold tracking-wide text-slate-500">
      {children}
    </th>
  );
}
