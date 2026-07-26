import type { NextPage } from 'next'
import { email, facebook, github, linkedin, telegram, twitter, youtube } from '../data/socialMedia'
import { featureFlags } from '../data/featureFlags'

type Social = {
    label: string
    href: string
    svg: JSX.Element
}

const allSocials: (Social & { flag?: keyof typeof featureFlags })[] = [
    {
        label: 'GitHub',
        href: github,
        svg: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 22.3 24 17.8 24 12.5 24 5.9 18.6.5 12 .5z"/>
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: linkedin,
        svg: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.7A1.7 1.7 0 1 1 6.5 5.3a1.7 1.7 0 0 1 0 3.4zM19 19h-3v-4.7c0-1.1 0-2.5-1.5-2.5S13 13 13 14.2V19h-3v-9h2.9v1.3h.1a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.7 2 3.7 4.7V19z"/>
            </svg>
        ),
    },
    {
        label: 'X / Twitter',
        href: twitter,
        svg: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2H21l-6.52 7.45L22 22h-6.828l-4.77-6.24L4.8 22H2l6.98-7.97L2 2h6.914l4.3 5.68L18.244 2zm-2.4 18h1.53L7.3 4H5.66l10.184 16z"/>
            </svg>
        ),
    },
    {
        label: 'Telegram',
        href: telegram,
        svg: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9.9 15.3l-.4 4c.5 0 .8-.2 1.1-.5l2.6-2.5 5.4 3.9c1 .6 1.7.3 2-.9l3.5-16.5c.3-1.4-.5-2-1.5-1.6L1.5 9.6C.1 10.2.2 11 1.3 11.4l5 1.6L18 5.6c.6-.3 1.1-.1.6.3"/>
            </svg>
        ),
    },
    {
        label: 'YouTube',
        href: youtube,
        svg: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2s-.2-1.6-.9-2.3c-.9-1-1.9-1-2.4-1.1C16.8 2.5 12 2.5 12 2.5s-4.8 0-8.2.3c-.5.1-1.5.1-2.4 1.1C.7 4.6.5 6.2.5 6.2S.2 8 .2 9.8v1.9c0 1.8.3 3.6.3 3.6s.2 1.6.9 2.3c.9 1 2.1.9 2.6 1 1.9.2 8 .3 8 .3s4.8 0 8.2-.3c.5-.1 1.5-.1 2.4-1.1.7-.7.9-2.3.9-2.3s.3-1.8.3-3.6V9.8c0-1.8-.3-3.6-.3-3.6zM9.8 14V7.9l6.3 3-6.3 3.1z"/>
            </svg>
        ),
    },
    {
        label: 'Facebook',
        href: facebook,
        flag: 'showFacebook',
        svg: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.4c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12h2.6l-.4 3H13.4v7A10 10 0 0 0 22 12z"/>
            </svg>
        ),
    },
    {
        label: 'Email',
        href: email,
        svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <path d="M3 7l9 6 9-6"/>
            </svg>
        ),
    },
]

const socials = allSocials.filter((s) => !s.flag || featureFlags[s.flag])

const Footer: NextPage = () => {
    const year = new Date().getFullYear()
    return (
        <footer className="relative z-10 mt-24">
            <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
                <div className="border-t border-white/5 pt-10 pb-8">
                    <div className="grid gap-8 md:grid-cols-3 md:items-start">
                        <div>
                            <div className="flex items-center gap-2">
                                <img src="/images/logo.png" alt="" className="w-9 h-9 rounded-lg" />
                                <span className="text-white font-semibold">alzobair<span className="text-emerald-400">.</span>dev</span>
                            </div>
                            <p className="mt-4 text-sm text-slate-400 max-w-sm leading-relaxed">
                                Software developer crafting mobile & web products. Currently building fin-tech and travel platforms with Flutter and Next.js.
                            </p>
                        </div>

                        <div className="md:justify-self-center">
                            <p className="text-xs uppercase tracking-widest text-slate-500">Say hello</p>
                            <a href={email} className="mt-3 block text-lg text-white link-underline">alziber50@gmail.com</a>
                            <p className="mt-2 text-xs text-slate-500">Dubai, UAE · Open to opportunities</p>
                        </div>

                        <div className="md:justify-self-end">
                            <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 md:text-right">Follow</p>
                            <div className="flex flex-wrap gap-2 md:justify-end">
                                {socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        aria-label={s.label}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-10 h-10 grid place-items-center rounded-lg text-slate-300 border border-white/10 bg-white/[0.02] hover:text-emerald-300 hover:border-emerald-400/40 hover:bg-emerald-400/5 transition"
                                    >
                                        <span className="w-4 h-4 block">{s.svg}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                        <p>© {year} Alzobair Elkhalifa. Built with Next.js & Tailwind.</p>
                        <p className="tracking-widest uppercase">Made with <span className="text-emerald-400">◆</span> in Dubai</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
