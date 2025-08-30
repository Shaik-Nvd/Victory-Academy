"use client"

import { useState, useEffect } from "react"
import {
  paperAddImages,
  officeCelebration2024Images,
  ktccBestInstituteImages,
  karnatakaRatnaDrPuneethaRajkumarSavinenapuAwardImages,
  excellenceAcademyAwardImages,
  type GalleryImage,
} from "@/lib/gallery"
import { X, Maximize2 } from "lucide-react"

const galleries = [
  { id: "paper-add", title: "Paper add", images: paperAddImages },
  { id: "office-2024", title: "Office celebration 2024", images: officeCelebration2024Images },
  { id: "ktcc-best-institute-award", title: "KTCC Best Institute award", images: ktccBestInstituteImages },
  {
    id: "karnataka-ratna-dr-puneetha-rajkumar-savinenapu-award",
    title: "Karnataka Ratna Dr Puneetha Rajkumar Savinenapu Award",
    images: karnatakaRatnaDrPuneethaRajkumarSavinenapuAwardImages,
  },
  {
    id: "excellence-academy-award",
    title: "Excellence Academy Award",
    images: excellenceAcademyAwardImages,
  },
]

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState(0)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const currentImages: GalleryImage[] = galleries[activeTab].images

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveIndex(null)
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === null ? null : (i + 1) % currentImages.length))
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i === null ? null : (i - 1 + currentImages.length) % currentImages.length))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [currentImages.length])

  useEffect(() => {
    setActiveIndex(null)
  }, [activeTab])

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/60 px-3 py-1 text-amber-700">
            <Maximize2 className="h-4 w-4" />
            <span className="text-sm font-medium">Gallery</span>
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-800">Media & Celebrations</h2>
          <p className="mt-2 text-slate-600">Browse our press clippings and office celebrations.</p>

          <div className="mt-5 inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
            {galleries.map((g, i) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${i === activeTab ? "bg-white text-amber-700 border border-amber-200" : "text-slate-600 hover:text-slate-800"}`}
                aria-pressed={i === activeTab}
              >
                {g.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentImages.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
              aria-label={`Open image ${i + 1} in ${galleries[activeTab].title}`}
            >
              <div className="relative w-full aspect-[4/5]">
                <img
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <p className="text-white/90 text-xs line-clamp-2">{img.alt}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label="Close"
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation()
              setActiveIndex(null)
            }}
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative max-w-5xl w-full">
            <div className="relative w-full aspect-[4/5] md:aspect-[3/2] rounded-lg overflow-hidden">
              <img
                src={currentImages[activeIndex].src || "/placeholder.svg"}
                alt={currentImages[activeIndex].alt}
                className="absolute inset-0 h-full w-full object-contain"
                loading="eager"
                decoding="async"
              />
            </div>
            <p className="mt-3 text-center text-slate-200 text-sm">{currentImages[activeIndex].alt}</p>
          </div>
        </div>
      )}
    </section>
  )
}
