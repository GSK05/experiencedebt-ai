export default function MetricCard({ label, value, detail, tone = "default" }) {
  const toneClass = {
    default: "border-slate-200 bg-white",
    danger: "border-rose-200 bg-rose-50",
    warning: "border-amber-200 bg-amber-50",
    success: "border-emerald-200 bg-emerald-50",
  }[tone];

  return (
    <section className={`rounded-lg border p-4 shadow-panel ${toneClass}`}>
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="text-3xl font-semibold text-slate-950">{value}</p>
        <p className="text-right text-sm text-slate-600">{detail}</p>
      </div>
    </section>
  );
}
