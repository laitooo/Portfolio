import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const links = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/career', label: 'Career' },
    { href: '/publications', label: 'Publications' },
    { href: '/cv', label: 'CV' },
    { href: '/about', label: 'About' },
]

const NavBar: NextPage = () => {
    const router = useRouter()
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const isActive = (href: string) => {
        if (href === '/') return router.pathname === '/'
        return router.pathname === href || router.pathname.startsWith(href + '/')
    }

    return (
        <header className="sticky top-0 z-40">
            <div
                className={
                    'transition-all duration-300 ' +
                    (scrolled
                        ? 'backdrop-blur-xl bg-[#05070d]/70 border-b border-white/5'
                        : 'backdrop-blur-md bg-transparent border-b border-transparent')
                }
            >
                <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-4 flex items-center justify-between">
                    <Link href="/">
                        <a className="group flex items-center gap-2">
                            <img
                                src="/images/logo.png"
                                alt=""
                                className="w-9 h-9 rounded-lg shadow-lg shadow-emerald-500/20"
                            />
                            <span className="text-lg md:text-xl font-semibold tracking-tight text-white">
                                alzobair<span className="text-emerald-400">.</span>dev
                            </span>
                        </a>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1">
                        {links.map((l) => (
                            <Link key={l.href} href={l.href}>
                                <a
                                    className={
                                        'relative px-4 py-2 text-sm rounded-lg transition-colors ' +
                                        (isActive(l.href)
                                            ? 'text-white'
                                            : 'text-slate-400 hover:text-white')
                                    }
                                >
                                    {l.label}
                                    {isActive(l.href) && (
                                        <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                                    )}
                                </a>
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center gap-3">
                        <a
                            href="/files/AlzobairElkhalifaCv.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="btn-primary-accent text-sm"
                        >
                            Resume
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>
                        </a>
                    </div>

                    <button
                        aria-label="Toggle navigation"
                        onClick={() => setOpen((v) => !v)}
                        className="lg:hidden w-10 h-10 grid place-items-center rounded-lg border border-white/10 text-slate-200"
                    >
                        {open ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
                        )}
                    </button>
                </div>

                {open && (
                    <div className="lg:hidden border-t border-white/5 bg-[#05070d]/90 backdrop-blur-xl">
                        <div className="max-w-7xl mx-auto px-5 py-3 flex flex-col">
                            {links.map((l) => (
                                <Link key={l.href} href={l.href}>
                                    <a
                                        onClick={() => setOpen(false)}
                                        className={
                                            'px-3 py-3 rounded-lg text-sm ' +
                                            (isActive(l.href)
                                                ? 'text-emerald-300 bg-emerald-500/5'
                                                : 'text-slate-300 hover:bg-white/5')
                                        }
                                    >
                                        {l.label}
                                    </a>
                                </Link>
                            ))}
                            <a
                                href="/files/AlzobairElkhalifaCv.pdf"
                                target="_blank"
                                rel="noreferrer"
                                className="mt-2 btn-primary-accent justify-center text-sm"
                            >
                                Download Resume
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default NavBar
