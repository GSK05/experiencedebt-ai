const channels = ["Website", "Mobile App", "Email", "Support", "Store", "Chatbot"];

const metricKeys = [
  { key: "debtScore", label: "Channel Debt Score" },
  { key: "contextLoss", label: "Context Loss Events" },
  { key: "repeatedRequests", label: "Repeated Information Requests" },
  { key: "supportDelays", label: "Support Delays" },
  { key: "ignoredCommunications", label: "Ignored Communications" },
];

const customerHeatmaps = [
  {
    id: "portfolio",
    name: "All Customers",
    segment: "Portfolio",
    summary: "Highest accumulated debt is concentrated in Support and Chatbot handoffs.",
    channels: [
      {
        name: "Website",
        debtScore: 28,
        contextLoss: 4,
        repeatedRequests: 7,
        supportDelays: 2,
        ignoredCommunications: 6,
        contributors: [
          { name: "Checkout hesitation", value: 11 },
          { name: "Pricing confusion", value: 9 },
          { name: "Form retries", value: 8 },
        ],
      },
      {
        name: "Mobile App",
        debtScore: 34,
        contextLoss: 8,
        repeatedRequests: 9,
        supportDelays: 4,
        ignoredCommunications: 7,
        contributors: [
          { name: "Session timeout", value: 12 },
          { name: "Preference reset", value: 10 },
          { name: "Verification retry", value: 12 },
        ],
      },
      {
        name: "Email",
        debtScore: 39,
        contextLoss: 6,
        repeatedRequests: 5,
        supportDelays: 3,
        ignoredCommunications: 25,
        contributors: [
          { name: "Unopened recovery emails", value: 18 },
          { name: "Irrelevant campaigns", value: 14 },
          { name: "Late follow-up", value: 7 },
        ],
      },
      {
        name: "Support",
        debtScore: 72,
        contextLoss: 18,
        repeatedRequests: 12,
        supportDelays: 31,
        ignoredCommunications: 6,
        contributors: [
          { name: "Context Loss", value: 18 },
          { name: "Support Delay", value: 31 },
          { name: "Repeated Requests", value: 12 },
        ],
      },
      {
        name: "Store",
        debtScore: 21,
        contextLoss: 3,
        repeatedRequests: 4,
        supportDelays: 2,
        ignoredCommunications: 5,
        contributors: [
          { name: "Inventory mismatch", value: 8 },
          { name: "Receipt lookup", value: 5 },
          { name: "Manual verification", value: 8 },
        ],
      },
      {
        name: "Chatbot",
        debtScore: 64,
        contextLoss: 22,
        repeatedRequests: 20,
        supportDelays: 7,
        ignoredCommunications: 4,
        contributors: [
          { name: "Looped answers", value: 19 },
          { name: "Repeated identity checks", value: 20 },
          { name: "Failed handoff to human support", value: 25 },
        ],
      },
    ],
    trend: [
      { date: "Jun 10", Website: 18, "Mobile App": 25, Email: 28, Support: 52, Store: 15, Chatbot: 46 },
      { date: "Jun 11", Website: 20, "Mobile App": 27, Email: 31, Support: 57, Store: 17, Chatbot: 51 },
      { date: "Jun 12", Website: 22, "Mobile App": 29, Email: 33, Support: 63, Store: 19, Chatbot: 54 },
      { date: "Jun 13", Website: 24, "Mobile App": 31, Email: 35, Support: 66, Store: 20, Chatbot: 58 },
      { date: "Jun 14", Website: 25, "Mobile App": 32, Email: 37, Support: 69, Store: 20, Chatbot: 61 },
      { date: "Jun 15", Website: 27, "Mobile App": 33, Email: 38, Support: 71, Store: 21, Chatbot: 63 },
      { date: "Jun 16", Website: 28, "Mobile App": 34, Email: 39, Support: 72, Store: 21, Chatbot: 64 },
    ],
  },
  {
    id: "cus-1001",
    name: "Priya Shah",
    segment: "Mid-Market",
    summary: "Support and Email are compounding after checkout uncertainty.",
    channels: [
      { name: "Website", debtScore: 36, contextLoss: 4, repeatedRequests: 8, supportDelays: 2, ignoredCommunications: 5, contributors: [{ name: "Pricing confusion", value: 14 }, { name: "Checkout exit", value: 16 }, { name: "Form retry", value: 6 }] },
      { name: "Mobile App", debtScore: 24, contextLoss: 5, repeatedRequests: 6, supportDelays: 2, ignoredCommunications: 4, contributors: [{ name: "Session timeout", value: 8 }, { name: "Preference reset", value: 7 }, { name: "Low mobile usage", value: 9 }] },
      { name: "Email", debtScore: 58, contextLoss: 7, repeatedRequests: 6, supportDelays: 5, ignoredCommunications: 33, contributors: [{ name: "Ignored recovery email", value: 21 }, { name: "Irrelevant campaign", value: 14 }, { name: "Late follow-up", value: 23 }] },
      { name: "Support", debtScore: 82, contextLoss: 24, repeatedRequests: 15, supportDelays: 34, ignoredCommunications: 5, contributors: [{ name: "Context Loss", value: 24 }, { name: "Support Delay", value: 34 }, { name: "Repeated Requests", value: 15 }] },
      { name: "Store", debtScore: 12, contextLoss: 1, repeatedRequests: 2, supportDelays: 1, ignoredCommunications: 2, contributors: [{ name: "Low activity", value: 6 }, { name: "Receipt lookup", value: 3 }, { name: "Manual check", value: 3 }] },
      { name: "Chatbot", debtScore: 69, contextLoss: 22, repeatedRequests: 25, supportDelays: 8, ignoredCommunications: 3, contributors: [{ name: "Repeated identity checks", value: 25 }, { name: "Failed handoff", value: 22 }, { name: "Looped answer", value: 22 }] },
    ],
    trend: [
      { date: "Jun 10", Website: 20, "Mobile App": 18, Email: 28, Support: 48, Store: 8, Chatbot: 39 },
      { date: "Jun 11", Website: 24, "Mobile App": 19, Email: 34, Support: 56, Store: 9, Chatbot: 47 },
      { date: "Jun 12", Website: 28, "Mobile App": 20, Email: 41, Support: 65, Store: 10, Chatbot: 55 },
      { date: "Jun 13", Website: 31, "Mobile App": 21, Email: 49, Support: 72, Store: 11, Chatbot: 61 },
      { date: "Jun 14", Website: 34, "Mobile App": 22, Email: 54, Support: 78, Store: 11, Chatbot: 66 },
      { date: "Jun 15", Website: 35, "Mobile App": 23, Email: 56, Support: 81, Store: 12, Chatbot: 68 },
      { date: "Jun 16", Website: 36, "Mobile App": 24, Email: 58, Support: 82, Store: 12, Chatbot: 69 },
    ],
  },
  {
    id: "cus-1002",
    name: "Daniel Lee",
    segment: "Enterprise",
    summary: "Mobile App and Support friction are tied to role setup complexity.",
    channels: [
      { name: "Website", debtScore: 18, contextLoss: 3, repeatedRequests: 4, supportDelays: 1, ignoredCommunications: 4, contributors: [{ name: "Docs search", value: 7 }, { name: "Plan comparison", value: 5 }, { name: "Form retry", value: 6 }] },
      { name: "Mobile App", debtScore: 52, contextLoss: 12, repeatedRequests: 18, supportDelays: 5, ignoredCommunications: 6, contributors: [{ name: "Role reset", value: 18 }, { name: "Admin retry", value: 20 }, { name: "Permission mismatch", value: 14 }] },
      { name: "Email", debtScore: 26, contextLoss: 4, repeatedRequests: 3, supportDelays: 4, ignoredCommunications: 12, contributors: [{ name: "Unread setup tip", value: 10 }, { name: "Delayed summary", value: 8 }, { name: "Generic campaign", value: 8 }] },
      { name: "Support", debtScore: 67, contextLoss: 14, repeatedRequests: 17, supportDelays: 26, ignoredCommunications: 4, contributors: [{ name: "Permission answer delay", value: 26 }, { name: "Repeated configuration", value: 17 }, { name: "Context handoff", value: 14 }] },
      { name: "Store", debtScore: 8, contextLoss: 1, repeatedRequests: 1, supportDelays: 1, ignoredCommunications: 1, contributors: [{ name: "No store dependency", value: 4 }, { name: "Low activity", value: 2 }, { name: "No escalation", value: 2 }] },
      { name: "Chatbot", debtScore: 35, contextLoss: 10, repeatedRequests: 9, supportDelays: 5, ignoredCommunications: 2, contributors: [{ name: "Admin article loop", value: 13 }, { name: "Bot escalation", value: 12 }, { name: "Repeated prompt", value: 10 }] },
    ],
    trend: [
      { date: "Jun 10", Website: 15, "Mobile App": 28, Email: 19, Support: 42, Store: 5, Chatbot: 20 },
      { date: "Jun 11", Website: 16, "Mobile App": 33, Email: 20, Support: 48, Store: 6, Chatbot: 24 },
      { date: "Jun 12", Website: 17, "Mobile App": 38, Email: 22, Support: 54, Store: 7, Chatbot: 27 },
      { date: "Jun 13", Website: 17, "Mobile App": 44, Email: 23, Support: 60, Store: 7, Chatbot: 30 },
      { date: "Jun 14", Website: 18, "Mobile App": 48, Email: 24, Support: 64, Store: 8, Chatbot: 33 },
      { date: "Jun 15", Website: 18, "Mobile App": 51, Email: 25, Support: 66, Store: 8, Chatbot: 34 },
      { date: "Jun 16", Website: 18, "Mobile App": 52, Email: 26, Support: 67, Store: 8, Chatbot: 35 },
    ],
  },
];

function createInvestigation(channel) {
  const sharedFindings = {
    observation: `Detected ${channel.name.toLowerCase()} interactions contributing to experience debt.`,
    rootCause: `${channel.name} friction is accumulating from unresolved journey handoffs.`,
    prediction: "Churn risk increased by 8% over the last 7 days.",
    resolution: `Prioritize a ${channel.name.toLowerCase()} recovery action for impacted customers.`,
  };

  const defaults = {
    "Website": {
      frictionEvents: [
        "Pricing page revisited multiple times",
        "Checkout form abandoned before completion",
        "Help article opened during purchase flow",
      ],
      rootCauses: [
        "Plan limits were unclear during checkout",
        "Customer could not find setup cost details",
        "Form validation forced repeated corrections",
      ],
      agentFindings: {
        ...sharedFindings,
        observation: "Detected high-intent visits followed by checkout exits.",
        rootCause: "Pricing uncertainty created a break in the conversion journey.",
        prediction: "Conversion probability dropped by 9%.",
        resolution: "Show plan guidance and trigger assisted checkout recovery.",
      },
    },
    "Mobile App": {
      frictionEvents: [
        "Session expired during setup",
        "Preference settings reset after login",
        "Identity verification repeated",
      ],
      rootCauses: [
        "Mobile session continuity is unstable",
        "Saved preferences did not persist across devices",
        "Verification flow asked for repeated details",
      ],
      agentFindings: {
        ...sharedFindings,
        observation: "Detected mobile setup retries and repeated verification steps.",
        rootCause: "Session continuity loss increased journey effort.",
        prediction: "Activation risk increased by 7%.",
        resolution: "Persist setup state and reduce repeated verification prompts.",
      },
    },
    "Email": {
      frictionEvents: [
        "Recovery email ignored",
        "Generic campaign sent during unresolved issue",
        "Lifecycle email opened with no click",
      ],
      rootCauses: [
        "Email content did not reflect the active customer problem",
        "Recovery message arrived after the support window",
        "Campaign suppression rules were not applied",
      ],
      agentFindings: {
        ...sharedFindings,
        observation: "Detected ignored recovery communication and low engagement.",
        rootCause: "Message relevance dropped while customer friction was unresolved.",
        prediction: "Recovery probability decreased by 11%.",
        resolution: "Pause generic campaigns and send contextual recovery messaging.",
      },
    },
    "Support": {
      frictionEvents: [
        "Customer repeated issue 3 times",
        "Support response delayed 48 hours",
        "Ticket reassigned twice",
      ],
      rootCauses: [
        "Customer repeated issue 3 times",
        "Support response delayed 48 hours",
        "Ticket reassigned twice",
      ],
      agentFindings: {
        observation: "Detected repeated support interactions.",
        rootCause: "Context loss between ticket handoffs.",
        prediction: "Churn risk increased by 12%.",
        resolution: "Assign dedicated case manager.",
      },
    },
    "Store": {
      frictionEvents: [
        "Inventory lookup did not match online status",
        "Receipt lookup required manual verification",
        "Store visit did not sync with customer profile",
      ],
      rootCauses: [
        "Offline and online records were not fully synchronized",
        "Store associate lacked prior journey context",
        "Manual lookup increased customer effort",
      ],
      agentFindings: {
        ...sharedFindings,
        observation: "Detected store activity with low but visible journey effort.",
        rootCause: "Store systems did not receive complete digital journey context.",
        prediction: "In-store recovery opportunity remains positive.",
        resolution: "Sync recent digital interactions into store associate view.",
      },
    },
    "Chatbot": {
      frictionEvents: [
        "Bot repeated identity questions",
        "Customer received looped answers",
        "Human handoff failed after unresolved intent",
      ],
      rootCauses: [
        "Bot could not classify the customer issue",
        "Handoff summary was missing when escalation started",
        "Customer had to restate intent after escalation",
      ],
      agentFindings: {
        ...sharedFindings,
        observation: "Detected repeated chatbot turns before human escalation.",
        rootCause: "Bot-to-human handoff dropped customer context.",
        prediction: "Self-service abandonment risk increased by 10%.",
        resolution: "Attach bot conversation summary to the support handoff.",
      },
    },
  };

  return defaults[channel.name] || {
    frictionEvents: ["Friction event detected"],
    rootCauses: ["Root cause analysis pending"],
    agentFindings: sharedFindings,
  };
}

function enrichCustomerHeatmap(customer) {
  return {
    ...customer,
    channels: customer.channels.map((channel) => ({
      ...channel,
      investigation: createInvestigation(channel),
    })),
  };
}

export function getExperienceDebtHeatmapData() {
  return {
    channels,
    metricKeys,
    customers: customerHeatmaps.map(enrichCustomerHeatmap),
  };
}
