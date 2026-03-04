"use client"

import { useState } from "react"
import { Mail, MapPin, Clock, Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to an API
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-4">
              Get in Touch
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Contact Us
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Have a question, feedback, or just want to chat about dice? We would love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact info cards */}
            <div className="flex flex-col gap-4">
              <div className="p-6 bg-card rounded-xl border border-border">
                <Mail className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-1">Email</h3>
                <p className="text-sm text-muted-foreground">support@arcanedice.co</p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <Clock className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-1">Response Time</h3>
                <p className="text-sm text-muted-foreground">Within 24 hours on business days</p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <MapPin className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-1">Location</h3>
                <p className="text-sm text-muted-foreground">Portland, Oregon, USA</p>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2 bg-card rounded-xl border border-border p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h2>
                  <p className="text-muted-foreground max-w-md">
                    Thank you for reaching out. We will get back to you within 24 hours.
                  </p>
                  <Button
                    className="mt-6 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: "", email: "", subject: "", message: "" })
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                      placeholder="Tell us what you need help with..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 self-start"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
