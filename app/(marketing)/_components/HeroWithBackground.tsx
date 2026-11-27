export default function HeroWithBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-12 bg-linear-to-b from-white via-indigo-50/50  to-white full overflow-x-clip isolate">
      <div className="relative isolate">
        {children}

        <div className="rounded-full aspect-square w-[10rem] absolute bottom-[-2rem] -left-10 bg-primary/70 -z-10 blur-3xl"></div>
        <div className="rounded-full aspect-square w-[15rem] absolute top-[-2rem] right-0 bg-accent -z-10 blur-3xl"></div>
      </div>
    </section>
  );
}
