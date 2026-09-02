import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calculator, Copy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getAllDefaultPropertyDetails } from '@/data/propertyDetails';
import { computeDealPrice, type DealPricingSettings } from '@/lib/dealPricing';

interface DebugDay {
  date: string;
  dayRate: number | null;
  isFree: boolean;
  minNights: number;
  checkinDenied: boolean;
  checkoutDenied: boolean;
}

interface DebugRoom {
  name: string;
  roomTypeId: number;
  cleaningFee: number | null;
  maxGuests: number | null;
  losPrices: Record<string, number>;
  days: DebugDay[];
}

interface PricesResponse {
  from: string;
  to: string;
  prices: Record<string, number>;
  pricedNights: number;
  perNight: boolean;
  debug?: Record<string, DebugRoom>;
}

interface PeriodRow {
  property_id: string;
  check_in: string;
  check_out: string;
  custom_discount: number | null;
}

interface Props {
  settings: DealPricingSettings;
}

const isoToday = () => new Date().toISOString().split('T')[0];
const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split('T')[0];
};
const nightsBetween = (a: string, b: string) =>
  Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
const eur = (n: number) => `${n.toFixed(2).replace('.', ',')} €`;

const DealsPriceCheck = ({ settings }: Props) => {
  const properties = useMemo(() => getAllDefaultPropertyDetails(), []);
  const [from, setFrom] = useState(addDays(isoToday(), 7));
  const [to, setTo] = useState(addDays(isoToday(), 9));
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PricesResponse | null>(null);
  const [periods, setPeriods] = useState<PeriodRow[]>([]);

  const nights = from && to ? nightsBetween(from, to) : 0;
  const today = isoToday();

  const visibleProperties = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return properties;
    return properties.filter(p => p.name.toLowerCase().includes(q) || p.id.includes(q));
  }, [properties, search]);

  const toggle = (id: string) =>
    setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  const runCheck = async () => {
    if (nights < 1) {
      toast.error('Valitse ajanjakso, jossa on vähintään 1 yö');
      return;
    }
    setLoading(true);
    try {
      const [{ data, error }, periodRes] = await Promise.all([
        supabase.functions.invoke(`moder-availability?mode=prices&from=${from}&to=${to}&debug=true`),
        supabase
          .from('period_settings')
          .select('property_id, check_in, check_out, custom_discount')
          .lte('check_in', to)
          .gte('check_out', from),
      ]);
      if (error) throw error;
      setResult(data as PricesResponse);
      setPeriods((periodRes.data || []) as PeriodRow[]);
    } catch (e) {
      console.error('Price check failed', e);
      toast.error('Hintojen haku epäonnistui');
    } finally {
      setLoading(false);
    }
  };

  const periodDiscountFor = (roomId: string): number | null => {
    const match =
      periods.find(p => p.property_id === roomId && p.check_in <= from && p.check_out >= to) ??
      periods.find(p => p.property_id === roomId && p.check_in <= to && p.check_out >= from);
    return match?.custom_discount ?? null;
  };

  const rows = useMemo(() => {
    if (!result) return [];
    const ids = Object.keys(result.debug ?? result.prices);
    const filtered = selected.length > 0 ? ids.filter(id => selected.includes(id)) : ids;
    return filtered
      .map(roomId => {
        const debug = result.debug?.[roomId];
        const property = properties.find(p => p.id === roomId);
        const name = property?.name || debug?.name || roomId;
        const moderPrice = result.prices[roomId] ?? null;
        const cleaningFee = 0; // Moder LOS price already includes cleaning
        const periodPct = periodDiscountFor(roomId);
        const breakdown =
          moderPrice != null
            ? computeDealPrice({
                moderPrice,
                cleaningFee,
                nights,
                checkIn: from,
                todayIso: today,
                settings,
                periodDiscountPct: periodPct,
              })
            : null;
        const freeDays = debug?.days.filter(d => d.isFree).length ?? 0;
        const minNights = debug?.days.length ? Math.max(...debug.days.map(d => d.minNights)) : null;
        return { roomId, name, debug, moderPrice, breakdown, periodPct, freeDays, minNights };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [result, selected, properties, nights, from, today, settings, periods]);

  const copyAll = () => {
    const lines: string[] = [`Hintatarkistus ${from} – ${to} (${nights} yötä)`];
    for (const r of rows) {
      lines.push('');
      lines.push(`${r.name} (${r.roomId})`);
      if (!r.breakdown) {
        lines.push('  Moder ei palauta hintaa tälle jaksolle');
        continue;
      }
      lines.push(`  Moderin jaksohinta: ${eur(r.breakdown.moderPrice)}`);
      lines.push(`  Perusalennus ${r.breakdown.baseDiscountPct}%: -${eur(r.breakdown.baseDiscountAmount)}`);
      lines.push(`  Superäkkilähtö ${r.breakdown.superDiscountPct}%: -${eur(r.breakdown.superDiscountAmount)}`);
      lines.push(`  Jaksoalennus ${r.breakdown.periodDiscountPct}%: -${eur(r.breakdown.periodDiscountAmount)}`);
      lines.push(`  Asiakkaan hinta: ${r.breakdown.total} € (${eur(r.breakdown.perNight)}/yö)`);
      if (r.debug) {
        lines.push(`  Moder LOS-hinnat: ${Object.entries(r.debug.losPrices).map(([n, v]) => `${n}yö=${v}€`).join(', ')}`);
        lines.push(`  Päivähinnat: ${r.debug.days.map(d => `${d.date}=${d.dayRate ?? '-'}€${d.isFree ? '' : ' (varattu)'}`).join(', ')}`);
      }
    }
    navigator.clipboard.writeText(lines.join('\n'));
    toast.success('Kopioitu leikepöydälle');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Hintatarkistus
        </CardTitle>
        <CardDescription>
          Näet rivi riviltä, miten äkkilähtöhinta muodostuu: Moderin jaksohinta, perusalennus,
          superäkkilähtö ja jaksokohtainen alennus. Kysely tehdään aina suoraan Moderiin.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pc-from">Saapuminen</Label>
            <Input id="pc-from" type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pc-to">Lähtö</Label>
            <Input id="pc-to" type="date" value={to} onChange={e => setTo(e.target.value)} className="h-11" />
          </div>
          <div className="space-y-2">
            <Label>Yöt</Label>
            <div className="h-11 flex items-center text-lg font-semibold">{nights > 0 ? nights : '-'}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <Label>Kohteet {selected.length > 0 ? `(${selected.length} valittu)` : '(kaikki)'}</Label>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setSelected(properties.map(p => p.id))}>
                Valitse kaikki
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setSelected([])}>
                Tyhjennä
              </Button>
            </div>
          </div>
          <Input
            placeholder="Hae kohdetta…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-10"
          />
          <div className="max-h-48 overflow-y-auto rounded-md border p-3 grid sm:grid-cols-2 gap-2">
            {visibleProperties.map(p => (
              <label key={p.id} className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={selected.includes(p.id)} onCheckedChange={() => toggle(p.id)} />
                <span className="truncate">{p.name}</span>
                <span className="text-xs text-muted-foreground">{p.id}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="button" onClick={runCheck} disabled={loading} className="h-11">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Calculator className="w-4 h-4 mr-2" />}
            Tarkista hinnat
          </Button>
          {rows.length > 0 && (
            <Button type="button" variant="outline" className="h-11" onClick={copyAll}>
              <Copy className="w-4 h-4 mr-2" />
              Kopioi
            </Button>
          )}
        </div>

        {result && (
          <p className="text-sm text-muted-foreground">
            Kysely {result.from} – {result.to}. Moderin hinta haettiin {result.pricedNights} yön jaksolle
            {result.perNight ? ' ja jaettiin kahdella (Moder ei hinnoittele yhtä yötä)' : ''}.
            Alennukset: perus {settings.baseDiscount} %, superäkkilähtö d3 {settings.superDiscount.d3} % / d5{' '}
            {settings.superDiscount.d5} % / d7 {settings.superDiscount.d7} %,
            1 yön alennukset {settings.discountOneNight ? 'päällä' : 'pois'}.
          </p>
        )}

        <div className="space-y-3">
          {rows.map(r => (
            <div key={r.roomId} className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="font-semibold">
                  {r.name} <span className="text-xs text-muted-foreground">({r.roomId})</span>
                </div>
                {r.breakdown ? (
                  <div className="flex items-baseline gap-2">
                    {r.breakdown.total < r.breakdown.originalTotal && (
                      <span className="text-sm text-muted-foreground line-through">{r.breakdown.originalTotal} €</span>
                    )}
                    <span className="text-2xl font-bold text-amber-500">{r.breakdown.total} €</span>
                    <span className="text-xs text-muted-foreground">{eur(r.breakdown.perNight)}/yö</span>
                  </div>
                ) : (
                  <Badge variant="destructive">Ei hintaa Moderista</Badge>
                )}
              </div>

              {r.breakdown && (
                <div className="text-sm font-mono space-y-0.5">
                  <div className="flex justify-between">
                    <span>Moderin jaksohinta ({nights} yötä{result?.perNight ? ', johdettu 2 yön hinnasta' : ''})</span>
                    <span>{eur(r.breakdown.moderPrice)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Perusalennus {r.breakdown.baseDiscountPct} %</span>
                    <span>− {eur(r.breakdown.baseDiscountAmount)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>
                      Superäkkilähtö {r.breakdown.superDiscountPct} % (saapumiseen {r.breakdown.daysUntilCheckIn} pv)
                    </span>
                    <span>− {eur(r.breakdown.superDiscountAmount)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Jaksokohtainen alennus {r.breakdown.periodDiscountPct} %</span>
                    <span>− {eur(r.breakdown.periodDiscountAmount)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-1 font-semibold">
                    <span>Asiakkaan hinta</span>
                    <span>{r.breakdown.total} €</span>
                  </div>
                  {!r.breakdown.discountsApplied && (
                    <div className="text-amber-600">1 yön varaus: alennukset pois päältä asetuksissa.</div>
                  )}
                  <div className="text-muted-foreground">Siivousmaksu sisältyy Moderin hintaan (ei lisätä erikseen).</div>
                </div>
              )}

              {r.debug && (
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>
                    Moderin LOS-hinnat samalle saapumispäivälle:{' '}
                    {Object.keys(r.debug.losPrices).length > 0
                      ? Object.entries(r.debug.losPrices)
                          .sort((a, b) => Number(a[0]) - Number(b[0]))
                          .map(([n, v]) => `${n} yö ${v} €`)
                          .join(' · ')
                      : 'ei hintoja'}
                  </div>
                  <div>
                    Päivähinnat (day_rate):{' '}
                    {r.debug.days.length > 0
                      ? r.debug.days
                          .map(d => `${d.date.slice(5)} ${d.dayRate != null ? `${d.dayRate} €` : '-'}${d.isFree ? '' : ' (varattu)'}`)
                          .join(' · ')
                      : 'ei tietoa'}
                  </div>
                  <div>
                    Vapaita päiviä jaksolla {r.freeDays}/{r.debug.days.length}
                    {r.minNights != null ? ` · minimiyöt Moderista ${r.minNights}` : ''}
                    {r.minNights != null && nights < r.minNights
                      ? ' → ei näy äkkilähdöissä tälle pituudelle (paitsi gap fill -säännöllä)'
                      : ''}
                    {r.debug.days.some(d => !d.isFree) ? ' → jakso ei ole kokonaan vapaa' : ''}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DealsPriceCheck;
