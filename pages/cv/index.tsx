import type { NextPage } from 'next'
import Footer from '../../components/footer'
import NavBar from '../../components/navbar'
import { Document, Page, pdfjs } from 'react-pdf'
import React, { useState, useEffect } from 'react'
import MetaData from '../../components/metadata'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const Cv: NextPage = () => {
    const [numPages, setNumPages] = useState(0)
    const size = useWindowSize()

    const width = Math.min(900, Math.max(320, size.width * 0.85))

    return (
        <div className="min-h-screen flex flex-col">
            <MetaData
                title="CV · Alzobair Elkhalifa"
                description="CV / Résumé of Alzobair Elkhalifa."
            />
            <NavBar />

            <section className="relative z-10 max-w-5xl mx-auto w-full px-5 md:px-8 pt-16 md:pt-20 pb-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <span className="section-title">Résumé</span>
                        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                            My <span className="gradient-text">CV</span>.
                        </h1>
                        <p className="mt-4 text-slate-400 max-w-xl">Preview below, or download the PDF.</p>
                    </div>
                    <a
                        href="/files/AlzobairElkhalifaCv.pdf"
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="btn-primary-accent"
                    >
                        Download PDF
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>
                    </a>
                </div>
            </section>

            <section className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-5 md:px-8 pb-20">
                <div className="surface p-4 md:p-6">
                    <div className="rounded-xl overflow-hidden bg-slate-950/60 flex justify-center min-h-[400px]">
                        <Document
                            file={'/files/AlzobairElkhalifaCv.pdf'}
                            onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
                            loading={
                                <div className="py-24 grid place-items-center">
                                    <div className="w-10 h-10 rounded-full border-2 border-slate-700 border-t-emerald-400 animate-spin" />
                                </div>
                            }
                        >
                            <div className="flex flex-col items-center gap-6 py-6">
                                {Array.from(new Array(numPages), (_, index) => (
                                    <Page
                                        width={width}
                                        className="rounded-lg overflow-hidden shadow-2xl shadow-black/40"
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                    />
                                ))}
                            </div>
                        </Document>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <a
                        href="/files/AlzobairElkhalifaCv.pdf"
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="btn-outline-soft"
                    >
                        Download PDF
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    )
}

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

    useEffect(() => {
        if (typeof window === 'undefined') return
        const handler = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        handler()
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [])

    return windowSize
}

export default Cv
