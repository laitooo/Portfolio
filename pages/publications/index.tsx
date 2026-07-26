import type { NextPage } from 'next'
import Footer from '../../components/footer'
import NavBar from '../../components/navbar'
import MetaData from '../../components/metadata'
import { papersList } from '../../data/papersList'
import PaperCard from '../../components/paper'

const PublicationsPage: NextPage = () => {
    const papers = [...papersList].sort((a, b) => (a.id < b.id ? -1 : 1))
    return (
        <div className="min-h-screen flex flex-col">
            <MetaData
                title="Publications · Alzobair Elkhalifa"
                description="Research publications by Alzobair Elkhalifa."
            />
            <NavBar />

            <section className="relative z-10 max-w-5xl mx-auto w-full px-5 md:px-8 pt-16 md:pt-20 pb-8">
                <span className="section-title">Publications</span>
                <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                    Research <span className="gradient-text">papers</span>.
                </h1>
                <p className="mt-5 text-slate-400 max-w-2xl text-lg leading-relaxed">
                    Papers I&apos;ve co-authored, mostly at the intersection of civil engineering and machine learning.
                </p>
            </section>

            <section className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-5 md:px-8 pb-20 space-y-6">
                {papers.map((p) => (
                    <PaperCard key={p.id} paper={p} />
                ))}
            </section>

            <Footer />
        </div>
    )
}

export default PublicationsPage
