export function TwoColumn({ left, right }) {
  return (
    <div className="flex gap-6 items-start p-4">
      <aside className="w-80 shrink-0">
        <div className="flex flex-col gap-4">{left}</div>
      </aside>

      <section className="flex-1">
        <div className="flex flex-col gap-4">{right}</div>
      </section>
    </div>
  );
}
