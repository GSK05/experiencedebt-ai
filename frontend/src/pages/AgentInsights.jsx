import { useState } from "react";

const agentRuns = [
  {
    name: "Observation Agent",
    status: "complete",
    confidence: 96,
    accent: "blue",
    input: [
      "Website visit on Day 1",
      "Cart abandonment on Day 2",
      "Support ticket on Day 3",
      "Ignored email on Day 4",
      "Debt score movement through Day 7",
    ],
    reasoning:
      "The customer journey shows a clear escalation path from purchase intent to unresolved friction. The agent groups web, checkout, support, and email events into one continuous journey instead of treating them as isolated channel events.",
    output: [
      "Journey stage: conversion recovery",
      "Primary channels: Web, Checkout, Support, Email",
      "Friction sequence detected",
    ],
  },
  {
    name: "Debt Detection Agent",
    status: "complete",
    confidence: 91,
    accent: "rose",
    input: [
      "Context signals from support interaction",
      "Support delay and ticket creation",
      "Ignored communication event",
      "Journey complexity from checkout abandonment",
    ],
    reasoning:
      "The weighted debt model attributes the largest impact to support delay and ignored communication. The debt score increases because friction continues across multiple days without a recovery event.",
    output: [
      "Experience Debt Score: 88",
      "Risk level: high",
      "Top contributors: Support Delay, Ignored Communications, Journey Complexity",
    ],
  },
  {
    name: "Root Cause Agent",
    status: "complete",
    confidence: 88,
    accent: "amber",
    input: [
      "Debt Detection Agent contributors",
      "Timeline event descriptions",
      "Channel transition history",
      "Customer recovery signals",
    ],
    reasoning:
      "The customer showed initial buying intent, but checkout uncertainty created a support dependency. The follow-up email failed to recover the journey, which caused the unresolved support issue to compound into experience debt.",
    output: [
      "Root cause: unresolved purchase uncertainty",
      "Secondary cause: missed recovery communication",
      "Operational gap: support-to-email follow-up did not restore momentum",
    ],
  },
  {
    name: "Prediction Agent",
    status: "complete",
    confidence: 84,
    accent: "violet",
    input: [
      "Current EDS: 88",
      "No positive recovery event after Day 4",
      "High-friction sequence across four customer touchpoints",
      "Ignored follow-up communication",
    ],
    reasoning:
      "The customer is likely to disengage because their last meaningful interaction was a support request followed by non-engagement. Without intervention, the model expects conversion probability to drop sharply over the next week.",
    output: [
      "Predicted churn or drop-off risk: 74%",
      "Recovery probability: 28%",
      "Recommended intervention window: next 24 hours",
    ],
  },
  {
    name: "Resolution Agent",
    status: "ready",
    confidence: 89,
    accent: "emerald",
    input: [
      "Root cause summary",
      "Predicted churn risk",
      "Customer journey timeline",
      "Available support and marketing actions",
    ],
    reasoning:
      "The best action is a coordinated recovery playbook, not a generic campaign. The customer needs a direct answer to the checkout concern, a support owner, and a contextual message that acknowledges the prior ticket.",
    output: [
      "Assign a support owner",
      "Send a personalized checkout recovery email",
      "Suppress generic campaigns for 7 days",
      "Offer assisted setup or billing clarification",
    ],
  },
];

const accentClasses = {
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  rose: "border-rose-200 bg-rose-50 text-rose-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  violet: "border-violet-200 bg-violet-50 text-violet-700",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const dotClasses = {
  blue: "bg-blue-600",
  rose: "bg-rose-600",
  amber: "bg-amber-600",
  violet: "bg-violet-600",
  emerald: "bg-emerald-600",
};

export default function AgentInsights({ customer }) {
  const [selectedAgentName, setSelectedAgentName] = useState(agentRuns[0].name);
  const selectedAgent =
    agentRuns.find((agent) => agent.name === selectedAgentName) || agentRuns[0];

  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-panel">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-blue-300">
              AI Control Center
            </p>
            <h2 className="mt-1 text-2xl font-semibold">Agent Insights</h2>
            <p className="mt-2 text-sm text-slate-300">
              {customer.name} · Experience Debt investigation
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:min-w-96">
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="text-xs font-semibold uppercase tracking-normal text-slate-400">Active Agents</p>
              <p className="mt-1 text-2xl font-semibold">{agentRuns.length}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="text-xs font-semibold uppercase tracking-normal text-slate-400">Avg Confidence</p>
              <p className="mt-1 text-2xl font-semibold">90%</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="text-xs font-semibold uppercase tracking-normal text-slate-400">Case Risk</p>
              <p className="mt-1 text-2xl font-semibold">High</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-5">
        {agentRuns.map((agent, index) => (
          <button
            key={agent.name}
            type="button"
            onClick={() => setSelectedAgentName(agent.name)}
            className={`rounded-lg border bg-white p-4 text-left shadow-panel transition hover:-translate-y-0.5 hover:border-blue-300 ${
              selectedAgent.name === agent.name ? "border-blue-700 ring-2 ring-blue-100" : "border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className={`h-3 w-3 rounded-full ${dotClasses[agent.accent]}`} />
              <span className="text-xs font-semibold text-slate-500">0{index + 1}</span>
            </div>
            <h3 className="mt-4 min-h-12 text-base font-semibold text-slate-950">{agent.name}</h3>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className={`rounded-md border px-2 py-1 text-xs font-semibold ${accentClasses[agent.accent]}`}>
                {agent.status}
              </span>
              <span className="text-sm font-semibold text-slate-700">{agent.confidence}%</span>
            </div>
          </button>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
          <h3 className="text-base font-semibold text-slate-950">Pipeline Trace</h3>
          <div className="mt-5 grid gap-0">
            {agentRuns.map((agent, index) => (
              <button
                key={agent.name}
                type="button"
                onClick={() => setSelectedAgentName(agent.name)}
                className="grid grid-cols-[28px_1fr] gap-3 text-left"
              >
                <span className="flex flex-col items-center">
                  <span
                    className={`h-7 w-7 rounded-full border-2 ${
                      selectedAgent.name === agent.name
                        ? "border-blue-700 bg-blue-700"
                        : "border-slate-300 bg-white"
                    }`}
                  />
                  {index < agentRuns.length - 1 && <span className="h-12 w-0.5 bg-slate-200" />}
                </span>
                <span className="pb-5">
                  <span className="block text-sm font-semibold text-slate-950">{agent.name}</span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {agent.status} · {agent.confidence}% confidence
                  </span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <article className="rounded-lg border border-slate-200 bg-white shadow-panel">
          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-700">Selected Agent</p>
                <h3 className="mt-1 text-2xl font-semibold text-slate-950">{selectedAgent.name}</h3>
              </div>
              <span className={`w-fit rounded-md border px-3 py-1 text-sm font-semibold ${accentClasses[selectedAgent.accent]}`}>
                {selectedAgent.confidence}% confidence
              </span>
            </div>
          </div>

          <div className="grid gap-5 p-5 xl:grid-cols-3">
            <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-sm font-semibold uppercase tracking-normal text-slate-500">Input</h4>
              <div className="mt-4 grid gap-2">
                {selectedAgent.input.map((item) => (
                  <div key={item} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-sm font-semibold uppercase tracking-normal text-slate-500">Reasoning</h4>
              <p className="mt-4 text-sm leading-6 text-slate-700">{selectedAgent.reasoning}</p>
            </section>

            <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-sm font-semibold uppercase tracking-normal text-slate-500">Output</h4>
              <div className="mt-4 grid gap-2">
                {selectedAgent.output.map((item) => (
                  <div key={item} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800">
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-950">Recommended Actions</h3>
            <p className="mt-1 text-sm text-slate-600">Generated by the Resolution Agent</p>
          </div>
          <span className="w-fit rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
            Ready for review
          </span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {customer.recommendations.map((recommendation) => (
            <div key={recommendation} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              {recommendation}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
