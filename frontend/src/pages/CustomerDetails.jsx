import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { riskClass } from "../utils/formatters";

export default function CustomerDetails({ customer }) {
  const profileRows = [
    ["Company", customer.company],
    ["Segment", customer.segment],
    ["Plan", customer.plan],
    ["Region", customer.region],
    ["Role", customer.demographics.role],
    ["Industry", customer.demographics.industry],
    ["Company Size", customer.demographics.companySize],
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">{customer.name}</h2>
            <p className="mt-1 text-slate-600">{customer.company}</p>
          </div>
          <span className={`w-fit rounded-md px-3 py-1 text-sm font-semibold ring-1 ${riskClass(customer.riskLevel)}`}>
            {customer.riskLevel} risk
          </span>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {profileRows.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">{label}</p>
              <p className="mt-1 font-medium text-slate-950">{value}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
        <h3 className="text-base font-semibold text-slate-950">Experience Metrics</h3>
        <div className="mt-4 grid gap-3">
          {[
            ["Experience Debt Score", customer.eds],
            ["Context Loss Index", customer.cli],
            ["Journey Effort Score", customer.jes],
            ["Recovery Probability Score", customer.rps],
            ["Friction-Free Journey Rate", customer.ffjr],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-slate-600">{label}</span>
                <span className="font-semibold text-slate-950">{value}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-blue-600" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel lg:col-span-2">
        <h3 className="text-base font-semibold text-slate-950">Customer Debt Trend</h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={customer.trend} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#dc2626" strokeWidth={3} dot={{ r: 3 }} name="EDS" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
