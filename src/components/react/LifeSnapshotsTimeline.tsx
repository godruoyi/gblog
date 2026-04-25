import { useEffect, useMemo, useState } from 'react'
import fallbackData from '@/fallback.json'

interface GalleryItem {
    id: string
    title: string
    description: string
    image: string
    createdAt?: string
}

export default function LifeSnapshotsTimeline() {
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(fallbackData)

    const positions = useMemo(() => {
        if (galleryItems.length === 0) {
            return []
        }

        if (galleryItems.length === 1) {
            return [true]
        }

        const result: boolean[] = [true, false]

        for (let i = 2; i < galleryItems.length; i++) {
            const prevSide = result[i - 1]

            let consecutiveCount = 1
            for (let j = i - 2; j >= 0; j--) {
                if (result[j] === prevSide) {
                    consecutiveCount++
                } else {
                    break
                }
            }

            if (consecutiveCount >= 2) {
                result.push(!prevSide)
            } else {
                result.push(Math.random() < 0.5)
            }
        }

        return result
    }, [galleryItems.length])

    useEffect(() => {
        loadGalleryData()
    }, [])

    async function loadGalleryData() {
        console.log('🔄 Loading gallery data from API...')

        const response = await fetch('/api/gallery', {
            cache: 'no-cache'
        })

        if (!response.ok) {
            throw new Error(`API responded with ${response.status}`)
        }

        const data = await response.json()

        if (data && data.length > 0) {
            const existingIds = new Set(galleryItems.map(item => item.id))
            const newItems = data.filter((item: GalleryItem) => !existingIds.has(item.id))

            if (newItems.length > 0) {
                setGalleryItems(prevItems => [...prevItems, ...newItems])
            }
        }
    }

    function formatDate(dateString?: string) {
        if (!dateString) {
            return 'Recently'
        }

        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <>
            {/* Timeline */}
            <div className="max-w-5xl mx-auto">
                <div className="md:hidden relative">
                    <div className="absolute left-3.5 top-0 bottom-0 w-px bg-neutral-400 dark:bg-neutral-700"></div>

                    {galleryItems.map((item, _index) => (
                        <div key={item.id} className="relative mb-12 last:mb-0">
                            <div className="flex gap-x-3">
                                <div className="relative z-10">
                                    <div className="size-7 flex justify-center items-center rounded-full bg-white dark:bg-neutral-900">
                                        <div className="size-2 rounded-full bg-neutral-400 dark:bg-neutral-600"></div>
                                    </div>
                                </div>

                                <div className="grow">
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
                                        {formatDate(item.createdAt)}
                                    </p>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-auto object-cover rounded-lg shadow-md mb-2"
                                        loading="lazy"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement
                                            target.src = 'https://images.godruoyi.com/gblog/images/banners/e5afce41-0393-4a8d-bec0-9d08de12e958.avif'
                                        }}
                                    />
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="hidden md:block relative">
                    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-neutral-400 dark:bg-neutral-700"></div>

                    {galleryItems.map((item, index) => {
                        const isLeft = positions[index]

                        return (
                            <div key={item.id} className="relative mb-10 last:mb-0">
                                <div className="flex gap-x-8 relative">
                                    <div className="w-1/2 flex justify-end">
                                        {isLeft && (
                                            <div className="w-full text-right pr-2">
                                                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
                                                    {formatDate(item.createdAt)}
                                                </p>
                                                <p className="text-sm  text-neutral-600 dark:text-neutral-400 mb-2">
                                                    {item.description}
                                                </p>
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-auto object-cover rounded-lg shadow-lg ml-auto"
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement
                                                        target.src = 'https://images.godruoyi.com/gblog/images/banners/e5afce41-0393-4a8d-bec0-9d08de12e958.avif'
                                                    }}
                                                />

                                            </div>
                                        )}
                                    </div>

                                    <div className="absolute left-1/2 top-0 -translate-x-1/2 z-10">
                                        <div className="size-2 rounded-full bg-neutral-400 dark:bg-neutral-600"></div>
                                    </div>

                                    <div className="w-1/2">
                                        {!isLeft && (
                                            <div className="w-full pl-2">
                                                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
                                                    {formatDate(item.createdAt)}
                                                </p>
                                                <p className="text-sm  text-neutral-600 dark:text-neutral-400 mb-2">
                                                    {item.description}
                                                </p>
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-auto object-cover rounded-lg shadow-lg mb-2"
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement
                                                        target.src = 'https://images.godruoyi.com/gblog/images/banners/e5afce41-0393-4a8d-bec0-9d08de12e958.avif'
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
