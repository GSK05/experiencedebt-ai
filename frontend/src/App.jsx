import { useMemo, useState } from "react";

import { getDashboardData } from "./data/mockApi";
import AgentInsights from "./pages/AgentInsights";
import CustomerDetails from "./pages/CustomerDetails";
import Dashboard from "./pages/Dashboard";
import ExperienceDebtHeatmap from "./pages/ExperienceDebtHeatmap";
import JourneyTimeline from "./pages/JourneyTimeline";

function AppShell({ page, setPage, children }) {
  const navItems = [
    "Dashboard",
    "Experience Debt Heatmap",
    "Customer Details",
    "Journey Timeline",
    "Agent Insights",
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-blue-700">
              ExperienceDebt AI
            </p>
            <h1 className="text-2xl font-semibold text-slate-950">
              Detect friction before customers disappear.
            </h1>
          </div>
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPage(item)}
                className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                  page === item
                    ? "border-blue-700 bg-blue-700 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

export default function App() {
  const data = useMemo(() => getDashboardData(), []);
  const [page, setPage] = useState("Dashboard");
  const [selectedCustomerId, setSelectedCustomerId] = useState(data.customers[0].id);
  const selectedCustomer = data.customers.find((customer) => customer.id === selectedCustomerId) || data.customers[0];

  return (
    <AppShell page={page} setPage={setPage}>
      {page === "Dashboard" && (
        <Dashboard
          data={data}
          selectedCustomer={selectedCustomer}
          setSelectedCustomerId={setSelectedCustomerId}
        />
      )}
      {page === "Experience Debt Heatmap" && <ExperienceDebtHeatmap />}
      {page === "Customer Details" && <CustomerDetails customer={selectedCustomer} />}
      {page === "Journey Timeline" && <JourneyTimeline customer={selectedCustomer} />}
      {page === "Agent Insights" && <AgentInsights customer={selectedCustomer} />}
    </AppShell>
  );
}
