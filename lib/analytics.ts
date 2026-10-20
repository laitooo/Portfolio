import { getAnalytics, isSupported, logEvent, setAnalyticsCollectionEnabled, Analytics } from 'firebase/analytics'
import { firebaseApp } from './firebase'

// Visiting the site once with ?noanalytics=1 stores this flag in the browser,
// so the site owner's own visits are never counted again on that device.
const OWNER_STORAGE_KEY = 'az_owner'

export const isOwner = (): boolean => {
    if (typeof window === 'undefined') return false
    try {
        return window.localStorage.getItem(OWNER_STORAGE_KEY) === '1'
    } catch {
        return false
    }
}

export const setOwnerFlagFromQuery = (search: string): void => {
    if (!/(^|[?&])noanalytics=1(&|$)/.test(search)) return
    try {
        window.localStorage.setItem(OWNER_STORAGE_KEY, '1')
    } catch {
        // private browsing / storage disabled — nothing we can persist
    }
}

let analyticsInstance: Analytics | null | undefined

const getInstance = async (): Promise<Analytics | null> => {
    if (typeof window === 'undefined') return null
    if (analyticsInstance !== undefined) return analyticsInstance

    analyticsInstance = (await isSupported()) ? getAnalytics(firebaseApp) : null
    if (analyticsInstance) {
        setAnalyticsCollectionEnabled(analyticsInstance, !isOwner())
    }
    return analyticsInstance
}

export const initAnalytics = (): void => {
    void getInstance()
}

export const trackPageView = async (path: string): Promise<void> => {
    if (isOwner()) return
    const analytics = await getInstance()
    if (!analytics) return
    logEvent(analytics, 'page_view', { page_path: path })
}

export const trackEvent = async (
    name: string,
    properties?: Record<string, string | number | boolean>
): Promise<void> => {
    if (isOwner()) return
    const analytics = await getInstance()
    if (!analytics) return
    logEvent(analytics, name, properties)
}
