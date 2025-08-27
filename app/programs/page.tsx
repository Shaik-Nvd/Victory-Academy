"use client"

import type React from "react"
import { useMemo, useRef, useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { programs, type Program } from "@/lib/programs"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useActionState } from "react"
import { submitEnquiry, type EnquiryState } from "@/app/actions"

const WHATSAPP_NUMBER = "919380702836"

function groupByCategory(items: Program[]) {
  const groups: Record<string, Program[]> = {}
  for (const p of items) {
    if (!groups[p.category]) groups[p.category] = []
    groups[p.category].push(p)
  }
  return groups
}

// 3D tilt + glow wrapper (no images)
function TiltCard({
  children,
  gradient,
}: {
  children: React.ReactNode
  gradient: string // e.g., "from-violet-500 to-pink-500"
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  function handleMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateX = (py - 0.5) * -8
    const rotateY = (px - 0.5) * 8
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    el.style.setProperty("--mx", String(px))
    el.style.setProperty("--my", String(py))
  }

  function handleLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = "rotateX(0deg) rotateY(0deg)"
  }

  return (
    <div className="relative group h-full">
      {/* Glow halo behind card */}
      <div
        className={`pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br ${gradient} opacity-60 blur-xl group-hover:opacity-80 transition-opacity`}
        aria-hidden="true"
      />
      {/* Card body */}
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative h-full rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 transition-transform duration-150 will-change-transform"
        style={{ transformStyle: "preserve-3d" as React.CSSProperties }}
      >
        {/* Light sweep */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background:
              "radial-gradient(600px circle at calc(var(--mx,0.5)*100%) calc(var(--my,0.5)*100%), rgba(255,255,255,0.35), transparent 40%)",
          }}
          aria-hidden="true"
        />
        {children}
      </div>
    </div>
  )
}

function ProgramCard({
  program,
  onEnquire,
}: {
  program: Program
  onEnquire: (course: string) => void
}) {
  const Icon = program.icon
  // Build gradient: the dataset provides "from-... to-...", we ensure a full gradient string
  const gradientClasses = `bg-gradient-to-br ${program.color}`
  // Icon accent based on a neutral chip (avoids invalid class mappings)
  const iconAccent = "bg-slate-100 text-slate-700"

  return (
    <button
      type="button"
      onClick={() => onEnquire(program.title)}
      className="text-left h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500"
      aria-label={`Enquire about ${program.title}`}
    >
      <TiltCard gradient={program.color.includes("from-") ? program.color : "from-amber-400 to-rose-400"}>
        <div className="relative flex h-full min-h-[190px] flex-col p-5 md:p-6">
          {/* Floating soft shapes */}
          <div
            className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full opacity-30 blur-2xl animate-float"
            style={{ background: "conic-gradient(from 180deg, rgba(255,255,255,0.4), transparent 60%)" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-6 -left-6 h-20 w-20 rounded-full opacity-30 blur-2xl animate-float"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.35), transparent 60%)" }}
            aria-hidden="true"
          />

          <div className="flex items-start gap-4">
            <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconAccent}`}>
              <Icon className="h-5 w-5" />
            </span>
            <div className="flex flex-col">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-amber-700">
                <Sparkles className="h-4 w-4" />
                In-Demand
              </span>
              <h3 className="text-lg md:text-xl font-extrabold text-slate-800 leading-tight line-clamp-2">
                {program.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600 line-clamp-2">{program.description}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">Duration: {program.duration}</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">Level: {program.level}</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">{program.category}</span>
          </div>

          <div className="mt-auto flex items-center justify-between pt-3 text-sm text-slate-500">
            <span>Explore curriculum</span>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
          </div>
        </div>
      </TiltCard>
    </button>
  )
}

// Re-usable enquiry form (prefills course)
function EnquiryForm({ defaultCourse, onSuccess }: { defaultCourse?: string; onSuccess?: () => void }) {
  const [state, action, isPending] = useActionState<EnquiryState, FormData>(submitEnquiry, { success: false })
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [course, setCourse] = useState(defaultCourse || "")
  const [message, setMessage] = useState("")
  const [waUrl, setWaUrl] = useState<string | null>(null)

  useEffect(() => {
    setCourse(defaultCourse || "")
  }, [defaultCourse])

  useEffect(() => {
    if (state?.success) {
      const text = `New Enquiry - Victory Academy
Name: ${name}
Phone: ${phone}
Email: ${email}
Course: ${course}
Message: ${message || "(none)"}`
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
      setWaUrl(url)
      window.open(url, "_blank")
      onSuccess?.()
    }
  }, [state, name, phone, email, course, message, onSuccess])

  return (
    <form action={action} className="space-y-3">
      <div className="grid grid-cols-1 gap-3">
        <Input name="name" placeholder="Full Name" required value={name} onChange={(e) => setName(e.target.value)} />
        <Input
          name="phone"
          placeholder="Phone Number"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          name="course"
          required
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="">Select Course</option>
          {programs.map((p) => (
            <option key={p.title} value={p.title}>
              {p.title}
            </option>
          ))}
        </select>
        <Textarea
          name="message"
          rows={3}
          placeholder="Tell us what you’re looking for (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {state?.message && (
        <p className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>{state.message}</p>
      )}

      <Button type="submit" disabled={isPending} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
        {isPending ? "Submitting..." : "Submit Enquiry"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      {state?.success && waUrl && (
        <p className="text-xs text-slate-500">
          If WhatsApp didn&apos;t open automatically,{" "}
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-amber-700 underline">
            click here
          </a>
          .
        </p>
      )}
    </form>
  )
}

export default function ProgramsPage() {
  const searchParams = useSearchParams()
  const category = searchParams?.get("category") || undefined
  const items = category ? programs.filter((p) => p.category === category) : programs

  // Keep grouping but render graphical cards
  const groups = useMemo(() => (category ? { [category]: items } : groupByCategory(items)), [category, items])

  const [showEnquiry, setShowEnquiry] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>(undefined)

  function handleEnquire(course: string) {
    setSelectedCourse(course)
    setShowEnquiry(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Our Programs</h1>
            {category ? (
              <p className="text-slate-600 mt-1">Category: {category}</p>
            ) : (
              <p className="text-slate-600 mt-1">Browse all categories and courses below.</p>
            )}
          </div>
          <Link href="/" className="text-amber-700 border border-amber-600 px-4 py-2 rounded-md hover:bg-amber-50">
            Back to Home
          </Link>
        </div>

        <div className="space-y-12">
          {Object.entries(groups).map(([cat, list]) => (
            <section key={cat} aria-labelledby={`heading-${cat.replace(/\s+/g, "-")}`}>
              <h2
                id={`heading-${cat.replace(/\s+/g, "-")}`}
                className="text-xl md:text-2xl font-semibold text-slate-800 mb-5"
              >
                {cat}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {list.map((p) => (
                  <ProgramCard key={p.title} program={p} onEnquire={handleEnquire} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Enquiry side panel */}
      <Sheet open={showEnquiry} onOpenChange={setShowEnquiry}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Complete Your Enquiry</SheetTitle>
            <SheetDescription>Help us reach you. All fields marked required.</SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            <EnquiryForm defaultCourse={selectedCourse} onSuccess={() => setShowEnquiry(false)} />
            <p className="mt-3 text-xs text-slate-500">We respect your privacy. Your information is safe with us.</p>
          </div>
        </SheetContent>
      </Sheet>
    </main>
  )
}
