import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../components/footer'
import NavBar from '../components/navbar'
import MetaData from '../components/metadata'
import ProjectCard from '../components/project'
import { projectsList } from '../data/projectsList'
import { jobsList } from '../data/jobsList'
import { languagesList, toolsList } from '../data/toolsList'
import { github, linkedin, email } from '../data/socialMedia'

const stack = [
    { name: 'Flutter', icon: '/icons/flutter.svg', tag: 'Mobile', copy: 'Cross-platform apps in Dart — shipped 500K+ install products.' },
    { name: 'Next.js', icon: '/icons/nextjs.svg', tag: 'Web', copy: 'Full-stack apps with React, TypeScript and REST/GraphQL APIs.' },
    { name: 'Android', icon: '/icons/android.svg', tag: 'Native', copy: 'Native Android in Java and Kotlin — launchers, chat, parental control.' },
    { name: 'Unity', icon: '/icons/unity.png', tag: 'Games', copy: 'Small 2D/3D projects with C# — physics, gameplay loops, WebGL builds.' },
]

const stats = [
    { value: '6+', label: 'Years building' },
    { value: '15+', label: 'Projects' },
    { value: '1.9M+', label: 'Downloads on Google Play' },
]

const Home: NextPage = () => {
    const featured = [1, 11, 16, 6, 14, 10]
        .map((id) => projectsList.find((p) => p.id === id))
        .filter(Boolean)
        .slice(0, 6) as typeof projectsList

    const recentJobs = [...jobsList].sort((a, b) => (a.id < b.id ? -1 : 1)).slice(0, 3)
    const marqueeLangs = [...languagesList, ...toolsList]

    return (
        <div className="min-h-screen flex flex-col">
            <MetaData
                title="Alzobair Elkhalifa · Software Developer"
                description="Portfolio of Alzobair Elkhalifa — mobile & web software developer based in Dubai."
            />
            <NavBar />

            {/* HERO */}
            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pt-16 md:pt-24 pb-20">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    <div className="lg:col-span-7 animate-fade-up">
                        <span className="chip chip-accent">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                            Available for select work
                        </span>
                        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                            <span className="text-white">Hi, I&apos;m </span>
                            <span className="gradient-text">Alzobair</span>
                            <span className="text-white"> — a</span>
                            <br />
                            <span className="text-white">software developer</span>
                            <br />
                            <span className="text-slate-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">building mobile & web apps.</span>
                        </h1>

                        <p className="mt-8 max-w-xl text-slate-300 text-lg leading-relaxed">
                            6+ years shipping production apps — from a 1.9M-download reader on Google Play,
                            to fin-tech and travel platforms with <span className="text-white">Flutter</span> and
                            <span className="text-white"> Next.js</span>. Currently based in Dubai.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-3">
                            <Link href="/projects">
                                <a className="btn-primary-accent">
                                    View my work
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg>
                                </a>
                            </Link>
                            <a href={email} className="btn-outline-soft">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                                Get in touch
                            </a>
                        </div>

                        <div className="mt-10 flex items-center gap-5 text-slate-400">
                            <a href={github} target="_blank" rel="noreferrer" className="hover:text-white transition text-sm flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 22.3 24 17.8 24 12.5 24 5.9 18.6.5 12 .5z"/></svg>
                                github
                            </a>
                            <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition text-sm flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.7A1.7 1.7 0 1 1 6.5 5.3a1.7 1.7 0 0 1 0 3.4zM19 19h-3v-4.7c0-1.1 0-2.5-1.5-2.5S13 13 13 14.2V19h-3v-9h2.9v1.3h.1a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.7 2 3.7 4.7V19z"/></svg>
                                linkedin
                            </a>
                        </div>
                    </div>

                    {/* portrait card */}
                    <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: '150ms' }}>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/20 via-cyan-400/10 to-transparent rounded-3xl blur-2xl" />
                            <div className="relative surface p-6">
                                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 relative">
                                    <Image
                                        src="/images/profile.png"
                                        alt="Alzobair Elkhalifa"
                                        layout="fill"
                                        objectFit="cover"
                                        sizes="(max-width: 1024px) 80vw, 420px"
                                        priority
                                        className="animate-float"
                                    />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
                                </div>
                                <div className="mt-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-semibold">Alzobair Elkhalifa</p>
                                        <p className="text-xs text-slate-400 mt-0.5">Software Developer · Dubai, UAE</p>
                                    </div>
                                    <a
                                        href="/files/AlzobairElkhalifaCv.pdf"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-10 h-10 rounded-lg grid place-items-center border border-white/10 text-slate-200 hover:border-emerald-400/50 hover:text-emerald-300 transition"
                                        aria-label="Download CV"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FEATURED APP */}
                <a
                    href="https://play.google.com/store/apps/details?id=zxc.laitooo.manga.online"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Manga Online on Google Play"
                    className="mt-16 md:mt-24 group block surface p-6 md:p-10 relative overflow-hidden hover:border-emerald-400/40 transition"
                >
                    <div className="absolute -top-24 -right-24 w-[32rem] h-[32rem] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-cyan-500/[0.08] blur-3xl pointer-events-none" />

                    <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-7 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="chip chip-accent">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                                    Featured app
                                </span>
                                <span className="chip">Flutter</span>
                                <span className="chip">Android</span>
                            </div>

                            <div className="mt-5 flex items-center gap-5">
                                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] shrink-0 shadow-lg shadow-emerald-500/10">
                                    <Image
                                        src="/screenshots/covers/manga.jpg"
                                        alt="Manga Online icon"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight truncate">
                                        Manga Online
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-400">
                                        A reader for Asian manga · <span className="text-slate-300">4.2 ★</span> on Google Play
                                    </p>
                                </div>
                            </div>

                            <div className="mt-7 flex items-end gap-3">
                                <span className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text tracking-tight leading-none">
                                    1.99M+
                                </span>
                                <span className="pb-2 text-sm md:text-base text-slate-400 uppercase tracking-widest">
                                    downloads<br className="hidden sm:block" /> on Google Play
                                </span>
                            </div>

                            <p className="mt-5 max-w-xl text-slate-300 text-base md:text-lg leading-relaxed">
                                Simple, fast, and focused on the reading experience — the app I&apos;m proudest of shipping, now with nearly <span className="text-white font-semibold">two million</span> downloads.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <span className="btn-primary-accent pointer-events-none">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                        <path d="M3.6 2.3c-.4.3-.6.8-.6 1.4v16.6c0 .6.2 1.1.6 1.4l9.5-9.7-9.5-9.7zm10.6 10.8l2.6 2.6-11.2 6.4 8.6-9zm0-2.2l-8.6-9 11.2 6.4-2.6 2.6zm6.6-1.2c.9.5 1.3 1.2 1.3 1.9s-.4 1.4-1.3 1.9l-2.4 1.4-2.9-2.9 2.9-2.9 2.4 1.6z"/>
                                    </svg>
                                    Get it on Google Play
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                                        <path d="M5 12h14"/><path d="M13 5l7 7-7 7"/>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Screenshots stack */}
                        <div className="lg:col-span-5 relative h-[380px] md:h-[460px] lg:h-[500px] hidden sm:block">
                            {['/screenshots/manga/1.jpg', '/screenshots/manga/2.jpg', '/screenshots/manga/3.jpg'].map((src, i) => {
                                const positions = [
                                    'left-[8%]  top-6 rotate-[-8deg] z-10',
                                    'left-[32%] top-0 rotate-[0deg]  z-20',
                                    'left-[56%] top-6 rotate-[8deg]  z-10',
                                ]
                                return (
                                    <div
                                        key={src}
                                        className={
                                            'absolute w-[42%] md:w-[38%] aspect-[9/19] rounded-[2rem] overflow-hidden border border-white/10 bg-black shadow-2xl shadow-black/50 transition-transform duration-500 group-hover:-translate-y-1 ' +
                                            positions[i]
                                        }
                                        style={{ transitionDelay: `${i * 60}ms` }}
                                    >
                                        <Image
                                            src={src}
                                            alt=""
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem]" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </a>

                {/* stats bar */}
                <div className="mt-10 md:mt-14 surface p-6 md:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <p className="text-3xl md:text-4xl font-semibold gradient-text tracking-tight">{s.value}</p>
                            <p className="mt-1 text-xs md:text-sm text-slate-400 uppercase tracking-widest">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* WHAT I DO */}
            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 py-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <span className="section-title">What I do</span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight">A focused, modern stack</h2>
                    </div>
                    <p className="max-w-md text-slate-400">Ship-ready mobile and web work with a couple of side quests in game dev and machine learning.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stack.map((s) => (
                        <div key={s.name} className="surface surface-hover p-6">
                            <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 grid place-items-center">
                                <Image src={s.icon} alt={s.name} width={32} height={32} className="w-8 h-8" />
                            </div>
                            <div className="mt-5 flex items-center gap-2">
                                <h3 className="text-white text-lg font-semibold">{s.name}</h3>
                                <span className="chip">{s.tag}</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-400 leading-relaxed">{s.copy}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* MARQUEE */}
            <section className="relative z-10 py-8 overflow-hidden">
                <div className="max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12">
                    <div className="border-y border-white/5 py-6 relative">
                        <div
                            className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#05070d] to-transparent z-10"
                            aria-hidden
                        />
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#05070d] to-transparent z-10"
                            aria-hidden
                        />
                        <div className="flex gap-12 animate-marquee whitespace-nowrap">
                            {[...marqueeLangs, ...marqueeLangs].map((t, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-300 shrink-0">
                                    <Image src={t.icon} alt={t.name} width={24} height={24} className="w-6 h-6 opacity-80" />
                                    <span className="text-sm uppercase tracking-widest">{t.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED WORK */}
            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 py-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <span className="section-title">Selected work</span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight">Recent projects</h2>
                    </div>
                    <Link href="/projects">
                        <a className="btn-outline-soft text-sm">
                            See everything
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg>
                        </a>
                    </Link>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map((p) => (
                        <Link key={p.id} href={`/projects/${p.id}`}>
                            <a>
                                <ProjectCard project={p} />
                            </a>
                        </Link>
                    ))}
                </div>
            </section>

            {/* RECENT EXPERIENCE */}
            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 py-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <span className="section-title">Where I&apos;ve been</span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight">Recent experience</h2>
                    </div>
                    <Link href="/career">
                        <a className="btn-outline-soft text-sm">
                            Full career
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg>
                        </a>
                    </Link>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {recentJobs.map((j) => {
                        const end = j.endDate ?? new Date()
                        const months = Math.max(0, (end.getFullYear() - j.startDate.getFullYear()) * 12 + (end.getMonth() - j.startDate.getMonth()) + 1)
                        const y = Math.floor(months / 12), m = months % 12
                        const duration = y && m ? `${y} ${y > 1 ? 'years' : 'year'} ${m} ${m > 1 ? 'months' : 'month'}` : y ? `${y} ${y > 1 ? 'years' : 'year'}` : `${m} ${m > 1 ? 'months' : 'month'}`
                        const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                        return (
                            <div key={j.id} className="surface surface-hover p-6">
                                <span className="chip chip-accent">{duration}</span>
                                <h3 className="mt-4 text-white text-lg font-semibold tracking-tight">{j.title}</h3>
                                <a href={j.companyUrl} target="_blank" rel="noreferrer" className="text-emerald-300 text-sm link-underline">{j.companyName}</a>
                                <p className="mt-3 text-sm text-slate-400">{fmt(j.startDate)} — {j.endDate ? fmt(j.endDate) : 'Present'}</p>
                                <p className="mt-4 text-sm text-slate-400 line-clamp-4 leading-relaxed">{j.details.split('\n')[0]}</p>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 py-16">
                <div className="surface p-10 md:p-14 relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
                    <div className="relative grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <span className="section-title">Let&apos;s build</span>
                            <h3 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight">
                                Have a project in mind?
                            </h3>
                            <p className="mt-3 text-slate-400 max-w-md">
                                I&apos;m open to mobile, web, and product-engineering roles or freelance collaborations.
                            </p>
                        </div>
                        <div className="flex md:justify-end gap-3 flex-wrap">
                            <a href={email} className="btn-primary-accent">Say hello</a>
                            <a href="/files/AlzobairElkhalifaCv.pdf" target="_blank" rel="noreferrer" className="btn-outline-soft">Download CV</a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Home
