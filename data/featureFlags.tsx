export const featureFlags = {
    showFacebook: false,
} as const

export type FeatureFlag = keyof typeof featureFlags
