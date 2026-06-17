import { riskClass } from "../utils/formatters";

export default function CustomerList({ customers, selectedCustomer, onSelectCustomer }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-panel">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-base font-semibold text-slate-950">Customers</h2>
      </div>
      <div className="divide-y divide-slate-100">
        {customers.map((customer) => (
          <button
            key={customer.id}
            type="button"
            onClick={() => onSelectCustomer(customer.id)}
            className={`grid w-full grid-cols-[1fr_auto] gap-3 px-4 py-3 text-left transition hover:bg-slate-50 ${
              selectedCustomer.id === customer.id ? "bg-blue-50" : "bg-white"
            }`}
          >
            <span>
              <span className="block font-medium text-slate-950">{customer.name}</span>
              <span className="block text-sm text-slate-600">
                {customer.company} · {customer.segment}
              </span>
            </span>
            <span className="text-right">
              <span className="block text-lg font-semibold text-slate-950">{customer.eds}</span>
              <span
                className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ring-1 ${riskClass(
                  customer.riskLevel,
                )}`}
              >
                {customer.riskLevel}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
