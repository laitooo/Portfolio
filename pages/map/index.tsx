import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { NextPage } from 'next'
import MetaData from '../../components/metadata'
import NavBar from '../../components/navbar'
import Footer from '../../components/footer'
import travelPlacesData from '../../data/travelPlaces.json'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? ''

interface MapComponentProps {
    selectedCountries: string[]
    activeCountry: string | null
    onSelectCountry: (code: string | null) => void
}

interface Place {
    name: string
    lat: number
    lng: number
}

const travelPlaces: Record<string, Place[]> = travelPlacesData

const palette = [
    '#34d399', '#22d3ee', '#a78bfa', '#f472b6',
    '#f59e0b', '#fb7185', '#60a5fa', '#4ade80',
]

// GeoJSON coordinates nest arbitrarily deep depending on geometry type
// (Polygon vs MultiPolygon), so walk until we hit a [lng, lat] pair.
function getBbox(geometry: GeoJSON.Geometry): [[number, number], [number, number]] {
    let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity
    const visit = (coords: unknown): void => {
        if (typeof (coords as number[])[0] === 'number') {
            const [lng, lat] = coords as [number, number]
            minLng = Math.min(minLng, lng)
            maxLng = Math.max(maxLng, lng)
            minLat = Math.min(minLat, lat)
            maxLat = Math.max(maxLat, lat)
        } else {
            (coords as unknown[]).forEach(visit)
        }
    }
    visit((geometry as { coordinates: unknown }).coordinates)
    return [[minLng, minLat], [maxLng, maxLat]]
}

function mergeBbox(
    a: [[number, number], [number, number]] | null,
    b: [[number, number], [number, number]],
): [[number, number], [number, number]] {
    if (!a) return b
    return [
        [Math.min(a[0][0], b[0][0]), Math.min(a[0][1], b[0][1])],
        [Math.max(a[1][0], b[1][0]), Math.max(a[1][1], b[1][1])],
    ]
}

const COUNTRIES_GEOJSON_URL = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'

const MapComponent: React.FC<MapComponentProps> = ({ selectedCountries, activeCountry, onSelectCountry }) => {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    // Precomputed from the raw GeoJSON (not mapbox's querySourceFeatures, which only
    // sees tiles currently rendered in the viewport and misses countries off-screen).
    const countryBboxes = useRef<Record<string, [[number, number], [number, number]]>>({})
    const [activeCity, setActiveCity] = useState<{ lat: number; lng: number } | null>(null)
    const prevActiveCountry = useRef<string | null>(null)

    useEffect(() => {
        const m = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [30, 20],
            zoom: 1.6,
        })
        map.current = m

        m.on('load', () => {
            // Hide the base style's own city/town labels so only our custom city
            // labels show at that level (country/continent labels are left alone).
            m.getStyle()?.layers?.forEach((layer) => {
                if (layer.type === 'symbol' && /settlement/i.test(layer.id)) {
                    m.setLayoutProperty(layer.id, 'visibility', 'none')
                }
            })

            m.addSource('countries', {
                type: 'geojson',
                data: COUNTRIES_GEOJSON_URL,
            })

            fetch(COUNTRIES_GEOJSON_URL)
                .then((res) => res.json())
                .then((geojson: GeoJSON.FeatureCollection) => {
                    const codes = new Set(selectedCountries)
                    const bboxes: Record<string, [[number, number], [number, number]]> = {}
                    geojson.features.forEach((f) => {
                        const code = (f.properties as { iso_a2?: string } | null)?.iso_a2
                        if (code && codes.has(code)) {
                            bboxes[code] = mergeBbox(bboxes[code] ?? null, getBbox(f.geometry))
                        }
                    })
                    countryBboxes.current = bboxes
                })
                .catch(() => {})

            m.addLayer({
                id: 'countries-borders',
                type: 'line',
                source: 'countries',
                paint: { 'line-color': 'rgba(148,163,184,0.35)', 'line-width': 0.5 },
            })

            selectedCountries.forEach((code, i) => {
                const layerId = 'highlighted-country-' + code
                m.addLayer({
                    id: layerId,
                    type: 'fill',
                    source: 'countries',
                    paint: {
                        'fill-color': palette[i % palette.length],
                        'fill-opacity': 0.55,
                    },
                    filter: ['in', ['get', 'iso_a2'], ['literal', [code]]],
                })

                m.on('mouseenter', layerId, () => { m.getCanvas().style.cursor = 'pointer' })
                m.on('mouseleave', layerId, () => { m.getCanvas().style.cursor = '' })
                m.on('click', layerId, (e) => {
                    if (!e.features?.[0]) return
                    // A city dot sitting on top of this country should drive its own
                    // click handler (extra zoom), not re-trigger the country selection.
                    const cityHit = m.queryRenderedFeatures(e.point, {
                        layers: ['travel-path-points', 'travel-path-pulse'],
                    })
                    if (cityHit.length > 0) return
                    onSelectCountry(code)
                })
            })

            // All visited cities for all visited countries, shown at all times (not
            // just for the currently selected country).
            const cityFeatures: GeoJSON.Feature[] = selectedCountries.flatMap((code) =>
                (travelPlaces[code] ?? []).map((p) => ({
                    type: 'Feature' as const,
                    geometry: { type: 'Point' as const, coordinates: [p.lng, p.lat] },
                    properties: { name: p.name },
                })),
            )
            m.addSource('travel-path', {
                type: 'geojson',
                data: { type: 'FeatureCollection', features: cityFeatures },
            })

            m.addLayer({
                id: 'travel-path-pulse',
                type: 'circle',
                source: 'travel-path',
                paint: {
                    'circle-radius': 6,
                    'circle-color': '#34d399',
                    'circle-opacity': 0.35,
                    'circle-blur': 0.3,
                },
            })

            m.addLayer({
                id: 'travel-path-points',
                type: 'circle',
                source: 'travel-path',
                paint: {
                    'circle-radius': 5,
                    'circle-color': '#34d399',
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#05070d',
                },
            })

            m.addLayer({
                id: 'travel-path-labels',
                type: 'symbol',
                source: 'travel-path',
                layout: {
                    'text-field': ['get', 'name'],
                    'text-size': 11,
                    'text-offset': [0, 1.2],
                    'text-anchor': 'top',
                    'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
                },
                paint: {
                    'text-color': '#ffffff',
                    'text-halo-color': 'rgba(5,7,13,0.85)',
                    'text-halo-width': 1.4,
                },
            })

            const handleCityClick = (e: mapboxgl.MapLayerMouseEvent) => {
                const feature = e.features?.[0]
                if (!feature || feature.geometry.type !== 'Point') return
                const [lng, lat] = feature.geometry.coordinates as [number, number]
                setActiveCity({ lat, lng })
            }
            ;['travel-path-points', 'travel-path-pulse'].forEach((layerId) => {
                m.on('mouseenter', layerId, () => { m.getCanvas().style.cursor = 'pointer' })
                m.on('mouseleave', layerId, () => { m.getCanvas().style.cursor = '' })
                m.on('click', layerId, handleCityClick)
            })

            // Rings pulse outward and fade, independent of any travel order between cities.
            const pulseDurationMs = 1800
            let rafId: number
            const animatePulse = (timestamp: number) => {
                if (m.getLayer('travel-path-pulse')) {
                    const t = (timestamp % pulseDurationMs) / pulseDurationMs
                    m.setPaintProperty('travel-path-pulse', 'circle-radius', 6 + t * 16)
                    m.setPaintProperty('travel-path-pulse', 'circle-opacity', 0.35 * (1 - t))
                }
                rafId = requestAnimationFrame(animatePulse)
            }
            rafId = requestAnimationFrame(animatePulse)
            m.once('remove', () => cancelAnimationFrame(rafId))
        })

        return () => m.remove()
    }, [selectedCountries])

    // Handles map-polygon clicks, list-item clicks, and city-dot clicks (all drive
    // this same controlled state), so the camera stays in sync regardless of which
    // one triggered the selection. City dots are always on; this effect only moves
    // the camera. Switching to a new country (externally, via list or polygon click)
    // drops any city zoom left over from the previous country.
    useEffect(() => {
        const m = map.current
        if (!m) return

        const countryChanged = prevActiveCountry.current !== activeCountry
        prevActiveCountry.current = activeCountry
        const effectiveCity = countryChanged ? null : activeCity
        if (countryChanged && activeCity) setActiveCity(null)

        const applySelection = () => {
            if (effectiveCity) {
                m.flyTo({ center: [effectiveCity.lng, effectiveCity.lat], zoom: 11, duration: 1200 })
                return
            }
            if (!activeCountry) {
                m.flyTo({ center: [30, 20], zoom: 1.6, duration: 1000 })
                return
            }
            const bbox = countryBboxes.current[activeCountry]
            if (bbox) m.fitBounds(bbox, { padding: 60, duration: 1000 })
        }

        if (m.getSource('countries')) {
            applySelection()
        } else {
            m.once('load', applySelection)
        }
    }, [activeCountry, activeCity])

    return (
        <div className="relative">
            <div ref={mapContainer} className="w-full h-[70vh] md:h-[75vh] rounded-2xl overflow-hidden" />
            {(activeCountry || activeCity) && (
                <button
                    onClick={() => { onSelectCountry(null); setActiveCity(null) }}
                    className="chip absolute top-4 left-4 cursor-pointer"
                >
                    ← Back to world map
                </button>
            )}
        </div>
    )
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

const totalCities = countries.reduce((sum, c) => sum + (travelPlaces[c.code]?.length ?? 0), 0)

const VisitedCountries: NextPage = () => {
    const [activeCountry, setActiveCountry] = useState<string | null>(null)

    return (
        <div className="min-h-screen flex flex-col">
            <MetaData
                title="Travels · Alzobair Elkhalifa"
                description="Map of countries I've been to."
            />
            <NavBar />

            <section className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pt-16 md:pt-20 pb-6">
                <span className="section-title">Travels</span>
                <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                    Countries <span className="gradient-text">I&apos;ve visited</span>.
                </h1>
                <p className="mt-3 text-sm text-slate-400">
                    {countries.length} countries{totalCities > 0 ? ` · ${totalCities} cities mapped` : ''} — click a country to explore it
                </p>
            </section>

            <section className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-12 pb-16">
                <div className="surface p-3 md:p-4 grid md:grid-cols-[280px_1fr] gap-4">
                    <div className="order-2 md:order-1 flex flex-col gap-2 overflow-y-auto h-56 md:h-[75vh] pr-1">
                        {countries.map((c) => {
                            const cityCount = travelPlaces[c.code]?.length ?? 0
                            const isActive = activeCountry === c.code
                            return (
                                <button
                                    key={c.code}
                                    onClick={() => setActiveCountry(isActive ? null : c.code)}
                                    className={`w-full text-left px-4 py-3 rounded-xl border transition flex items-center justify-between gap-3 ${
                                        isActive
                                            ? 'border-emerald-400/50 bg-emerald-400/10'
                                            : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <img
                                            src={`https://flagcdn.com/${c.code.toLowerCase()}.svg`}
                                            alt=""
                                            className="w-6 h-auto rounded-sm border border-white/10"
                                        />
                                        <span className="text-sm font-medium text-white">{c.name}</span>
                                    </span>
                                    {cityCount > 0 && (
                                        <span className="text-xs text-slate-400 whitespace-nowrap">
                                            {cityCount} {cityCount === 1 ? 'city' : 'cities'}
                                        </span>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                    <div className="order-1 md:order-2">
                        <MapComponent
                            selectedCountries={countries.map((c) => c.code)}
                            activeCountry={activeCountry}
                            onSelectCountry={setActiveCountry}
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default VisitedCountries
