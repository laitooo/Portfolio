import { Project, ProjectCategory, UrlType } from '../models/project'

const categoryLabel = (c: ProjectCategory) => {
    switch (+c) {
        case ProjectCategory.flutter: return 'Flutter'
        case ProjectCategory.android: return 'Android'
        case ProjectCategory.unity: return 'Unity'
        case ProjectCategory.nextJs: return 'Next.js'
        default: return 'Project'
    }
}

const categoryIcon = (c: ProjectCategory) => {
    switch (+c) {
        case ProjectCategory.flutter: return '/icons/flutter.svg'
        case ProjectCategory.android: return '/icons/android.svg'
        case ProjectCategory.unity: return '/icons/unity.png'
        case ProjectCategory.nextJs: return '/icons/nextjs.svg'
        default: return ''
    }
}

const UrlTag = ({ type }: { type: UrlType }) => {
    switch (+type) {
        case UrlType.googlePlay:
            return (
                <span className="chip bg-emerald-500/10 border-emerald-400/30 text-emerald-200">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M3 2.5v19c0 .3.4.5.6.3l11-9.5c.2-.2.2-.5 0-.7l-11-9.4c-.2-.2-.6 0-.6.3z" opacity=".8"/>
                    </svg>
                    Google Play
                </span>
            )
        case UrlType.github:
            return (
                <span className="chip">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 22.3 24 17.8 24 12.5 24 5.9 18.6.5 12 .5z"/></svg>
                    Open Source
                </span>
            )
        case UrlType.youtube:
            return (
                <span className="chip bg-red-500/10 border-red-400/30 text-red-200">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2s-.2-1.6-.9-2.3c-.9-1-1.9-1-2.4-1.1C16.8 2.5 12 2.5 12 2.5s-4.8 0-8.2.3c-.5.1-1.5.1-2.4 1.1C.7 4.6.5 6.2.5 6.2S.2 8 .2 9.8v1.9c0 1.8.3 3.6.3 3.6s.2 1.6.9 2.3c.9 1 2.1.9 2.6 1 1.9.2 8 .3 8 .3s4.8 0 8.2-.3c.5-.1 1.5-.1 2.4-1.1.7-.7.9-2.3.9-2.3s.3-1.8.3-3.6V9.8c0-1.8-.3-3.6-.3-3.6zM9.8 14V7.9l6.3 3-6.3 3.1z"/></svg>
                    YouTube
                </span>
            )
        case UrlType.website:
            return (
                <span className="chip bg-cyan-500/10 border-cyan-400/30 text-cyan-200">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a13 13 0 0 1 0 18"/><path d="M12 3a13 13 0 0 0 0 18"/></svg>
                    Live site
                </span>
            )
        default:
            return null
    }
}

const ProjectCard = (probs: { project: Project }) => {
    const p = probs.project
    return (
        <div className="group relative surface surface-hover overflow-hidden cursor-pointer h-full flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden">
                <img
                    src={p.imagePath}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="chip chip-accent backdrop-blur">
                        <img src={categoryIcon(p.category)} alt="" className="w-3.5 h-3.5" />
                        {categoryLabel(p.category)}
                    </span>
                    <UrlTag type={p.urlType} />
                </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-white text-lg font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-3">{p.description}</p>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Learn more</span>
                    <span className="w-8 h-8 rounded-full grid place-items-center bg-white/5 text-slate-300 group-hover:bg-emerald-400 group-hover:text-slate-950 transition">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>
                    </span>
                </div>
            </div>
        </div>
    )
}

export const getButton = (urlType: UrlType, url: string) => {
    switch (+urlType) {
        case UrlType.github:
            return (
                <a href={url} target="_blank" rel="noreferrer" className="btn-outline-soft text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 22.3 24 17.8 24 12.5 24 5.9 18.6.5 12 .5z"/></svg>
                    View on GitHub
                </a>
            )
        case UrlType.youtube:
            return (
                <a href={url} target="_blank" rel="noreferrer" className="btn-outline-soft text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#ef4444"><path d="M23.5 6.2s-.2-1.6-.9-2.3c-.9-1-1.9-1-2.4-1.1C16.8 2.5 12 2.5 12 2.5s-4.8 0-8.2.3c-.5.1-1.5.1-2.4 1.1C.7 4.6.5 6.2.5 6.2S.2 8 .2 9.8v1.9c0 1.8.3 3.6.3 3.6s.2 1.6.9 2.3c.9 1 2.1.9 2.6 1 1.9.2 8 .3 8 .3s4.8 0 8.2-.3c.5-.1 1.5-.1 2.4-1.1.7-.7.9-2.3.9-2.3s.3-1.8.3-3.6V9.8c0-1.8-.3-3.6-.3-3.6zM9.8 14V7.9l6.3 3-6.3 3.1z"/></svg>
                    Watch on YouTube
                </a>
            )
        case UrlType.website:
            return (
                <a href={url} target="_blank" rel="noreferrer" className="btn-primary-accent text-sm">
                    Visit website
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>
                </a>
            )
        case UrlType.googlePlay:
            return (
                <a href={url} target="_blank" rel="noreferrer">
                    <img
                        alt="Get it on Google Play"
                        src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
                        width={170}
                    />
                </a>
            )
        default:
            return null
    }
}

export default ProjectCard
