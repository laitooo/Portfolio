import type { NextPage } from 'next'
import Link from 'next/link'
import Footer from '../../components/footer'
import NavBar from '../../components/navbar'
import MetaData from '../../components/metadata'
import { jigsawList } from '../../data/jigsawList'

const Jigsaw: NextPage = () => {
    const total = jigsawList.length
    const totalPieces = jigsawList.reduce((sum, p) => sum + p.pieces, 0)

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

                <div className="mt-8 flex flex-wrap gap-3">
                    <span className="px-3 py-1.5 rounded-full text-xs uppercase tracking-widest border border-white/10 bg-white/[0.03] text-slate-300">
                        {total} solved
                    </span>
                    <span className="px-3 py-1.5 rounded-full text-xs uppercase tracking-widest border border-white/10 bg-white/[0.03] text-slate-300">
                        {totalPieces.toLocaleString()} pieces total
                    </span>
                    <Link href="/about"><a className="btn-outline-soft">← Back to about</a></Link>
                </div>
            </section>

            <section className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pb-20">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jigsawList.map((p) => (
                        <div
                            key={p.id}
                            className="surface surface-hover overflow-hidden group"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.03]">
                                <img
                                    src={p.image}
                                    alt={`Jigsaw puzzle #${p.id}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                                <div className="absolute top-3 right-3">
                                    <span
                                        className={
                                            'px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide backdrop-blur-md border ' +
                                            (p.pieces === 1000
                                                ? 'bg-cyan-400/15 border-cyan-400/30 text-cyan-200'
                                                : 'bg-emerald-400/15 border-emerald-400/30 text-emerald-200')
                                        }
                                    >
                                        {p.pieces} pieces
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <p className="text-white font-medium">Puzzle #{p.id}</p>
                                <span className="text-xs text-slate-400">🧩</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Jigsaw
