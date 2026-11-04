export function HoldingPage({ title }: { title: string }) {
  return (
    <section className="site-container py-16 sm:py-22 lg:py-28">
      <h1 className="font-heading text-h1-holding font-medium text-brand">{title}</h1>
    </section>
  );
}
