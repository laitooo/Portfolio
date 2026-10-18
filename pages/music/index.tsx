import type { NextPage } from 'next'
import Link from 'next/link'
import Footer from '../../components/footer'
import NavBar from '../../components/navbar'
import MetaData from '../../components/metadata'
import TierList, { TierItem } from '../../components/tierList'
import musicAlbums from '../../data/musicAlbums.json'

type Album = {
    rating: number
    name: string
    image: string
    url: string
    artist?: string
    genre?: string
    year?: number
}

const items: TierItem[] = (musicAlbums.albums as Album[]).map((a) => ({
    rating: a.rating,
    name: a.artist ? `${a.name} — ${a.artist}` : a.name,
    image: a.image,
    url: a.url,
    tooltip: [a.name, a.artist, a.year].filter(Boolean).join(' · '),
}))

const Music: NextPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <MetaData
                title="Music albums · Alzobair Elkhalifa"
                description="A tier list of albums I love, rated from 10/10 down to 1/10."
            />
            <NavBar />

            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pt-16 md:pt-20 pb-8">
                <div className="grid md:grid-cols-2 gap-8 md:items-end">
                    <div>
                        <span className="section-title">Hobby · Music</span>
                        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                            Album <span className="gradient-text">tier list</span>.
                        </h1>
                    </div>
                    <p className="text-slate-400 text-lg leading-relaxed md:justify-self-end md:max-w-md">
                        Albums I keep coming back to, dropped into tiers from <span className="text-white">10/10</span> down to <span className="text-white">1/10</span>.
                    </p>
                </div>

                <div className="mt-8">
                    <Link href="/about"><a className="btn-outline-soft">← Back to about</a></Link>
                </div>
            </section>

            <section className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pb-20">
                <TierList items={items} tileAspect="1 / 1" />

                <p className="mt-4 text-xs text-slate-500">
                    Click a cover to open the album&apos;s page.
                </p>
            </section>

            <Footer />
        </div>
    )
}

export default Music
