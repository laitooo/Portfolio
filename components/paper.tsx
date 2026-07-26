import { Paper } from '../models/paper'

const PaperCard = (probs: { paper: Paper }) => {
    const p = probs.paper
    return (
        <article className="surface surface-hover p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="chip chip-accent">Research Paper</span>
                <span className="chip">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                    {p.date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
            </div>
            <h3 className="mt-4 text-white text-xl md:text-2xl font-semibold tracking-tight leading-snug">
                {p.title}
            </h3>
            <p className="mt-3 text-slate-400">
                Presented at <span className="text-slate-200">{p.conference}</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
                <a href={p.url} target="_blank" rel="noreferrer" download className="btn-primary-accent text-sm">
                    Download paper
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>
                </a>
                <a href={p.journalUrl} target="_blank" rel="noreferrer" className="btn-outline-soft text-sm">
                    Google Scholar
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>
                </a>
            </div>
        </article>
    )
}

export default PaperCard
