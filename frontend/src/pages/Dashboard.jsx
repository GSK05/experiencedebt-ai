import CustomerList from "../components/CustomerList";
import MetricCard from "../components/MetricCard";
import DebtTrendChart from "../components/charts/DebtTrendChart";
import FrictionBreakdown from "../components/charts/FrictionBreakdown";

export default function Dashboard({ data, selectedCustomer, setSelectedCustomerId }) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Average Experience Debt Score"
          value={data.metrics.averageEds}
          detail={`${data.metrics.customerCount} customers`}
        />
        <MetricCard
          label="High Risk Customers"
          value={data.metrics.highRiskCount}
          detail="Need intervention"
          tone="danger"
        />
        <MetricCard
          label="Average Recovery Probability"
          value={`${data.metrics.recoveryAverage}%`}
          detail="Across portfolio"
          tone="success"
        />
        <MetricCard
          label="Selected Customer EDS"
          value={selectedCustomer.eds}
          detail={selectedCustomer.name}
          tone="warning"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <CustomerList
          customers={data.customers}
          selectedCustomer={selectedCustomer}
          onSelectCustomer={setSelectedCustomerId}
        />
        <div className="grid gap-6 xl:grid-cols-2">
          <DebtTrendChart data={data.debtTrend} />
          <FrictionBreakdown customer={selectedCustomer} />
        </div>
      </div>
    </div>
  );
}
