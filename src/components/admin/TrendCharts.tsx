import type { DailyPoint } from "@/lib/searchDemand";

/** Tiny 14-day sparkline. */
export function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(1, ...data), w = 70, h = 18;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(" ");
  return <svg width={w} height={h} className="text-primary" aria-hidden><polyline points={pts} fill="none" stroke="currentColor" strokeWidth={1.5} /></svg>;
}

/** Daily bars + 7-day moving average line. */
export function DailyChart({ data, title }: { data: DailyPoint[]; title: string }) {
  const w = 600, h = 140, pad = 18;
  const max = Math.max(1, ...data.map((d) => Math.max(d.count, d.avg7)));
  const bw = (w - pad) / data.length;
  const y = (v: number) => h - pad - (v / max) * (h - pad * 2);
  const line = data.map((d, i) => `${pad + i * bw + bw / 2},${y(d.avg7)}`).join(" ");
  const fmt = (s: string) => `${+s.slice(8)}.${+s.slice(5, 7)}.`;
  return (
    <div>
      <div className="text-xs font-medium mb-1">{title}</div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-36">
        <text x={0} y={pad - 6} className="fill-muted-foreground" fontSize={10}>{max}</text>
        {data.map((d, i) => (
          <rect key={d.date} x={pad + i * bw + 1} y={y(d.count)} width={Math.max(1, bw - 2)} height={h - pad - y(d.count)} className="fill-primary/40">
            <title>{`${fmt(d.date)}: ${d.count} hakua, 7 pv ka ${d.avg7}`}</title>
          </rect>
        ))}
        <polyline points={line} fill="none" className="stroke-primary" strokeWidth={2} />
        <text x={pad} y={h - 4} className="fill-muted-foreground" fontSize={10}>{fmt(data[0].date)}</text>
        <text x={w} y={h - 4} textAnchor="end" className="fill-muted-foreground" fontSize={10}>{fmt(data[data.length - 1].date)}</text>
      </svg>
      <div className="text-[11px] text-muted-foreground">Pylväät = haut päivittäin, viiva = 7 päivän liukuva keskiarvo.</div>
    </div>
  );
}
