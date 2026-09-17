import type { NextPage } from 'next'
import Link from 'next/link'
import Footer from '../../components/footer'
import NavBar from '../../components/navbar'
import MetaData from '../../components/metadata'
import playstationGames from '../../data/playstationGames.json'

type Game = {
    rating: number
    name: string
    image: string
    url: string
    genre: string
    year: number
    platform: string
    hoursPlayed?: number
    note?: string
}

const allGames = playstationGames.games as Game[]

const buckets: { rating: number; games: Game[] }[] = Array.from({ length: 10 }, (_, i) => {
    const rating = 10 - i
    return {
        rating,
        games: allGames
            .filter((g) => g.rating === rating)
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name)),
    }
})

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

const PlayStation: NextPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <MetaData
                title="PlayStation games · Alzobair Elkhalifa"
                description="A tier list of every PlayStation game I've finished, rated from 10/10 down to 1/10."
            />
            <NavBar />

            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pt-16 md:pt-20 pb-8">
                <div className="grid md:grid-cols-2 gap-8 md:items-end">
                    <div>
                        <span className="section-title">Hobby · PlayStation</span>
                        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                            My <span className="gradient-text">tier list</span>.
                        </h1>
                    </div>
                    <p className="text-slate-400 text-lg leading-relaxed md:justify-self-end md:max-w-md">
                        Every PlayStation game I&apos;ve finished, dropped into its tier from <span className="text-white">10/10</span> down to <span className="text-white">1/10</span>. Click a cover to open the game&apos;s page.
                    </p>
                </div>

                <div className="mt-8">
                    <Link href="/about"><a className="btn-outline-soft">← Back to about</a></Link>
                </div>
            </section>

            <section className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pb-20">
                <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                    {buckets.map((bucket, idx) => {
                        const color = tierColor[bucket.rating]
                        const empty = bucket.games.length === 0
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
                                            {bucket.games.map((g) => (
                                                <li key={g.name} className="w-[88px] md:w-[110px]">
                                                    <a
                                                        href={g.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        title={`${g.name} · ${g.platform} · ${g.year}`}
                                                        className="group block focus:outline-none"
                                                    >
                                                        <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden bg-slate-800 ring-1 ring-white/10 group-hover:ring-2 group-hover:ring-white group-focus-visible:ring-2 group-focus-visible:ring-emerald-400 transition">
                                                            <img
                                                                src={g.image}
                                                                alt={`${g.name} cover`}
                                                                loading="lazy"
                                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                                                            />
                                                        </div>
                                                        <p className="mt-1.5 text-[11px] md:text-xs text-slate-200 leading-tight text-center line-clamp-2 group-hover:text-white transition-colors">
                                                            {g.name}
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

                <p className="mt-4 text-xs text-slate-500">
                    Click a cover to open the game&apos;s page.
                </p>
            </section>

            <Footer />
        </div>
    )
}

export default PlayStation
