export function riskClass(riskLevel) {
  if (riskLevel === "high") {
    return "bg-rose-50 text-rose-700 ring-rose-200";
  }

  if (riskLevel === "medium") {
    return "bg-amber-50 text-amber-700 ring-amber-200";
  }

  return "bg-emerald-50 text-emerald-700 ring-emerald-200";
}

export function frictionLabel(friction) {
  const labels = {
    context_loss: "Context Loss",
    support_delay: "Support Delay",
    ignored_communications: "Ignored Communications",
    journey_complexity: "Journey Complexity",
    none: "No Friction",
  };

  return labels[friction] || friction;
}
