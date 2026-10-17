import Image from 'next/image'

export type TierItem = {
    rating: number
    name: string
    image: string
    url: string
    tooltip?: string
}

// Classic tier-list palette — hot to cold, top to bottom.
const tierColor: Record<number, string> = {
    10: '#ff4d4d',
    9:  '#ff7a3d',
    8:  '#ff9a2e',
    7:  '#ffbf2e',
    6:  '#ffe14d',
    5:  '#b6e24d',
    4:  '#58d68d',
    3:  '#4dc7d9',
    2:  '#5b8def',
    1:  '#a97bff',
}

type Props = {
    items: TierItem[]
    tileAspect?: string // e.g. '3 / 4', '2 / 3', '1 / 1' — defaults to '3 / 4'
}

export default function TierList({ items, tileAspect = '3 / 4' }: Props) {
    // Preserve the order items appear in the source data — the author controls
    // ranking within each tier by reordering entries in the JSON file.
    const buckets = Array.from({ length: 10 }, (_, i) => {
        const rating = 10 - i
        return {
            rating,
            items: items.filter((it) => it.rating === rating),
        }
    })

    return (
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
            {buckets.map((bucket, idx) => {
                const color = tierColor[bucket.rating]
                const empty = bucket.items.length === 0
                return (
                    <div
                        key={bucket.rating}
                        className={
                            'flex items-stretch min-h-[92px] md:min-h-[112px] ' +
                            (idx > 0 ? 'border-t border-black/60 ' : '')
                        }
                    >
                        <div
                            className="shrink-0 w-16 md:w-24 flex flex-col items-center justify-center font-black text-slate-900 select-none"
                            style={{ backgroundColor: color }}
                            aria-label={`Tier ${bucket.rating} out of 10`}
                        >
                            <span className="text-3xl md:text-5xl leading-none tabular-nums drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                                {bucket.rating}
                            </span>
                            <span className="mt-1 text-[10px] md:text-[11px] uppercase tracking-widest text-slate-900/70">
                                / 10
                            </span>
                        </div>

                        <div className="flex-1 min-w-0 bg-slate-900/70 p-2 md:p-3">
                            {empty ? (
                                <div className="h-full min-h-[76px] md:min-h-[96px] flex items-center px-3 text-slate-600 italic text-sm">
                                    —
                                </div>
                            ) : (
                                <ul className="flex flex-wrap gap-3 md:gap-4">
                                    {bucket.items.map((it) => (
                                        <li key={it.name} className="w-[88px] md:w-[110px]">
                                            <a
                                                href={it.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                title={it.tooltip ?? it.name}
                                                className="group block focus:outline-none"
                                            >
                                                <div
                                                    className="relative w-full rounded-md overflow-hidden bg-slate-800 ring-1 ring-white/10 group-hover:ring-2 group-hover:ring-white group-focus-visible:ring-2 group-focus-visible:ring-emerald-400 transition"
                                                    style={{ aspectRatio: tileAspect }}
                                                >
                                                    <Image
                                                        src={it.image}
                                                        alt={`${it.name} cover`}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        sizes="110px"
                                                        className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                                                    />
                                                </div>
                                                <p className="mt-1.5 text-[11px] md:text-xs text-slate-200 leading-tight text-center line-clamp-2 group-hover:text-white transition-colors">
                                                    {it.name}
                                                </p>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
