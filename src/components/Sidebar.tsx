"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Layers, GitCompare, Sunrise } from "lucide-react";
import { TIERS, type IqLayer, type TierId } from "@/lib/data/tiers";
import { cn } from "@/lib/utils";

const LAYER_LABEL: Record<IqLayer, string> = {
  fabric: "Fabric IQ",
  foundry: "Foundry IQ",
  work: "Work IQ",
};

const ALL_LAYERS: IqLayer[] = ["fabric", "foundry", "work"];

const TIER_ACCENT: Record<TierId, string> = {
  baseline: "before:bg-white/30",
  fabric: "before:bg-azure-blue",
  foundry: "before:bg-iq-yellow",
  work: "before:bg-iq-teal",
};

export default function Sidebar() {
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();
  const scenario = searchParams?.get("scenario");
  const qs = scenario ? `?scenario=${scenario}` : "";

  const activeTier = pathname.startsWith("/tier/") ? pathname.split("/")[2] : null;
  const isCompare = pathname.startsWith("/compare");
  const isExec = pathname.startsWith("/exec-summary");

  return (
    <aside className="flex w-72 shrink-0 flex-col border-r border-white/10 bg-navy-900/60">
      <div className="px-5 pb-3 pt-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
          IQ progression
        </div>
        <div className="mt-1 flex items-center gap-2 text-sm font-semibold">
          <Layers className="h-4 w-4 text-muted" />
          Tiers
        </div>
      </div>

      <nav className="flex flex-col gap-1.5 px-3">
        {TIERS.map((tier) => {
          const href = `/tier/${tier.id}${qs}`;
          const isActive = activeTier === tier.id && !isCompare && !isExec;
          return (
            <Link
              key={tier.id}
              href={href}
              className={cn(
                "group relative rounded-lg border border-transparent px-3 py-3 transition",
                "before:absolute before:left-0 before:top-3 before:h-[calc(100%-1.5rem)] before:w-[3px] before:rounded-r-full before:opacity-0 before:transition-opacity",
                TIER_ACCENT[tier.id],
                isActive
                  ? "border-white/10 bg-white/5 before:opacity-100"
                  : "hover:border-white/10 hover:bg-white/[0.03]",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold tracking-tight">{tier.label}</div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-muted">
                  T{tier.index}
                </div>
              </div>
              <div className="mt-0.5 text-[11px] text-muted">{tier.tagline}</div>
              <div className="mt-2.5 flex flex-wrap gap-1">
                {ALL_LAYERS.map((layer) => {
                  const on = tier.enabledLayers.includes(layer);
                  return (
                    <span
                      key={layer}
                      className={cn(
                        "rounded-full border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                        on
                          ? layer === "fabric"
                            ? "border-azure-blue/40 bg-azure-blue/15 text-azure-blue"
                            : layer === "foundry"
                              ? "border-iq-yellow/40 bg-iq-yellow/15 text-iq-yellow"
                              : "border-iq-teal/40 bg-iq-teal/15 text-iq-teal"
                          : "border-white/10 bg-white/[0.03] text-muted",
                      )}
                    >
                      {LAYER_LABEL[layer]} · {on ? "ON" : "OFF"}
                    </span>
                  );
                })}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mx-3 my-3 h-px bg-white/10" />

      <div className="px-3">
        <Link
          href={`/compare${qs}`}
          className={cn(
            "group flex items-center gap-2 rounded-lg border px-3 py-3 text-sm font-semibold transition",
            isCompare
              ? "border-white/10 bg-white/5"
              : "border-transparent hover:border-white/10 hover:bg-white/[0.03]",
          )}
        >
          <GitCompare className="h-4 w-4 text-muted" />
          Compare All
          <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-muted">
            2×2
          </span>
        </Link>
        <div className="mb-2 mt-1 px-3 text-[11px] text-muted">
          Same prompt, four tiers, side-by-side.
        </div>

        <Link
          href="/exec-summary"
          className={cn(
            "group relative flex items-center gap-2 rounded-lg border px-3 py-3 text-sm font-semibold transition",
            "before:absolute before:left-0 before:top-3 before:h-[calc(100%-1.5rem)] before:w-[3px] before:rounded-r-full before:bg-iq-yellow before:opacity-0 before:transition-opacity",
            isExec
              ? "border-white/10 bg-white/5 before:opacity-100"
              : "border-transparent hover:border-white/10 hover:bg-white/[0.03]",
          )}
        >
          <Sunrise className="h-4 w-4 text-iq-yellow" />
          Exec Summary
          <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-iq-yellow">
            Today
          </span>
        </Link>
        <div className="mt-1 px-3 text-[11px] text-muted">
          All three scenarios, condensed to a morning briefing.
        </div>
      </div>

      <div className="mt-auto border-t border-white/10 p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
          Reference architecture
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-muted">
          Copilot fronts the worker. Oracle Fusion is mirrored into Fabric. The agent runs in
          Foundry. Purview governs every stage.
        </p>
      </div>
    </aside>
  );
}
