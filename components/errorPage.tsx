import Link from 'next/link'
import Footer from './footer'
import MetaData from './metadata'
import NavBar from './navbar'

interface ErrorPageProps {
    errorMsg: string
}

const ErrorPage = (props: ErrorPageProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <MetaData title="Not found · Alzobair Elkhalifa" description="Page not found" />
            <NavBar />
            <main className="flex-1 flex items-center justify-center px-6 relative z-10">
                <div className="text-center max-w-lg">
                    <p className="section-title justify-center">Something went wrong</p>
                    <h1 className="mt-4 text-5xl md:text-6xl font-bold gradient-text tracking-tight">404</h1>
                    <p className="mt-4 text-slate-300 text-lg">{props.errorMsg}</p>
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <Link href="/">
                            <a className="btn-primary-accent">Back home</a>
                        </Link>
                        <Link href="/projects">
                            <a className="btn-outline-soft">See projects</a>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ErrorPage
