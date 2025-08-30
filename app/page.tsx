"use client"

import type React from "react"
import GallerySection from "@/components/gallery"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Award,
  Users,
  BookOpen,
  Target,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Sparkles,
  Building,
  MessageCircle,
  ChevronDown,
  Clock4,
  Briefcase,
  Wallet,
  PhoneCall,
  BadgeCheck,
  BarChart3,
  Shield,
  Cloud,
  Workflow,
  Megaphone,
  Monitor,
  Code2,
  Coffee,
  Brain,
  Table,
  Calculator,
} from "lucide-react"
import { useActionState } from "react"
import { submitEnquiry, type EnquiryState } from "./actions"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { programs, type Program } from "@/lib/programs"
import ReviewsSection from "@/components/reviews"

const WHATSAPP_NUMBER = "919380702836"
const CONTACT_EMAIL = "info@victoryacademy.in"

function scrollToSection(sectionId: string) {
  const section = document.getElementById(sectionId)
  if (section) section.scrollIntoView({ behavior: "smooth" })
}

export default function VictoryAcademyPortfolio() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showEnquiryModal, setShowEnquiryModal] = useState(false)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Group programs for the dropdown (no images used here)
  const groupedPrograms = useMemo(() => {
    const groups: Record<string, Program[]> = {}
    for (const p of programs) {
      groups[p.category] = groups[p.category] || []
      groups[p.category].push(p)
    }
    return groups
  }, [])

  // Achievements
  const achievements = [
    { number: "200+", label: "Courses Offered", icon: BookOpen, color: "from-blue-500 to-cyan-500" },
    { number: "100%", label: "Job Assistance", icon: Target, color: "from-green-500 to-emerald-500" },
    { number: "Job", label: "Oriented Courses", icon: Award, color: "from-purple-500 to-pink-500" },
    { number: "6+", label: "Years Experience", icon: Users, color: "from-orange-500 to-red-500" },
  ]

  // Hot Courses
  type HotCourse = {
    name: string
    href: string
    icon: any
    gradient: string // tailwind gradient classes
    accent: string // tailwind bg/text classes for icon chip
  }

  const hotCourses: HotCourse[] = [
    {
      name: "AI & ML",
      href: "/programs?category=Data%20%26%20Analytics",
      icon: Brain,
      gradient: "from-violet-500 via-fuchsia-500 to-pink-500",
      accent: "bg-violet-100 text-violet-700",
    },
    {
      name: "Data Science",
      href: "/programs?category=Data%20%26%20Analytics",
      icon: Brain,
      gradient: "from-indigo-500 via-violet-500 to-fuchsia-500",
      accent: "bg-indigo-100 text-indigo-700",
    },
    {
      name: "Data Analytics",
      href: "/programs?category=Data%20%26%20Analytics",
      icon: BarChart3,
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      accent: "bg-emerald-100 text-emerald-700",
    },
    {
      name: "Cybersecurity",
      href: "/programs?category=IT%20%26%20Development",
      icon: Shield,
      gradient: "from-rose-500 via-red-500 to-orange-500",
      accent: "bg-rose-100 text-rose-700",
    },
    {
      name: "Cloud Computing",
      href: "/programs?category=Cloud%20%26%20DevOps",
      icon: Cloud,
      gradient: "from-sky-500 via-blue-500 to-indigo-500",
      accent: "bg-sky-100 text-sky-700",
    },
    {
      name: "DevOps",
      href: "/programs?category=Cloud%20%26%20DevOps",
      icon: Workflow,
      gradient: "from-teal-500 via-emerald-500 to-green-500",
      accent: "bg-teal-100 text-teal-700",
    },
    {
      name: "Digital Marketing (Tech focus)",
      href: "/programs?category=Digital%20Marketing%20Courses",
      icon: Megaphone,
      gradient: "from-green-500 via-lime-500 to-emerald-500",
      accent: "bg-green-100 text-green-700",
    },
    {
      name: "Basics of Computer",
      href: "/programs?category=IT%20Courses",
      icon: Monitor,
      gradient: "from-amber-500 via-orange-500 to-red-500",
      accent: "bg-amber-100 text-amber-700",
    },
    {
      name: "Python",
      href: "/programs?category=IT%20%26%20Development",
      icon: Code2,
      gradient: "from-cyan-500 via-teal-500 to-emerald-500",
      accent: "bg-cyan-100 text-cyan-700",
    },
    {
      name: "Java",
      href: "/programs?category=IT%20%26%20Development",
      icon: Coffee,
      gradient: "from-yellow-500 via-amber-500 to-orange-500",
      accent: "bg-yellow-100 text-yellow-700",
    },
    {
      name: "Microsoft Excel",
      href: "/programs?category=ACCOUNTING%20COURSES",
      icon: Table,
      gradient: "from-lime-500 via-green-500 to-emerald-500",
      accent: "bg-lime-100 text-lime-700",
    },
    {
      name: "Tally",
      href: "/programs?category=ACCOUNTING%20COURSES",
      icon: Calculator,
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      accent: "bg-orange-100 text-orange-700",
    },
  ]

  // Small interactive tilt wrapper (no images; purely CSS/JS effect)
  function TiltCard({
    children,
    gradient,
  }: {
    children: React.ReactNode
    gradient: string
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
        <div
          className={`pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br ${gradient} opacity-60 blur-xl group-hover:opacity-80 transition-opacity`}
          aria-hidden="true"
        />
        <div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="relative h-full rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 transition-transform duration-150 will-change-transform"
          style={{ transformStyle: "preserve-3d" as any }}
        >
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

  function HotCourseCard({ course }: { course: HotCourse }) {
    const Icon = course.icon
    return (
      <Link
        href={course.href}
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 rounded-2xl"
      >
        <TiltCard gradient={course.gradient}>
          <div className="relative flex h-full min-h-[180px] flex-col p-5 md:p-6">
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

            <div className="flex items-center gap-4">
              <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${course.accent}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex flex-col">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-amber-700">
                  <Sparkles className="h-4 w-4" />
                  In-Demand
                </span>
                <h3 className="text-lg md:text-xl font-extrabold text-slate-800 leading-tight line-clamp-2">
                  {course.name}
                </h3>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
              <span>Explore curriculum</span>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
            </div>
          </div>
        </TiltCard>
      </Link>
    )
  }

  // Enquiry form
  function EnquiryForm({ onSuccess }: { onSuccess?: () => void }) {
    const [state, action, isPending] = useActionState<EnquiryState, FormData>(submitEnquiry, { success: false })
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [course, setCourse] = useState("")
    const [message, setMessage] = useState("")
    const [waUrl, setWaUrl] = useState<string | null>(null)

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

  function FloatingButtons() {
    const waText = encodeURIComponent("Hi! I’m interested in a free demo at Victory Academy.")
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`
    return (
      <>
        {/* WhatsApp pill - bottom left */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed left-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors px-4 py-2"
          aria-label="WhatsApp us (Free Demo)"
        >
          <MessageCircle className="h-5 w-5 text-white" />
          <span className="hidden sm:inline">WhatsApp us (Free Demo)</span>
        </a>

        {/* Phone - bottom right (upper) */}
        <a
          href="tel:+919380702836"
          className="fixed right-4 bottom-24 z-50 grid place-items-center h-14 w-14 rounded-full bg-white text-amber-700 ring-2 ring-amber-600 shadow-lg hover:scale-105 transition-transform"
          aria-label="Call us"
        >
          <PhoneCall className="h-6 w-6" />
          <span className="sr-only">{"Call us"}</span>
        </a>

        {/* Email - bottom right (lower) */}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="fixed right-4 bottom-4 z-50 grid place-items-center h-14 w-14 rounded-full bg-white text-blue-700 ring-2 ring-blue-600 shadow-lg hover:scale-105 transition-transform"
          aria-label="Email us"
        >
          <Mail className="h-6 w-6" />
          <span className="sr-only">{"Email us"}</span>
        </a>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top info bar */}
      <div className="w-full bg-slate-900 text-white text-sm">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-amber-400" />
              <a href="tel:+919380702836" className="hover:underline">
                +91 9380702836
              </a>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Clock4 className="h-4 w-4 text-amber-400" />
              <span>Mon - Saturday: 10:00 AM - 9:00 PM</span>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>200+ Courses • Job Assistance • Job Oriented Courses • 6+ Years • ISO Certified</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              aria-label="Facebook"
              href="https://m.facebook.com/61567301797208/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded hover:bg-white/10"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a aria-label="Twitter" href="#" className="p-1 rounded hover:bg-white/10">
              <Twitter className="h-4 w-4" />
            </a>
            <a
              aria-label="Instagram"
              href="https://www.instagram.com/azeemanaaz04?igsh=MTYxNTBiNnFwcG05Mg=="
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded hover:bg-white/10"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a aria-label="LinkedIn" href="#" className="p-1 rounded hover:bg-white/10">
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              aria-label="YouTube"
              href="https://m.youtube.com/@victoryacademy_edu1"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded hover:bg-white/10"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-white/80 backdrop-blur"}`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/victory-logo.png"
                alt="Victory Academy Logo"
                width={44}
                height={44}
                className="hover:scale-110 transition-transform duration-300"
              />
              <span className="text-lg font-bold text-slate-800">Victory Academy</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection("hero")} className="hover:text-amber-600 text-slate-700">
                Home
              </button>

              {/* Job Oriented Courses Dropdown -> navigates to /programs */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="inline-flex items-center gap-1 hover:text-amber-600 text-slate-700">
                    Job Oriented Courses
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[780px] p-3">
                  <DropdownMenuLabel>Browse by Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.entries(groupedPrograms).map(([cat, items]) => (
                      <div key={cat} className="min-w-0">
                        <DropdownMenuGroup>
                          <div className="text-xs font-semibold text-slate-500 mb-1">{cat}</div>
                          {items.slice(0, 3).map((p) => (
                            <DropdownMenuItem
                              key={p.title}
                              onClick={() => router.push(`/programs?category=${encodeURIComponent(cat)}`)}
                            >
                              <span className="truncate">{p.title}</span>
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuItem
                            className="text-amber-600"
                            onClick={() => router.push(`/programs?category=${encodeURIComponent(cat)}`)}
                          >
                            View all {cat}
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </div>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/programs" className="hover:text-amber-600 text-slate-700">
                Programs
              </Link>
              <button onClick={() => scrollToSection("achievements")} className="hover:text-amber-600 text-slate-700">
                Highlights
              </button>
              <button onClick={() => scrollToSection("gallery")} className="hover:text-amber-600 text-slate-700">
                Gallery
              </button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-amber-600 text-slate-700">
                Contact
              </button>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button onClick={() => setShowEnquiryModal(true)} className="bg-amber-600 hover:bg-amber-700 text-white">
                Enquire Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="hero"
        ref={heroRef}
        className="relative py-16 md:py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden"
      >
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center relative z-10">
          <div className="relative">
            {/* Scoped watermark behind the headline (left column only) */}
            <div
              className="pointer-events-none absolute inset-0 flex items-start justify-center pt-4 md:pt-6"
              aria-hidden="true"
            >
              <div
                className="w-full max-w-[620px] aspect-square opacity-15 mix-blend-multiply [mask-image:radial-gradient(circle at 50% 35%,black,transparent_70%)]"
                style={{
                  backgroundImage:
                    'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%28Square%29-bEGE14KMWTA92U8jWpleyn4ai0vRrD.png")',
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "top center",
                  filter: "grayscale(100%)",
                }}
              />
            </div>

            {/* Keep the original text/content above the watermark */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-amber-600">Job Oriented</Badge>
                <Badge variant="outline" className="border-amber-600 text-amber-700">
                  Job Assistance
                </Badge>
                <Badge variant="secondary" className="bg-white text-slate-700">
                  200+ Courses
                </Badge>
                <Badge variant="secondary" className="bg-white text-slate-700">
                  6+ Years
                </Badge>
                <Badge variant="secondary" className="bg-white text-slate-700">
                  ISO Certified
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-4">Skill up with Victory Academy</h1>
              <p className="text-lg md:text-xl text-slate-600 mb-6 max-w-xl">
                Learn in-demand skills with hands-on, job-oriented courses. Get 100% job assistance and start your
                career today.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/programs"
                  className="inline-flex items-center px-4 py-2 rounded-md bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Explore Programs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Button
                  variant="outline"
                  className="border-amber-600 text-amber-700 bg-transparent"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>

          <Card className="shadow-2xl border-amber-100">
            <CardHeader>
              <CardTitle>Enquire Now</CardTitle>
              <CardDescription>Fill in your details and we’ll call you back shortly.</CardDescription>
            </CardHeader>
            <CardContent>
              <EnquiryForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Hot Courses */}
      <section id="hot-courses" className="py-14 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">In Demand Courses</h2>
            <p className="mt-2 text-slate-600">
              Interactive picks to start fast. No images &#45; just bold names and icons.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {hotCourses.map((c) => (
              <HotCourseCard key={c.name} course={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Career Skills banner */}
      <section id="career-skills" className="py-10 bg-gradient-to-r from-red-700 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Career Skills For The Future</h2>
          <p className="mt-2 text-red-100 text-lg md:text-xl">Knowledge To Change The World</p>
        </div>
      </section>

      {/* Key Stats band */}
      <section aria-label="Key stats" className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { number: "50,000+", label: "Students Trained", icon: Users },
              { number: "1000+", label: "College/Corporate Trainings", icon: Briefcase },
              { number: "80+", label: "Certified Instructors", icon: Award },
            ].map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <div className="rounded-full bg-amber-100 p-3 text-amber-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800">{s.number}</div>
                    <div className="text-slate-600">{s.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <GallerySection />
      <ReviewsSection />

      {/* Trust and Credentials */}
      <section id="trust" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ISO Certified */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="rounded-full bg-green-100 text-green-700 p-2">
                  <BadgeCheck className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-semibold text-slate-800">ISO Certified</h3>
              </div>
              <p className="text-slate-600 text-sm">Quality processes certified for consistent training excellence.</p>
            </div>

            {/* Industry Endorsed Course Curriculum */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="rounded-full bg-amber-100 text-amber-700 p-2">
                  <BookOpen className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-semibold text-slate-800">Industry Endorsed Course Curriculum</h3>
              </div>
              <p className="text-slate-600 text-sm">Curriculum reviewed with industry experts for job readiness.</p>
            </div>

            {/* 50,000+ Students Trained */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="rounded-full bg-blue-100 text-blue-700 p-2">
                  <Users className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-semibold text-slate-800">50,000+ Students Trained</h3>
              </div>
              <p className="text-slate-600 text-sm">A strong alumni network across colleges and corporates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Removed: Our Programs section from the home page (moved to /programs) */}

      {/* Achievements */}
      <section id="achievements" className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-amber-100 max-w-2xl mx-auto">Job oriented training with 100% job assistance.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((a, i) => (
              <div key={i} className="text-center group">
                <div className="bg-white/10 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                  <a.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl font-bold mb-1">{a.number}</div>
                <div className="text-amber-100">{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Path Features */}
      <section id="career-path" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-slate-800 mb-12">
            Your Career Path Begins Here
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                title: "Affordability",
                desc: "Meet the best trainers with years of experience and get trained at affordable fees.",
                icon: Wallet,
                bg: "bg-emerald-50",
              },
              {
                title: "Accreditation",
                desc: "Get globally recognised awards and certifications after completing your courses.",
                icon: Award,
                bg: "bg-emerald-50/60",
              },
              {
                title: "School Programs",
                desc: "Get real‑time trainings near your desired location and learn with LIVE projects.",
                icon: Building,
                bg: "bg-emerald-50",
              },
              {
                title: "Track Record",
                desc: "Our track record shows every student gets internships and placements.",
                icon: Users,
                bg: "bg-emerald-50/60",
              },
            ].map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} className={`rounded-2xl border border-slate-200 p-6 ${f.bg}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-full bg-amber-100 p-2 text-amber-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">{f.title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Ready to begin your journey? Contact us to learn more about our programs and how we can help.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="bg-amber-600 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <p className="text-slate-300">
                  Victory Academy, White Stone Building
                  <br />
                  #669/1 1st Stage, 2nd Block, HBR Layout
                  <br />
                  Near Fine Fair, Next to Shree Raj Lassi Shop
                  <br />
                  Bengaluru, Karnataka 560043
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-amber-600 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <p className="text-slate-300">
                  +91 9380702836
                  <br />
                  Mon - Saturday: 10:00 AM - 9:00 PM
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-amber-600 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <p className="text-slate-300">
                  info@victoryacademy.in
                  <br />
                  admissions@victoryacademy.in
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://m.facebook.com/61567301797208/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 p-3 rounded-full hover:bg-amber-600 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-white" />
                </a>
                <a href="#" className="bg-slate-800 p-3 rounded-full hover:bg-amber-600 transition-colors">
                  <Twitter className="h-5 w-5 text-white" />
                </a>
                <a
                  href="https://www.instagram.com/azeemanaaz04?igsh=MTYxNTBiNnFwcG05Mg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 p-3 rounded-full hover:bg-amber-600 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-white" />
                </a>
                <a href="#" className="bg-slate-800 p-3 rounded-full hover:bg-amber-600 transition-colors">
                  <Linkedin className="h-5 w-5 text-white" />
                </a>
                <a
                  href="https://m.youtube.com/@victoryacademy_edu1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 p-3 rounded-full hover:bg-amber-600 transition-colors"
                >
                  <Youtube className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Enquiry</CardTitle>
                <CardDescription className="text-slate-300">We’ll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <EnquiryForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/images/victory-logo.png" alt="Victory Academy Logo" width={36} height={36} />
            <div>
              <div className="text-lg font-bold">Victory Academy</div>
              <div className="text-xs text-slate-400">The New Level of Evolution</div>
            </div>
          </div>
          <div className="text-slate-400 text-sm">© 2024 Victory Academy. All rights reserved.</div>
        </div>
      </footer>

      {/* Enquiry Side Panel */}
      <Sheet open={showEnquiryModal} onOpenChange={setShowEnquiryModal}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Complete Your Enquiry</SheetTitle>
            <SheetDescription>Help us reach you. All fields marked required.</SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            <EnquiryForm onSuccess={() => setShowEnquiryModal(false)} />
            <p className="mt-3 text-xs text-slate-500">We respect your privacy. Your information is safe with us.</p>
          </div>
        </SheetContent>
      </Sheet>
      <FloatingButtons />
    </div>
  )
}
