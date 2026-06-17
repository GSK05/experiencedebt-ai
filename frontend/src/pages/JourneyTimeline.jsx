import { useState } from "react";

export default function JourneyTimeline({ customer }) {
  const timelineEvents = [
    {
      day: "Day 1",
      title: "Website Visit",
      channel: "Web",
      impact: 0,
      status: "healthy",
      description: "Customer browsed pricing, integrations, and onboarding resources.",
      signal: "High intent visit",
      debtScore: 18,
    },
    {
      day: "Day 2",
      title: "Cart Abandonment",
      channel: "Checkout",
      impact: 16,
      status: "warning",
      description: "Customer left checkout after reviewing plan limits and payment details.",
      signal: "Purchase journey interrupted",
      debtScore: 34,
    },
    {
      day: "Day 3",
      title: "Support Ticket",
      channel: "Support",
      impact: 22,
      status: "risk",
      description: "Customer opened a ticket asking for clarification on billing and setup steps.",
      signal: "Manual help required",
      debtScore: 56,
    },
    {
      day: "Day 4",
      title: "Email Ignored",
      channel: "Email",
      impact: 14,
      status: "risk",
      description: "Follow-up email was delivered but not opened or clicked.",
      signal: "Recovery communication missed",
      debtScore: 70,
    },
    {
      day: "Day 7",
      title: "Debt Score Increased",
      channel: "AI Detection",
      impact: 18,
      status: "critical",
      description: "Experience Debt Score crossed the high-risk threshold after unresolved friction accumulated.",
      signal: "Intervention recommended",
      debtScore: 88,
    },
  ];

  const [selectedEventId, setSelectedEventId] = useState(timelineEvents[0].day);
  const selectedEvent =
    timelineEvents.find((event) => event.day === selectedEventId) || timelineEvents[0];

  const statusClass = {
    healthy: "border-emerald-500 bg-emerald-50 text-emerald-700",
    warning: "border-amber-500 bg-amber-50 text-amber-700",
    risk: "border-rose-500 bg-rose-50 text-rose-700",
    critical: "border-slate-900 bg-slate-900 text-white",
  };

  return (
    <section className="grid gap-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Customer Journey Timeline</h2>
            <p className="mt-1 text-sm text-slate-600">{customer.name}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">
              Current Experience Debt
            </p>
            <p className="text-2xl font-semibold text-slate-950">{selectedEvent.debtScore}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
        <div className="grid gap-4 md:grid-cols-5">
          {timelineEvents.map((event, index) => (
            <button
              key={event.day}
              type="button"
              onClick={() => setSelectedEventId(event.day)}
              className="group relative min-h-36 rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
            >
              {index < timelineEvents.length - 1 && (
                <span className="absolute left-[calc(50%+20px)] top-8 hidden h-0.5 w-[calc(100%-40px)] bg-slate-200 md:block" />
              )}
              <span
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                  selectedEvent.day === event.day
                    ? "border-blue-700 bg-blue-700 text-white"
                    : statusClass[event.status]
                }`}
              >
                {index + 1}
              </span>
              <span className="mt-4 block text-sm font-semibold text-slate-500">{event.day}</span>
              <span className="mt-1 block font-semibold text-slate-950">{event.title}</span>
              <span className="mt-2 block text-sm text-slate-600">{event.channel}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-700">{selectedEvent.day}</p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-950">{selectedEvent.title}</h3>
            </div>
            <span className={`w-fit rounded-md border px-3 py-1 text-sm font-semibold ${statusClass[selectedEvent.status]}`}>
              {selectedEvent.status}
            </span>
          </div>
          <p className="mt-4 leading-7 text-slate-700">{selectedEvent.description}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">Channel</p>
              <p className="mt-1 font-semibold text-slate-950">{selectedEvent.channel}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">Debt Impact</p>
              <p className="mt-1 font-semibold text-rose-700">
                {selectedEvent.impact > 0 ? `+${selectedEvent.impact}` : "0"}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">Signal</p>
              <p className="mt-1 font-semibold text-slate-950">{selectedEvent.signal}</p>
            </div>
          </div>
        </article>

        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
          <h3 className="text-base font-semibold text-slate-950">Debt Accumulation</h3>
          <div className="mt-4 grid gap-3">
            {timelineEvents.map((event) => (
              <button
                key={event.day}
                type="button"
                onClick={() => setSelectedEventId(event.day)}
                className={`rounded-lg border p-3 text-left transition ${
                  selectedEvent.day === event.day
                    ? "border-blue-700 bg-blue-50"
                    : "border-slate-200 bg-slate-50 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-700">{event.day}</span>
                  <span className="text-sm font-semibold text-slate-950">{event.debtScore}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white">
                  <div className="h-2 rounded-full bg-blue-600" style={{ width: `${event.debtScore}%` }} />
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
