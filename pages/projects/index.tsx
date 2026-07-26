import type { NextPage } from 'next'
import ProjectCard from '../../components/project'
import { projectsList } from '../../data/projectsList'
import Footer from '../../components/footer'
import { useMemo, useState } from 'react'
import { ProjectCategory } from '../../models/project'
import NavBar from '../../components/navbar'
import Link from 'next/link'
import MetaData from '../../components/metadata'

type Filter = 'all' | ProjectCategory

const filters: { key: Filter; label: string; icon?: string }[] = [
    { key: 'all', label: 'All' },
    { key: ProjectCategory.flutter, label: 'Flutter', icon: '/icons/flutter.svg' },
    { key: ProjectCategory.android, label: 'Android', icon: '/icons/android.svg' },
    { key: ProjectCategory.unity, label: 'Unity', icon: '/icons/unity.png' },
    { key: ProjectCategory.nextJs, label: 'Next.js', icon: '/icons/nextjs.svg' },
]

const Projects: NextPage = () => {
    const [filter, setFilter] = useState<Filter>('all')

    const visible = useMemo(() => {
        const list = filter === 'all' ? projectsList : projectsList.filter((p) => p.category === filter)
        return [...list].sort((a, b) => (a.id < b.id ? -1 : 1))
    }, [filter])

    return (
        <div className="min-h-screen flex flex-col">
            <MetaData
                title="Projects · Alzobair Elkhalifa"
                description="Projects by Alzobair Elkhalifa — Flutter, Android, Unity, and Next.js work."
            />
            <NavBar />

            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pt-16 md:pt-20 pb-8">
                <div className="grid md:grid-cols-2 gap-8 md:items-end">
                    <div>
                        <span className="section-title">Projects</span>
                        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                            Things I&apos;ve <span className="gradient-text">built</span>.
                        </h1>
                    </div>
                    <p className="text-slate-400 text-lg leading-relaxed md:justify-self-end md:max-w-md">
                        A selection of published apps, open-source experiments, small games and internal platforms.
                    </p>
                </div>
            </section>

            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pt-4 pb-6">
                <div className="flex flex-wrap gap-2 p-2 surface w-fit">
                    {filters.map((f) => {
                        const active = filter === f.key
                        return (
                            <button
                                key={String(f.key)}
                                onClick={() => setFilter(f.key)}
                                className={
                                    'px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition ' +
                                    (active
                                        ? 'bg-gradient-to-br from-emerald-400 to-cyan-400 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20'
                                        : 'text-slate-300 hover:text-white hover:bg-white/5')
                                }
                            >
                                {f.icon && <img src={f.icon} alt="" className="w-4 h-4" />}
                                {f.label}
                            </button>
                        )
                    })}
                </div>
                <p className="mt-4 text-xs uppercase tracking-widest text-slate-500">
                    {visible.length} {visible.length === 1 ? 'project' : 'projects'}
                </p>
            </section>

            <section className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pb-20">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visible.map((item, index) => (
                        <Link key={`${item.id}-${index}`} href={{ pathname: '/projects/project', query: { id: item.id } }}>
                            <a>
                                <ProjectCard project={item} />
                            </a>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Projects
