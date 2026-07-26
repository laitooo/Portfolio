import Head from 'next/head'

const SITE_URL = 'https://alzobair.dev'
const OG_IMAGE = `${SITE_URL}/images/logo.png`

const MetaData = (probs: { title: string; description: string }) => {
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
                name="keywords"
                content="portfolio, Alzobair, Alzobair Elkhalifa, alzobair.dev, software developer, flutter, nextjs"
            />
            <meta name="description" content={probs.description} />
            <meta name="theme-color" content="#05070d" />
            <meta name="author" content="Alzobair Elkhalifa" />
            <link rel="canonical" href={SITE_URL} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="alzobair.dev" />
            <meta property="og:url" content={SITE_URL} />
            <meta property="og:title" content={probs.title} />
            <meta property="og:description" content={probs.description} />
            <meta property="og:image" content={OG_IMAGE} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={probs.title} />
            <meta name="twitter:description" content={probs.description} />
            <meta name="twitter:image" content={OG_IMAGE} />
            <meta charSet="utf-8" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" sizes="512x512" href="/images/logo.png" />
            <link rel="shortcut icon" type="image/png" href="/favicon.png" />
            <link rel="apple-touch-icon" sizes="512x512" href="/images/logo.png" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
                rel="stylesheet"
            />
            <title>{probs.title}</title>
        </Head>
    )
}

export default MetaData
