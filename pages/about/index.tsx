import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../../components/footer'
import NavBar from '../../components/navbar'
import { languagesList, toolsList } from '../../data/toolsList'
import MetaData from '../../components/metadata'

const hobbies: { icon: string; label: string; href?: string; hint?: string }[] = [
    { icon: '✈️', label: 'Travelling',           href: '/map',         hint: 'See the map' },
    { icon: '🎮', label: 'Playing video games',  href: '/playstation', hint: 'See my tier list' },
    { icon: '🏊', label: 'Swimming' },
    { icon: '🎵', label: 'Listening to music',   href: '/music',       hint: 'See my albums' },
    { icon: '🧩', label: 'Jigsaw puzzles',       href: '/jigsaw',      hint: 'See my puzzles' },
    { icon: '📚', label: 'Reading books' },
    { icon: '🎬', label: 'Watching movies',      href: '/movies',      hint: 'See my picks' },
    { icon: '🗣️', label: 'Learning languages' },
    { icon: '📺', label: 'Watching TV shows' },
    { icon: '🏖️', label: 'Relaxing on the beach' },
]

const spokenLanguages: { name: string; level: string; flag: string; dots: number }[] = [
    { name: 'Arabic',  level: 'Native',    flag: '🇸🇩', dots: 5 },
    { name: 'English', level: 'Advanced',  flag: '🇬🇧', dots: 4 },
    { name: 'French',  level: 'Basics',    flag: '🇫🇷', dots: 2 },
    { name: 'Spanish', level: 'Beginner',  flag: '🇪🇸', dots: 1 },
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
                            <a href="/files/AlzobairElkhalifaCv.pdf" target="_blank" rel="noreferrer" className="btn-primary-accent">
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
                                    <span className="text-3xl leading-none">{h.icon}</span>
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
                                <span className="text-3xl leading-none">{l.flag}</span>
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
