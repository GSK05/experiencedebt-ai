import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getExperienceDebtHeatmapData } from "../data/heatmapMockApi";

function frictionTone(value) {
  if (value >= 65) {
    return {
      fill: "#dc2626",
      text: "text-rose-700",
      bg: "bg-rose-50",
      border: "border-rose-200",
      label: "High friction",
    };
  }

  if (value >= 35) {
    return {
      fill: "#f59e0b",
      text: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      label: "Medium friction",
    };
  }

  return {
    fill: "#16a34a",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    label: "Healthy",
  };
}

function HeatmapShape(props) {
  const { cx, cy, payload } = props;
  const size = 48;
  const tone = frictionTone(payload.value);

  return (
    <g>
      <rect
        x={cx - size / 2}
        y={cy - size / 2}
        width={size}
        height={size}
        rx={8}
        fill={tone.fill}
        opacity={0.22 + Math.min(payload.value, 100) / 130}
      />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fill={payload.value >= 65 ? "#ffffff" : "#172033"}
        fontSize={13}
        fontWeight={700}
      >
        {payload.value}
      </text>
    </g>
  );
}

function HeatmapTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null;
  }

  const cell = payload[0].payload;
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-panel">
      <p className="font-semibold text-slate-950">{cell.channel}</p>
      <p className="text-sm text-slate-600">{cell.metric}</p>
      <p className="mt-1 text-lg font-semibold text-slate-950">{cell.value}</p>
    </div>
  );
}

function buildHeatmapCells(customer, metricKeys) {
  return customer.channels.flatMap((channel, channelIndex) =>
    metricKeys.map((metric, metricIndex) => ({
      x: channelIndex,
      y: metricKeys.length - 1 - metricIndex,
      value: channel[metric.key],
      channel: channel.name,
      metric: metric.label,
    })),
  );
}

export default function ExperienceDebtHeatmap() {
  const data = useMemo(() => getExperienceDebtHeatmapData(), []);
  const [selectedCustomerId, setSelectedCustomerId] = useState(data.customers[0].id);
  const [selectedChannelName, setSelectedChannelName] = useState("Support");

  const selectedCustomer =
    data.customers.find((customer) => customer.id === selectedCustomerId) || data.customers[0];
  const selectedChannel =
    selectedCustomer.channels.find((channel) => channel.name === selectedChannelName) ||
    selectedCustomer.channels[0];
  const heatmapCells = buildHeatmapCells(selectedCustomer, data.metricKeys);
  const highestDebtChannel = selectedCustomer.channels.reduce((highest, channel) =>
    channel.debtScore > highest.debtScore ? channel : highest,
  );
  const averageDebt = Math.round(
    selectedCustomer.channels.reduce((sum, channel) => sum + channel.debtScore, 0) /
      selectedCustomer.channels.length,
  );

  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
        <div className="grid gap-4 lg:grid-cols-[1fr_280px] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-blue-700">
              Flagship Visualization
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">
              Experience Debt Heatmap
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Where is customer friction coming from? Compare accumulated debt across
              channels, then drill into the touchpoints causing the score to rise.
            </p>
          </div>
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Customer</span>
            <select
              value={selectedCustomerId}
              onChange={(event) => {
                const nextCustomer = data.customers.find(
                  (customer) => customer.id === event.target.value,
                );
                setSelectedCustomerId(event.target.value);
                setSelectedChannelName(nextCustomer?.channels[0].name || "Website");
              }}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {data.customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
          <p className="text-sm font-medium text-slate-600">Average Channel Debt</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{averageDebt}</p>
        </div>
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 shadow-panel">
          <p className="text-sm font-medium text-rose-700">Highest Friction Channel</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{highestDebtChannel.name}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
          <p className="text-sm font-medium text-slate-600">Executive Readout</p>
          <p className="mt-3 text-sm leading-6 text-slate-700">{selectedCustomer.summary}</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-950">
                Channel Friction Heatmap
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Red is high friction, yellow is medium, green is healthy.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-emerald-700">Healthy</span>
              <span className="rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-amber-700">Medium</span>
              <span className="rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-rose-700">High</span>
            </div>
          </div>
          <div className="h-[430px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 18, bottom: 28, left: 168 }}>
                <CartesianGrid stroke="#e2e8f0" vertical={false} />
                <XAxis
                  type="number"
                  dataKey="x"
                  domain={[-0.5, data.channels.length - 0.5]}
                  ticks={data.channels.map((_, index) => index)}
                  tickFormatter={(value) => data.channels[value] || ""}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  domain={[-0.5, data.metricKeys.length - 0.5]}
                  ticks={data.metricKeys.map((_, index) => index)}
                  tickFormatter={(value) => {
                    const metricIndex = data.metricKeys.length - 1 - value;
                    return data.metricKeys[metricIndex]?.label || "";
                  }}
                  tickLine={false}
                  axisLine={false}
                  width={160}
                  interval={0}
                />
                <Tooltip content={<HeatmapTooltip />} cursor={{ stroke: "#2563eb", strokeWidth: 1 }} />
                <Scatter
                  data={heatmapCells}
                  shape={<HeatmapShape />}
                  onClick={(cell) => setSelectedChannelName(cell.channel)}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-blue-700">Selected Channel</p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-950">
                {selectedChannel.name}
              </h3>
            </div>
            <span
              className={`rounded-md border px-3 py-1 text-sm font-semibold ${
                frictionTone(selectedChannel.debtScore).bg
              } ${frictionTone(selectedChannel.debtScore).border} ${
                frictionTone(selectedChannel.debtScore).text
              }`}
            >
              {frictionTone(selectedChannel.debtScore).label}
            </span>
          </div>

          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-600">Channel Debt Score</p>
            <p className="mt-2 text-4xl font-semibold text-slate-950">
              {selectedChannel.debtScore}
            </p>
          </div>

          <div className="mt-5 grid gap-3">
            {[
              ["Context Loss Events", selectedChannel.contextLoss],
              ["Repeated Information Requests", selectedChannel.repeatedRequests],
              ["Support Delays", selectedChannel.supportDelays],
              ["Ignored Communications", selectedChannel.ignoredCommunications],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-slate-600">{label}</span>
                  <span className="font-semibold text-slate-950">{value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${Math.min(value * 3, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
          <h3 className="text-base font-semibold text-slate-950">Detailed Debt Contributors</h3>
          <p className="mt-1 text-sm text-slate-600">
            Click any channel in the heatmap to update this breakdown.
          </p>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={selectedChannel.contributors} layout="vertical" margin={{ left: 18, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={142}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} name="Contributor Score">
                  {selectedChannel.contributors.map((entry) => (
                    <Cell key={entry.name} fill={frictionTone(entry.value * 3).fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-950">
                Debt Accumulation Over Time
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Channel-level debt trend for {selectedCustomer.name}.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCustomer.channels.map((channel) => (
                <button
                  key={channel.name}
                  type="button"
                  onClick={() => setSelectedChannelName(channel.name)}
                  className={`rounded-md border px-2 py-1 text-xs font-semibold transition ${
                    selectedChannel.name === channel.name
                      ? "border-blue-700 bg-blue-700 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                  }`}
                >
                  {channel.name}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedCustomer.trend} margin={{ top: 8, right: 16, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={selectedChannel.name}
                  stroke={frictionTone(selectedChannel.debtScore).fill}
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  name={`${selectedChannel.name} Debt`}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
