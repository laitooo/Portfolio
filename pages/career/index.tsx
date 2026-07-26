import type { NextPage } from 'next'
import Footer from '../../components/footer'
import NavBar from '../../components/navbar'
import MetaData from '../../components/metadata'
import { jobsList } from '../../data/jobsList'
import JopCard from '../../components/job'

const WorkExperience: NextPage = () => {
    const jobs = [...jobsList].sort((a, b) => (a.id < b.id ? -1 : 1))

    return (
        <div className="min-h-screen flex flex-col">
            <MetaData
                title="Career · Alzobair Elkhalifa"
                description="Work experience — mobile and full-stack roles across fin-tech, health, and startups."
            />
            <NavBar />

            <section className="relative z-10 max-w-5xl mx-auto w-full px-5 md:px-8 pt-16 md:pt-20 pb-10">
                <span className="section-title">Career</span>
                <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                    A <span className="gradient-text">timeline</span> of my work.
                </h1>
                <p className="mt-5 text-slate-400 max-w-2xl text-lg leading-relaxed">
                    {jobs.length} roles across mobile and web engineering — from native Android in Java, to leading
                    Flutter teams, to full-stack development for fin-tech and startup platforms.
                </p>
            </section>

            <section className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-5 md:px-8 pb-20">
                <ol className="relative">
                    {jobs.map((item) => (
                        <JopCard key={item.id} job={item} />
                    ))}
                </ol>
            </section>

            <Footer />
        </div>
    )
}

export default WorkExperience
