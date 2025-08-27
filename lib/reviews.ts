export type Review = {
  name: string
  rating: 1 | 2 | 3 | 4 | 5
  time: string // e.g., "2 weeks ago"
  content: string
  course?: string
}

export const googleSearchUrl =
  "https://www.google.com/search?sca_esv=f5680b47e71e92a2&rlz=1C1ONGR_enIN1085IN1134&sxsrf=AE3TifNpylkjMgyyLQFiu4FQt1ib0FP1iw:1754909856388&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E3K6YVQj3qzokbTJGp4fFp5Eby5hPFV0hxXdU8i3N94YzhMYK35OXmSymP2b2tuCAPTxbn-eKAQJOVJQgYeyaM28OU2L&q=Victory+Academy+Reviews&sa=X&ved=2ahUKEwi0hunUzIKPAxWaxzgGHfGYEmIQ0bkNegQIHhAD&biw=1422&bih=664&dpr=1.35"

// Replace these with your real Google review snippets.
// Tip: keep them short (1–3 sentences) for best layout.
export const reviews: Review[] = [
  {
    name: "Priya S.",
    rating: 5,
    time: "2 weeks ago",
    content:
      "Excellent trainers and very practical sessions. The placement support team guided me till I got an interview.",
    course: "Data Analytics",
  },
  {
    name: "Arjun K.",
    rating: 5,
    time: "1 month ago",
    content: "Hands‑on labs were the highlight. The mentor patiently explained complex topics with real projects.",
    course: "Full Stack Java",
  },
  {
    name: "Sneha R.",
    rating: 4,
    time: "3 weeks ago",
    content: "Great environment to learn. The curriculum is current and job‑oriented.",
    course: "Digital Marketing",
  },
  {
    name: "Rahul M.",
    rating: 5,
    time: "5 days ago",
    content: "Very supportive faculty. I built a portfolio project that helped me crack technical rounds.",
    course: "Python",
  },
  {
    name: "Nisha P.",
    rating: 5,
    time: "2 months ago",
    content: "Clean explanations and weekly doubt‑clearing sessions. Strongly recommend!",
    course: "Cloud Computing",
  },
  {
    name: "Vikram D.",
    rating: 5,
    time: "4 weeks ago",
    content: "Structured, practical and on time. Loved the mock interviews.",
    course: "DevOps",
  },
  {
    name: "Kiran L.",
    rating: 4,
    time: "1 month ago",
    content: "Good value for money. The team helped tailor the course to my schedule.",
    course: "MS Office",
  },
  {
    name: "Aishwarya N.",
    rating: 5,
    time: "3 days ago",
    content: "From zero to confident in a few weeks. Thank you Victory Academy!",
    course: "Basics of Computer",
  },
]
