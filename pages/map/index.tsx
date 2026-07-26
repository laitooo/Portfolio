import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { NextPage } from 'next'
import MetaData from '../../components/metadata'
import NavBar from '../../components/navbar'
import Footer from '../../components/footer'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? ''

interface MapComponentProps {
    selectedCountries: string[]
}

const palette = [
    '#34d399', '#22d3ee', '#a78bfa', '#f472b6',
    '#f59e0b', '#fb7185', '#60a5fa', '#4ade80',
]

const MapComponent: React.FC<MapComponentProps> = ({ selectedCountries }) => {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<mapboxgl.Map | null>(null)

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [30, 20],
            zoom: 1.6,
        })

        map.current.on('load', () => {
            map.current!.addSource('countries', {
                type: 'geojson',
                data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson',
            })

            map.current!.addLayer({
                id: 'countries-borders',
                type: 'line',
                source: 'countries',
                paint: { 'line-color': 'rgba(148,163,184,0.35)', 'line-width': 0.5 },
            })

            selectedCountries.forEach((code, i) => {
                map.current!.addLayer({
                    id: 'highlighted-country-' + code,
                    type: 'fill',
                    source: 'countries',
                    paint: {
                        'fill-color': palette[i % palette.length],
                        'fill-opacity': 0.55,
                    },
                    filter: ['in', ['get', 'iso_a2'], ['literal', [code]]],
                })
            })
        })

        return () => map.current?.remove()
    }, [selectedCountries])

    return <div ref={mapContainer} className="w-full h-[70vh] md:h-[75vh] rounded-2xl overflow-hidden" />
}

const countries = [
    { code: 'SD', name: 'Sudan' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'LK', name: 'Sri Lanka' },
    { code: 'AE', name: 'UAE' },
    { code: 'KE', name: 'Kenya' },
    { code: 'MA', name: 'Morocco' },
    { code: 'EG', name: 'Egypt' },
]

const VisitedCountries: NextPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <MetaData
                title="Travels · Alzobair Elkhalifa"
                description="Map of countries I've been to."
            />
            <NavBar />

            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pt-16 md:pt-20 pb-6">
                <div className="grid md:grid-cols-2 md:items-end gap-6">
                    <div>
                        <span className="section-title">Travels</span>
                        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                            Countries <span className="gradient-text">I&apos;ve visited</span>.
                        </h1>
                    </div>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                        {countries.map((c) => (
                            <span key={c.code} className="chip">{c.name}</span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pb-16">
                <div className="surface p-3 md:p-4">
                    <MapComponent selectedCountries={countries.map((c) => c.code)} />
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default VisitedCountries
