import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Footer from '../../components/footer'
import NavBar from '../../components/navbar'
import MetaData from '../../components/metadata'
import { jigsawList, Puzzle } from '../../data/jigsawList'

const Jigsaw: NextPage = () => {
    const [active, setActive] = useState<Puzzle | null>(null)

    useEffect(() => {
        if (!active) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActive(null)
        }
        window.addEventListener('keydown', onKey)
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', onKey)
            document.body.style.overflow = prev
        }
    }, [active])

    return (
        <div className="min-h-screen flex flex-col">
            <MetaData
                title="Jigsaw puzzles · Alzobair Elkhalifa"
                description="A gallery of jigsaw puzzles I've solved."
            />
            <NavBar />

            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pt-16 md:pt-20 pb-8">
                <div className="grid md:grid-cols-2 gap-8 md:items-end">
                    <div>
                        <span className="section-title">Hobby · Jigsaw</span>
                        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                            Puzzles I&apos;ve <span className="gradient-text">solved</span>.
                        </h1>
                    </div>
                    <p className="text-slate-400 text-lg leading-relaxed md:justify-self-end md:max-w-md">
                        A quiet, satisfying way to unwind. Each one below is a puzzle I sat with until the last piece clicked into place.
                    </p>
                </div>

                <div className="mt-8">
                    <Link href="/about"><a className="btn-outline-soft">← Back to about</a></Link>
                </div>
            </section>

            <section className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jigsawList.map((p) => (
                        <button
                            key={p.id}
                            type="button"
                            onClick={() => setActive(p)}
                            className="group relative text-left rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_20px_40px_-24px_rgba(0,0,0,0.6)] hover:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 transition"
                        >
                            <div className="relative w-full aspect-[4/3] bg-white/[0.03] overflow-hidden">
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                />

                                <span
                                    className={
                                        'absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide backdrop-blur-md border ' +
                                        (p.pieces === 1000
                                            ? 'bg-cyan-500/20 border-cyan-300/40 text-cyan-100'
                                            : 'bg-emerald-500/20 border-emerald-300/40 text-emerald-100')
                                    }
                                >
                                    <span
                                        className={
                                            'inline-block h-1.5 w-1.5 rounded-full ' +
                                            (p.pieces === 1000 ? 'bg-cyan-300' : 'bg-emerald-300')
                                        }
                                    />
                                    {p.pieces.toLocaleString()} pieces
                                </span>

                                <span className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                <span className="pointer-events-none absolute bottom-3 right-3 px-2 py-1 rounded-md text-[10px] uppercase tracking-widest bg-black/50 text-white/90 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    View
                                </span>
                            </div>
                            <div className="px-4 py-3 flex items-center justify-between gap-3 border-t border-white/5">
                                <span className="text-white text-sm font-medium truncate">{p.name}</span>
                                <span className="text-xs text-slate-400 shrink-0">🧩</span>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {active && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={active.name}
                    onClick={() => setActive(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md animate-fade-up"
                >
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setActive(null) }}
                        aria-label="Close"
                        className="absolute top-4 right-4 md:top-6 md:right-6 h-10 w-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white text-lg border border-white/10 transition"
                    >
                        ✕
                    </button>

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center gap-4"
                    >
                        <img
                            src={active.image}
                            alt={active.name}
                            className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                        />
                        <div className="flex items-center gap-3 text-center">
                            <span className="text-white font-medium">{active.name}</span>
                            <span className="text-slate-500">·</span>
                            <span
                                className={
                                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border ' +
                                    (active.pieces === 1000
                                        ? 'bg-cyan-500/20 border-cyan-300/40 text-cyan-100'
                                        : 'bg-emerald-500/20 border-emerald-300/40 text-emerald-100')
                                }
                            >
                                {active.pieces.toLocaleString()} pieces
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )
}

export default Jigsaw
