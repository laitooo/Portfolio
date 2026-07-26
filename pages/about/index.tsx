import type { NextPage } from 'next'
import Link from 'next/link'
import Footer from '../../components/footer'
import NavBar from '../../components/navbar'
import { languagesList, toolsList } from '../../data/toolsList'
import MetaData from '../../components/metadata'

const hobbies = [
    { icon: '✈️', label: 'Travel', href: '/map', hint: 'See the map' },
    { icon: '🗣️', label: 'Learning languages' },
    { icon: '🏊', label: 'Swimming' },
    { icon: '📚', label: 'Reading books' },
    { icon: '🎬', label: 'Anime & TV shows' },
    { icon: '🎮', label: 'League of Legends' },
]

const spokenLanguages: { name: string; level: string; flag: string; dots: number }[] = [
    { name: 'Arabic',  level: 'Native',    flag: '🇸🇩', dots: 5 },
    { name: 'English', level: 'Advanced',  flag: '🇬🇧', dots: 4 },
    { name: 'French',  level: 'Basics',    flag: '🇫🇷', dots: 2 },
    { name: 'Spanish', level: 'Beginner',  flag: '🇪🇸', dots: 1 },
]

const About: NextPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <MetaData
                title="About · Alzobair Elkhalifa"
                description="A bit about Alzobair Elkhalifa — background, tools, and interests."
            />
            <NavBar />

            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pt-16 md:pt-20 pb-16">
                <div className="grid lg:grid-cols-12 gap-10 items-start">
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
                                1.6M downloads, to internal fin-tech platforms.
                            </p>
                            <p className="text-slate-400">
                                Outside of work, I like exploring new places, picking up languages, and losing
                                games of League of Legends.
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href="/files/AlzobairElkhalifaCv.pdf" target="_blank" rel="noreferrer" className="btn-primary-accent">
                                Download CV
                            </a>
                            <Link href="/career"><a className="btn-outline-soft">See career</a></Link>
                        </div>
                    </div>

                    <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: '150ms' }}>
                        <div className="surface p-6">
                            <p className="text-xs uppercase tracking-widest text-slate-500">Quick facts</p>
                            <ul className="mt-4 divide-y divide-white/5">
                                {[
                                    ['Based in', 'Dubai, UAE'],
                                    ['From', 'Sudan'],
                                    ['Focus', 'Mobile & Web'],
                                    ['Experience', '6+ years'],
                                    ['Play Store downloads', '1.6M+'],
                                    ['Degree', 'B.Sc. Civil Engineering'],
                                    ['Availability', 'Open to work'],
                                ].map(([k, v]) => (
                                    <li key={k} className="py-3 flex items-center justify-between text-sm">
                                        <span className="text-slate-400">{k}</span>
                                        <span className="text-white">{v}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6 surface p-6">
                            <p className="text-xs uppercase tracking-widest text-slate-500">Hobbies</p>
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                {hobbies.map((h) => {
                                    const inner = (
                                        <div className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:border-emerald-400/40 hover:bg-emerald-400/5 transition">
                                            <span className="text-lg">{h.icon}</span>
                                            <div className="min-w-0">
                                                <p className="text-sm text-slate-200 truncate">{h.label}</p>
                                                {h.hint && <p className="text-[10px] uppercase tracking-widest text-emerald-300">{h.hint}</p>}
                                            </div>
                                        </div>
                                    )
                                    return h.href ? (
                                        <Link key={h.label} href={h.href}><a>{inner}</a></Link>
                                    ) : (
                                        <div key={h.label}>{inner}</div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Spoken languages */}
            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 py-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <span className="section-title">Spoken languages</span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight">Languages I speak</h2>
                    </div>
                    <p className="max-w-md text-slate-400">A few languages I&apos;ve picked up over the years — some fluently, others still a work in progress.</p>
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
                            <img src={tool.icon} alt={tool.name} className="w-14 h-14 md:w-16 md:h-16" />
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
                            <img src={tool.icon} alt={tool.name} className="w-14 h-14 md:w-16 md:h-16" />
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
