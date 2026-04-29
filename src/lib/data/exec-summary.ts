import type { ScenarioId } from "./scenarios";

export type ExecStatus = "high" | "watch" | "ok";

export interface ExecKpi {
  label: string;
  value: string;
  trend?: string;
}

export interface ExecAction {
  icon: "mail" | "teams" | "calendar" | "doc";
  label: string;
  detail: string;
}

export interface ExecSummaryItem {
  scenarioId: ScenarioId;
  domain: string;
  headline: string;
  status: ExecStatus;
  statusLabel: string;
  topline: ExecKpi[];
  decisionsNeeded: string[];
  calendarHook: {
    when: string;
    with: string;
    what: string;
  };
  bottomLine: string;
  actions: ExecAction[];
}

export const EXEC_SUMMARY: ExecSummaryItem[] = [
  {
    scenarioId: "supply-chain",
    domain: "Oracle Fusion SCM · Procurement",
    headline: "EMEA Q3 supply chain — $47.2M exposed, $18.6M mitigatable inside the quarter",
    status: "high",
    statusLabel: "Decision needed today",
    topline: [
      { label: "Q3 EMEA exposure", value: "$47.2M", trend: "+6.1% QoQ" },
      { label: "Mitigatable in Q3", value: "$18.6M" },
      { label: "Top-3 concentration", value: "38%", trend: "+4 pts" },
      { label: "On-time delivery", value: "87%", trend: "↓ 7 pts" },
    ],
    decisionsNeeded: [
      "Approve 25% volume shift from Adriatica to Nordic Forge — $2.1M risk averted.",
      "Approve a 6-week Iberia → Rotterdam re-route pilot — $0.7M risk averted.",
      "Confirm escalation thresholds for the Helvetia SLA refresh.",
    ],
    calendarHook: {
      when: "Tomorrow 10:00",
      with: "EMEA ops sync · Maria Chen, Tomás Ruiz",
      what: "Three decision items already on the agenda",
    },
    bottomLine:
      "Lead with the Adriatica dual-source. Maria already flagged it last Thursday; Nordic Forge has capacity.",
    actions: [
      {
        icon: "mail",
        label: "Email Maria Chen",
        detail: "Green-light for tomorrow on the Adriatica 25% shift",
      },
      {
        icon: "teams",
        label: "Teams · Tomás Ruiz",
        detail: "Heads-up on the Iberia re-route pilot ask",
      },
      {
        icon: "calendar",
        label: "Pre-fill 10:00 agenda",
        detail: "Three decisions, owners, and projected $ impact",
      },
    ],
  },
  {
    scenarioId: "workforce",
    domain: "Oracle Fusion HCM · Recruiting",
    headline: "Workforce — 5 of 14 reqs at risk for FY close, 3 recoverable with a clean call this week",
    status: "watch",
    statusLabel: "Decisions due Friday",
    topline: [
      { label: "Open reqs", value: "14" },
      { label: "At risk for FY close", value: "5" },
      { label: "Recoverable", value: "3", trend: "with action" },
      { label: "Pipeline coverage", value: "3.4×", trend: "↓ from 4.6×" },
    ],
    decisionsNeeded: [
      "Re-scope the Staff DS req into two P5 hires — pipeline math doesn't close at P6.",
      "Approve internal mobility for Aisha into the Eng Manager role.",
      "Greenlight the Sr. Platform Eng offer this week (FYI to Diego).",
    ],
    calendarHook: {
      when: "Friday 09:30",
      with: "Hiring review with Diego (skip)",
      what: "FY-close commits — bring the two re-scopes",
    },
    bottomLine:
      "The two recoveries (Staff DS split + Aisha internal move) protect FY-close on the most strategic roles.",
    actions: [
      {
        icon: "calendar",
        label: "1:1 agenda for Aisha",
        detail: "Tomorrow 14:00 — confirm interest, scope, mobility timeline",
      },
      {
        icon: "mail",
        label: "Email Diego",
        detail: "Friday pre-read: 5 at-risk reqs, action per req, two asks",
      },
      {
        icon: "teams",
        label: "Teams · Janelle (Talent)",
        detail: "Re-post REQ-44188 as 2× P5 by Wednesday",
      },
    ],
  },
  {
    scenarioId: "customer-health",
    domain: "Oracle Fusion CX · Service",
    headline: "Customer health — $6.0M ARR at risk, $4.6M recoverable with the right plays this quarter",
    status: "high",
    statusLabel: "Action this week",
    topline: [
      { label: "ARR at risk", value: "$6.0M" },
      { label: "Recoverable", value: "$4.6M" },
      { label: "Accounts to act on", value: "4" },
      { label: "Confidence (avg)", value: "0.78" },
    ],
    decisionsNeeded: [
      "Northwind: lead with value review at Thursday's QBR; offer exec sponsor intro to new VP Ops.",
      "Contoso: align with Liam Wednesday on the joint resolution plan before Friday's CXO call.",
      "Tailwind & Fabrikam: schedule next week — champion replacement and adoption sprint.",
    ],
    calendarHook: {
      when: "Thursday 11:00",
      with: "Northwind QBR",
      what: "Value review already on the agenda",
    },
    bottomLine:
      "Northwind is the highest-value save and you're already in the room Thursday — that's where the week gets won.",
    actions: [
      {
        icon: "mail",
        label: "Email Northwind VP Ops",
        detail: "Value review pre-read ahead of Thursday's QBR",
      },
      {
        icon: "teams",
        label: "Teams · Liam (CS)",
        detail: "Loop in on Contoso joint resolution plan, prep Wed",
      },
      {
        icon: "calendar",
        label: "Pre-fill Northwind QBR",
        detail: "Value review · sponsor intro · renewal close",
      },
    ],
  },
];

export interface ExecOverall {
  totalAtRisk: string;
  recoverable: string;
  decisionsBundled: number;
  actionsDrafted: number;
}

export const EXEC_OVERALL: ExecOverall = {
  totalAtRisk: "$53.2M + $6.0M ARR",
  recoverable: "$23.2M + $4.6M ARR",
  decisionsBundled: 9,
  actionsDrafted: 9,
};
