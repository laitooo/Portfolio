import type { NextPage } from 'next'
import Link from 'next/link'
import Footer from '../../components/footer'
import NavBar from '../../components/navbar'
import MetaData from '../../components/metadata'
import TierList, { TierItem } from '../../components/tierList'
import moviesData from '../../data/movies.json'

type Movie = {
    rating: number
    name: string
    image: string
    url: string
    genre: string
    year: number
    director?: string
}

const items: TierItem[] = (moviesData.movies as Movie[]).map((m) => ({
    rating: m.rating,
    name: m.name,
    image: m.image,
    url: m.url,
    tooltip: [m.name, m.director, m.year].filter(Boolean).join(' · '),
}))

const Movies: NextPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <MetaData
                title="Movies · Alzobair Elkhalifa"
                description="A tier list of movies I've watched, rated from 10/10 down to 1/10."
            />
            <NavBar />

            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pt-16 md:pt-20 pb-8">
                <div className="grid md:grid-cols-2 gap-8 md:items-end">
                    <div>
                        <span className="section-title">Hobby · Movies</span>
                        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                            Movie <span className="gradient-text">tier list</span>.
                        </h1>
                    </div>
                    <p className="text-slate-400 text-lg leading-relaxed md:justify-self-end md:max-w-md">
                        Films I&apos;ve seen, ranked from <span className="text-white">10/10</span> down to <span className="text-white">1/10</span>. Click a poster to open the trailer.
                    </p>
                </div>

                <div className="mt-8">
                    <Link href="/about"><a className="btn-outline-soft">← Back to about</a></Link>
                </div>
            </section>

            <section className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pb-20">
                <TierList items={items} tileAspect="2 / 3" />

                <p className="mt-4 text-xs text-slate-500">
                    Click a poster to open the trailer on YouTube.
                </p>
            </section>

            <Footer />
        </div>
    )
}

export default Movies
