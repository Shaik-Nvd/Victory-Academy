"use client"

import { Star, ExternalLink } from "lucide-react"
import Image from "next/image"
import { reviews, googleSearchUrl, type Review } from "@/lib/reviews"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={cn("h-4 w-4", i <= rating ? "text-amber-500 fill-amber-500" : "text-slate-300")} />
      ))}
    </div>
  )
}

function Initials({ name }: { name: string }) {
  const letters = name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join("")
  return (
    <div
      className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-amber-500 to-rose-500 text-white text-sm font-semibold shadow"
      aria-hidden="true"
    >
      {letters || "VA"}
    </div>
  )
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <div className="relative group h-full">
      {/* Glow */}
      <div
        className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 opacity-20 blur-md group-hover:opacity-40 transition-opacity"
        aria-hidden="true"
      />
      <Card className="relative h-full rounded-2xl border-slate-200 bg-white p-5">
        <div className="flex items-start gap-3">
          <Initials name={r.name} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-slate-800 truncate">{r.name}</p>
              <Stars rating={r.rating} />
            </div>
            <p className="text-xs text-slate-500">{r.time}</p>
            {r.course && (
              <div className="mt-2">
                <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                  {r.course}
                </Badge>
              </div>
            )}
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-700 leading-relaxed">{r.content}</p>
      </Card>
    </div>
  )
}

export default function ReviewsSection() {
  const avg =
    reviews.length > 0 ? Math.round((reviews.reduce((a, b) => a + b.rating, 0) / reviews.length) * 10) / 10 : 0

  return (
    <section id="reviews" className="relative py-16">
      {/* Decorative header background using the provided Google screenshot */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-white to-white" />
        <div className="absolute inset-x-0 top-0 h-48 overflow-hidden opacity-40">
          <Image
            src="/images/google-search.png"
            alt="Decorative Google background"
            width={1600}
            height={300}
            className="w-full h-full object-cover blur-sm"
            priority
          />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/60 px-3 py-1 text-amber-700">
            <Stars rating={5} />
            <span className="text-sm font-medium">Student Reviews</span>
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-800">What our learners say</h2>
          <p className="mt-2 text-slate-600">Real feedback from learners who upskilled with Victory Academy.</p>

          <div className="mt-4 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <Stars rating={Math.round(avg)} />
              <span className="text-slate-800 font-semibold">{avg.toFixed(1)}/5</span>
            </div>
            <span className="text-slate-400">•</span>
            <a
              href={googleSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber-700 hover:underline"
            >
              Read on Google
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <ReviewCard key={i + r.name} r={r} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex justify-center">
          <a
            href={googleSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-amber-600 px-5 py-2.5 text-white shadow hover:bg-amber-700 inline-flex items-center gap-2"
          >
            View more reviews on Google
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
