export default function Loading() {
  return (
    <main className="section-shell py-20" aria-busy="true" aria-live="polite">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-52 rounded bg-brand-ink/10" />
        <div className="h-16 w-full rounded bg-brand-ink/10" />
        <div className="h-16 w-4/5 rounded bg-brand-ink/10" />
        <div className="h-48 w-full rounded bg-brand-ink/10" />
      </div>
    </main>
  );
}
