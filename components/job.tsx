import { Jop } from '../models/job'

const monthYear = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

const monthDiff = (start: Date, end: Date) => {
    const years = end.getFullYear() - start.getFullYear()
    const months = end.getMonth() - start.getMonth()
    return Math.max(0, years * 12 + months + 1) // inclusive of end month
}

const formatDuration = (months: number) => {
    const y = Math.floor(months / 12)
    const m = months % 12
    if (y && m) return `${y} ${y > 1 ? 'years' : 'year'} ${m} ${m > 1 ? 'months' : 'month'}`
    if (y) return `${y} ${y > 1 ? 'years' : 'year'}`
    return `${m} ${m > 1 ? 'months' : 'month'}`
}

const JopCard = (probs: { job: Jop }) => {
    const j = probs.job
    const end = j.endDate ?? new Date()
    const duration = formatDuration(monthDiff(j.startDate, end))
    const endLabel = j.endDate ? monthYear(j.endDate) : 'Present'

    return (
        <li className="relative pl-8 md:pl-12 pb-12 last:pb-0">
            <span className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-emerald-400 pulse-dot" />
            <div className="absolute left-[5px] top-4 bottom-0 w-px bg-gradient-to-b from-white/15 to-transparent" />

            <div className="surface p-6 md:p-8 surface-hover">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="chip">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                        {monthYear(j.startDate)} — {endLabel}
                    </span>
                    <span className="chip chip-accent">{duration}</span>
                </div>

                <h3 className="mt-4 text-xl md:text-2xl font-semibold text-white tracking-tight">
                    {j.title}
                    <span className="text-slate-400 font-normal"> · </span>
                    <a href={j.companyUrl} target="_blank" rel="noreferrer" className="text-emerald-300 link-underline">
                        {j.companyName}
                    </a>
                </h3>

                <div className="mt-4 space-y-2 text-slate-300 leading-relaxed text-[0.95rem]">
                    {j.details.split('\n').map((line, i) => {
                        const trimmed = line.trim()
                        if (!trimmed) return null
                        if (trimmed.startsWith('•')) {
                            return (
                                <div key={i} className="flex gap-3">
                                    <span className="text-emerald-400 mt-1.5 leading-none">▸</span>
                                    <span>{trimmed.replace(/^•\s*/, '')}</span>
                                </div>
                            )
                        }
                        return (
                            <p key={i} className="text-slate-200 font-medium">{trimmed}</p>
                        )
                    })}
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                    {j.toolsUsed.split(/[,&]/).map((t, i) => {
                        const label = t.trim()
                        if (!label) return null
                        return <span key={i} className="chip">{label}</span>
                    })}
                </div>
            </div>
        </li>
    )
}

export default JopCard
