import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../../components/footer'
import NavBar from '../../components/navbar'
import { languagesList, toolsList } from '../../data/toolsList'
import MetaData from '../../components/metadata'
import { trackEvent } from '../../lib/analytics'

const iconProps = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
}

const HobbyIcons = {
    travel: (
        <svg {...iconProps}><path d="M12 7l2 5-2 5-2-5z" /><circle cx="12" cy="12" r="9" /></svg>
    ),
    gaming: (
        <svg {...iconProps}>
            <rect x="2" y="8" width="20" height="9" rx="4.5" />
            <path d="M7 11v3M5.5 12.5h3" />
            <circle cx="15.5" cy="11.5" r="1" fill="currentColor" />
            <circle cx="18" cy="14" r="1" fill="currentColor" />
        </svg>
    ),
    swimming: (
        <svg {...iconProps}>
            <path d="M9 10l2.5-2.5 2 2 3-3" />
            <circle cx="17" cy="6" r="1.6" fill="currentColor" stroke="none" />
            <path d="M2 15.5c1.5-1.3 3-1.3 4.5 0s3 1.3 4.5 0 3-1.3 4.5 0 3 1.3 4.5 0" />
            <path d="M2 19c1.5-1.3 3-1.3 4.5 0s3 1.3 4.5 0 3-1.3 4.5 0 3 1.3 4.5 0" />
        </svg>
    ),
    music: (
        <svg {...iconProps}><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
    ),
    jigsaw: (
        <svg {...iconProps}>
            <rect x="4" y="4" width="7" height="7" rx="1.5" />
            <rect x="13" y="4" width="7" height="7" rx="1.5" />
            <rect x="4" y="13" width="7" height="7" rx="1.5" />
            <rect x="13" y="13" width="7" height="7" rx="1.5" />
        </svg>
    ),
    books: (
        <svg {...iconProps}>
            <path d="M4 5.5A2 2 0 0 1 6 4h5.5v15H6a2 2 0 0 1-2-2z" />
            <path d="M20 5.5A2 2 0 0 0 18 4h-5.5v15H18a2 2 0 0 0 2-2z" />
        </svg>
    ),
    movies: (
        <svg {...iconProps}>
            <path d="M3 9h18v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
            <path d="M3 9l1.5-4h3L6 9zM9 9l1.5-4h3L12 9zM15 9l1.5-4h3L18 9z" />
        </svg>
    ),
    languages: (
        <svg {...iconProps}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a13 13 0 0 1 0 18" /><path d="M12 3a13 13 0 0 0 0 18" /></svg>
    ),
    tv: (
        <svg {...iconProps}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M8 21h8M12 18v3" /></svg>
    ),
    beach: (
        <svg {...iconProps}>
            <circle cx="12" cy="9" r="4" />
            <path d="M12 2v2M12 14v2M5 9h2M17 9h2M6.5 3.5l1.4 1.4M16.1 4.9l1.4-1.4" />
            <path d="M2 19h20" />
        </svg>
    ),
}

const hobbies: { icon: JSX.Element; label: string; href?: string; hint?: string }[] = [
    { icon: HobbyIcons.travel,    label: 'Travelling',           href: '/map',         hint: 'See the map' },
    { icon: HobbyIcons.gaming,    label: 'Playing video games',  href: '/playstation', hint: 'See my tier list' },
    { icon: HobbyIcons.swimming,  label: 'Swimming' },
    { icon: HobbyIcons.music,     label: 'Listening to music',   href: '/music',       hint: 'See my albums' },
    { icon: HobbyIcons.jigsaw,    label: 'Jigsaw puzzles',       href: '/jigsaw',      hint: 'See my puzzles' },
    { icon: HobbyIcons.books,     label: 'Reading books' },
    { icon: HobbyIcons.movies,    label: 'Watching movies',      href: '/movies',      hint: 'See my picks' },
    { icon: HobbyIcons.languages, label: 'Learning languages' },
    { icon: HobbyIcons.tv,        label: 'Watching TV shows' },
    { icon: HobbyIcons.beach,     label: 'Relaxing on the beach' },
]

const spokenLanguages: { name: string; level: string; code: string; dots: number }[] = [
    { name: 'Arabic',  level: 'Native',    code: 'AR', dots: 5 },
    { name: 'English', level: 'Advanced',  code: 'EN', dots: 4 },
    { name: 'French',  level: 'Basics',    code: 'FR', dots: 2 },
    { name: 'Spanish', level: 'Beginner',  code: 'ES', dots: 1 },
]

const quickFacts: [string, string][] = [
    ['Based in',             'Dubai, UAE'],
    ['From',                 'Sudan'],
    ['Focus',                'Mobile & Web'],
    ['Experience',           '6+ years'],
    ['Play Store downloads', '1.9M+'],
    ['Degree',               'B.Sc. Civil Engineering'],
    ['Availability',         'Open to work'],
]

const About: NextPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <MetaData
                title="About · Alzobair Elkhalifa"
                description="A bit about Alzobair Elkhalifa — background, tools, and interests."
            />
            <NavBar />

            {/* Hero */}
            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pt-16 md:pt-20 pb-16">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    <div className="lg:col-span-7 animate-fade-up">
                        <span className="section-title">About me</span>
                        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                            <span className="text-white">Know who </span>
                            <span className="gradient-text">I&apos;m.</span>
                        </h1>

                        <div className="mt-8 space-y-5 text-slate-300 text-lg leading-relaxed">
                            <p>
                                Hi everyone, I&apos;m <span className="text-white font-semibold">Alzobair Elkhalifa</span> — a
                                software developer from <span className="text-emerald-300">Sudan</span>, currently based in
                                <span className="text-emerald-300"> Dubai, UAE</span>.
                            </p>
                            <p>
                                I hold a B.Sc. in Civil Engineering, but ended up chasing code. Over the last 6+ years I&apos;ve
                                shipped native Android, Flutter and full-stack web products — from consumer apps with over
                                1.9M downloads, to internal fin-tech platforms.
                            </p>
                            <p className="text-slate-400">
                                Outside of work I like exploring new places, picking up languages, and the quiet click of a
                                jigsaw piece finding its spot.
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href="/files/AlzobairElkhalifaCv.pdf"
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => trackEvent('download_cv', { from: 'about' })}
                                className="btn-primary-accent"
                            >
                                Download CV
                            </a>
                            <Link href="/career"><a className="btn-outline-soft">See career</a></Link>
                        </div>
                    </div>

                    <aside className="lg:col-span-5 animate-fade-up lg:sticky lg:top-24" style={{ animationDelay: '150ms' }}>
                        <div className="surface p-6">
                            <p className="text-xs uppercase tracking-widest text-slate-500">Quick facts</p>
                            <ul className="mt-4 divide-y divide-white/5">
                                {quickFacts.map(([k, v]) => (
                                    <li key={k} className="py-3 flex items-center justify-between text-sm">
                                        <span className="text-slate-400">{k}</span>
                                        <span className="text-white text-right">{v}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </section>

            {/* Hobbies */}
            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 py-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <span className="section-title">Hobbies</span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight">Things I like doing</h2>
                    </div>
                    <p className="max-w-md text-slate-400 md:text-right">
                        Ten small worlds I keep returning to. Tap the ones with a hint to see more.
                    </p>
                </div>

                <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {hobbies.map((h, i) => {
                        const inner = (
                            <div className="group h-full flex flex-col justify-between gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-emerald-400/40 hover:bg-emerald-400/[0.04] transition">
                                <div className="flex items-start justify-between gap-2">
                                    <span className="text-slate-400 group-hover:text-emerald-300 transition">{h.icon}</span>
                                    <span className="text-xs font-semibold tabular-nums text-slate-600 group-hover:text-emerald-300 transition">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm md:text-[15px] text-white font-medium leading-snug">{h.label}</p>
                                    {h.hint && (
                                        <p className="mt-1 text-[10px] uppercase tracking-widest text-emerald-300/80 group-hover:text-emerald-300 transition">
                                            {h.hint} →
                                        </p>
                                    )}
                                </div>
                            </div>
                        )
                        return (
                            <li key={h.label}>
                                {h.href ? (
                                    <Link href={h.href}>
                                        <a className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 rounded-xl">
                                            {inner}
                                        </a>
                                    </Link>
                                ) : (
                                    <div className="h-full">{inner}</div>
                                )}
                            </li>
                        )
                    })}
                </ol>
            </section>

            {/* Spoken languages */}
            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 py-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <span className="section-title">Spoken languages</span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight">Languages I speak</h2>
                    </div>
                    <p className="max-w-md text-slate-400 md:text-right">
                        A few languages I&apos;ve picked up over the years — some fluently, others still a work in progress.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {spokenLanguages.map((l) => (
                        <div key={l.name} className="surface surface-hover p-6">
                            <div className="flex items-center gap-3">
                                <span className="w-10 h-10 shrink-0 grid place-items-center rounded-lg border border-white/10 bg-white/[0.02] text-xs font-bold tracking-wide text-emerald-300">
                                    {l.code}
                                </span>
                                <div className="min-w-0">
                                    <p className="text-white font-semibold">{l.name}</p>
                                    <p className="text-xs text-slate-400">{l.level}</p>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center gap-1.5" aria-label={`${l.dots} out of 5`}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={
                                            'h-1.5 flex-1 rounded-full ' +
                                            (i < l.dots ? 'bg-gradient-to-r from-emerald-400 to-cyan-400' : 'bg-white/10')
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Frameworks */}
            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 py-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <span className="section-title">Toolkit · Frameworks</span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight">Frameworks & tools I reach for</h2>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
                    {toolsList.map((tool) => (
                        <div
                            key={tool.index}
                            className="surface surface-hover p-6 flex flex-col items-center text-center"
                        >
                            <Image src={tool.icon} alt={tool.name} width={64} height={64} className="w-14 h-14 md:w-16 md:h-16" />
                            <p className="mt-4 text-white font-medium">{tool.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Languages */}
            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 py-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <span className="section-title">Toolkit · Languages</span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight">Most used programming languages</h2>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
                    {languagesList.map((tool) => (
                        <div
                            key={tool.index}
                            className="surface surface-hover p-6 flex flex-col items-center text-center"
                        >
                            <Image src={tool.icon} alt={tool.name} width={64} height={64} className="w-14 h-14 md:w-16 md:h-16" />
                            <p className="mt-4 text-white font-medium">{tool.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default About
