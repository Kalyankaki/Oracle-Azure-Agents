import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  FileText,
  Mail,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Sunrise,
} from "lucide-react";
import {
  EXEC_OVERALL,
  EXEC_SUMMARY,
  type ExecAction,
  type ExecStatus,
} from "@/lib/data/exec-summary";
import { SCENARIO_BY_ID } from "@/lib/data/scenarios";
import { cn } from "@/lib/utils";

const ACTION_ICONS: Record<ExecAction["icon"], typeof Mail> = {
  mail: Mail,
  teams: MessagesSquare,
  calendar: CalendarClock,
  doc: FileText,
};

const STATUS_STYLES: Record<
  ExecStatus,
  { pill: string; bar: string; icon: typeof AlertTriangle }
> = {
  high: {
    pill: "border-oracle-red/40 bg-oracle-red/15 text-oracle-red",
    bar: "from-oracle-red/60 to-oracle-red/0",
    icon: AlertTriangle,
  },
  watch: {
    pill: "border-iq-yellow/40 bg-iq-yellow/15 text-iq-yellow",
    bar: "from-iq-yellow/60 to-iq-yellow/0",
    icon: AlertTriangle,
  },
  ok: {
    pill: "border-iq-teal/40 bg-iq-teal/15 text-iq-teal",
    bar: "from-iq-teal/60 to-iq-teal/0",
    icon: CheckCircle2,
  },
};

export default function ExecSummaryPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="rounded-2xl border border-white/10 bg-navy-900/60 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-iq-yellow/20 to-iq-teal/20 text-iq-yellow">
            <Sunrise className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Exec briefing · Tuesday morning
            </div>
            <div className="text-base font-semibold tracking-tight">
              Three things on your plate today, Priya
            </div>
            <p className="mt-1 max-w-3xl text-[13px] leading-relaxed text-white/80">
              Drawn from Oracle Fusion via the Fabric semantic model, reasoned by the
              Foundry agent, and personalized to your role, calendar, and collaborators
              through Microsoft Graph. Every aggregate is grounded — Purview lineage
              attached.
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-lg border border-iq-purple/30 bg-iq-purple/10 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-iq-purple md:flex">
            <ShieldCheck className="h-3.5 w-3.5" /> Purview governed
          </div>
        </div>
      </div>

      {/* Overall KPIs */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {[
          { label: "Total at risk", value: EXEC_OVERALL.totalAtRisk },
          { label: "Recoverable this quarter", value: EXEC_OVERALL.recoverable },
          { label: "Decisions bundled", value: String(EXEC_OVERALL.decisionsBundled) },
          { label: "Actions drafted, ready to send", value: String(EXEC_OVERALL.actionsDrafted) },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-xl border border-white/10 bg-navy-900/60 p-3"
          >
            <div className="font-mono text-[9px] uppercase tracking-widest text-muted">
              {k.label}
            </div>
            <div className="mt-1 text-base font-semibold tracking-tight md:text-lg">
              {k.value}
            </div>
          </div>
        ))}
      </div>

      {/* Three scenario cards */}
      <div className="space-y-4">
        {EXEC_SUMMARY.map((item, idx) => {
          const scenario = SCENARIO_BY_ID[item.scenarioId];
          const status = STATUS_STYLES[item.status];
          const StatusIcon = status.icon;
          return (
            <article
              key={item.scenarioId}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900/70 p-5"
            >
              <div
                className={cn(
                  "absolute left-0 top-0 h-full w-1 bg-gradient-to-b",
                  status.bar,
                )}
              />

              <div className="flex flex-wrap items-start gap-3">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  #{idx + 1} · {scenario.label}
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest",
                    status.pill,
                  )}
                >
                  <StatusIcon className="h-3 w-3" /> {item.statusLabel}
                </span>
                <span className="ml-auto rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted">
                  {item.domain}
                </span>
              </div>

              <h3 className="mt-2 text-[15px] font-semibold leading-snug text-white">
                {item.headline}
              </h3>

              {/* Topline KPIs */}
              <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
                {item.topline.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5"
                  >
                    <div className="font-mono text-[9px] uppercase tracking-widest text-muted">
                      {kpi.label}
                    </div>
                    <div className="mt-0.5 text-sm font-semibold tracking-tight">
                      {kpi.value}
                    </div>
                    {kpi.trend && (
                      <div className="mt-0.5 text-[10.5px] text-muted">{kpi.trend}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Decisions + calendar split */}
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr]">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    Decisions needed from you
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {item.decisionsNeeded.map((d, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-[12.5px] leading-relaxed text-white/85"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-iq-teal" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-iq-teal/30 bg-iq-teal/[0.06] p-3">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-iq-teal">
                    <CalendarClock className="h-3.5 w-3.5" /> Where it lands
                  </div>
                  <div className="mt-1 text-sm font-semibold">
                    {item.calendarHook.when}
                  </div>
                  <div className="text-[12px] text-white/85">
                    {item.calendarHook.with}
                  </div>
                  <div className="mt-1 text-[11.5px] text-muted">
                    {item.calendarHook.what}
                  </div>
                </div>
              </div>

              {/* Bottom line */}
              <div className="mt-3 flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-iq-yellow" />
                <p className="text-[13px] leading-relaxed text-white">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    Bottom line ·{" "}
                  </span>
                  {item.bottomLine}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
                {item.actions.map((a) => {
                  const Icon = ACTION_ICONS[a.icon];
                  return (
                    <div
                      key={a.label}
                      className="flex items-start gap-2.5 rounded-lg border border-iq-teal/25 bg-gradient-to-br from-iq-teal/[0.07] to-transparent p-2.5"
                    >
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-iq-teal/40 bg-iq-teal/10 text-iq-teal">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[12.5px] font-semibold">{a.label}</div>
                        <div className="text-[11px] leading-relaxed text-white/75">
                          {a.detail}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>

      {/* Provenance footer */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-[11px] text-muted">
        Sources · Oracle Fusion (SCM, HCM, CX) mirrored into Microsoft Fabric · Foundry
        agent reasoning · Microsoft Graph (calendar, recent meetings, collaborators) ·
        Microsoft Purview lineage attached to every aggregate.
      </div>
    </div>
  );
}
