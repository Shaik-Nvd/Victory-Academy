"use server"

export interface EnquiryState {
  success: boolean
  message?: string
  errors?: Record<string, string>
}

export async function submitEnquiry(prevState: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Basic validation
  const name = String(formData.get("name") || "").trim()
  const phone = String(formData.get("phone") || "").trim()
  const email = String(formData.get("email") || "").trim()
  const course = String(formData.get("course") || "").trim()
  const message = String(formData.get("message") || "").trim()

  const errors: Record<string, string> = {}
  if (!name) errors.name = "Name is required"
  if (!phone) errors.phone = "Phone is required"
  if (!email) errors.email = "Email is required"
  if (!course) errors.course = "Please select a course"

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please fix the errors", errors }
  }

  // Simulate latency
  await new Promise((r) => setTimeout(r, 700))

  // Here you could forward to your CRM, Google Sheet, or database.
  console.log("New enquiry:", { name, phone, email, course, message })

  return { success: true, message: "Thanks! We will contact you shortly." }
}
