import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const breakdownColors = ["#2563eb", "#dc2626", "#d97706", "#059669"];

export default function FrictionBreakdown({ customer }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-950">Customer Friction Breakdown</h2>
        <p className="text-sm text-slate-600">{customer.name}</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={customer.frictionBreakdown} layout="vertical" margin={{ left: 18, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" domain={[0, 40]} tickLine={false} axisLine={false} />
            <YAxis
              type="category"
              dataKey="name"
              width={132}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} name="Debt Contribution">
              {customer.frictionBreakdown.map((entry, index) => (
                <Cell key={entry.name} fill={breakdownColors[index % breakdownColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
