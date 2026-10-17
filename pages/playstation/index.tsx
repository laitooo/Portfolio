import type { NextPage } from 'next'
import Link from 'next/link'
import Footer from '../../components/footer'
import NavBar from '../../components/navbar'
import MetaData from '../../components/metadata'
import TierList, { TierItem } from '../../components/tierList'
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

const items: TierItem[] = (playstationGames.games as Game[]).map((g) => ({
    rating: g.rating,
    name: g.name,
    image: g.image,
    url: g.url,
    tooltip: `${g.name} · ${g.platform} · ${g.year}`,
}))

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
                <TierList items={items} tileAspect="3 / 4" />

                <p className="mt-4 text-xs text-slate-500">
                    Click a cover to open the game&apos;s page.
                </p>
            </section>

            <Footer />
        </div>
    )
}

export default PlayStation
