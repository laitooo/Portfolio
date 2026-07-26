import Link from 'next/link'
import Footer from '../../../components/footer'
import NavBar from '../../../components/navbar'
import { projectsList } from '../../../data/projectsList'
import { Carousel } from 'flowbite-react'
import MetaData from '../../../components/metadata'
import { getButton } from '../../../components/project'
import { Project, ProjectCategory } from '../../../models/project'
import ErrorPage from '../../../components/errorPage'

const categoryLabel = (c: ProjectCategory) => {
    switch (+c) {
        case ProjectCategory.flutter: return 'Flutter'
        case ProjectCategory.android: return 'Android'
        case ProjectCategory.unity: return 'Unity'
        case ProjectCategory.nextJs: return 'Next.js'
        default: return 'Project'
    }
}

const ProjectDetails = () => {
    let project: Project | undefined
    if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        if (url.searchParams.has('id')) {
            const id = Number(url.searchParams.get('id'))
            project = projectsList.find((e) => e.id === id)
        }
    }

    if (project === undefined) {
        return <ErrorPage errorMsg="Couldn't find the project with the specified ID." />
    }

    return (
        <div className="min-h-screen flex flex-col">
            <MetaData
                title={`${project.name} · Alzobair Elkhalifa`}
                description={project.description}
            />
            <NavBar />

            <section className="relative z-10 max-w-6xl mx-auto w-full px-5 md:px-8 pt-12 md:pt-16">
                <Link href="/projects">
                    <a className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M11 19l-7-7 7-7"/></svg>
                        All projects
                    </a>
                </Link>

                <div className="mt-8 flex flex-wrap items-center gap-2">
                    <span className="chip chip-accent">{categoryLabel(project.category)}</span>
                </div>
                <h1 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                    {project.name}
                </h1>
                <p className="mt-5 text-slate-300 text-lg max-w-3xl leading-relaxed">
                    {project.description}
                </p>
                <div className="mt-6">
                    {getButton(project.urlType, project.url)}
                </div>
            </section>

            <section className="relative z-10 max-w-6xl mx-auto w-full px-5 md:px-8 py-12 md:py-16">
                <div className="surface p-3 md:p-4">
                    <div className="h-[26rem] md:h-[36rem] rounded-xl overflow-hidden bg-black/40">
                        <Carousel slideInterval={5000}>
                            {project.screenshots.map((value, index) => (
                                <div key={index} className="w-full h-full grid place-items-center bg-slate-950">
                                    <img
                                        alt="screenshot"
                                        src={value}
                                        className="max-h-[36rem] object-contain"
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default ProjectDetails
