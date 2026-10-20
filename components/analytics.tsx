import type { NextPage } from 'next'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { initAnalytics, setOwnerFlagFromQuery, trackPageView } from '../lib/analytics'

// Runs once at module load, before the first render, so a cold load of
// ?noanalytics=1 never sneaks in a first tracked pageview.
if (typeof window !== 'undefined') {
    setOwnerFlagFromQuery(window.location.search)
}

const SiteAnalytics: NextPage = () => {
    const router = useRouter()
    const isFirstRender = useRef(true)

    useEffect(() => {
        // Covers client-side navigations to ?noanalytics=1 too, since those
        // don't re-run the module-level check above.
        setOwnerFlagFromQuery(window.location.search)
        initAnalytics()

        // Firebase's own init already records the first page view (via its
        // gtag config call) — only track page views on route changes after that.
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        trackPageView(router.asPath)
    }, [router.asPath])

    return null
}

export default SiteAnalytics
