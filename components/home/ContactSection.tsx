"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  SCHOOL_PHONE,
  SCHOOL_EMAIL,
  SCHOOL_ADDRESS,
} from "@/lib/data/school";

const contactCards = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: SCHOOL_PHONE,
    href: `tel:${SCHOOL_PHONE}`,
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: SCHOOL_EMAIL,
    href: `mailto:${SCHOOL_EMAIL}`,
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Office Hours",
    value: "Mon – Sat: 8:00 AM – 6:00 PM",
    href: undefined,
    color: "bg-emerald-100 text-emerald-700",
  },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      className="py-16 lg:py-24 bg-slate-50"
      aria-labelledby="contact-section-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Get in Touch"
          heading="Contact VK Public School"
          description="We would love to hear from you. Reach out with any questions about admissions, academics, or school life."
          className="mb-12"
        />

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: contact info + map placeholder */}
          <div>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {contactCards.map((card) => (
                <div
                  key={card.label}
                  className="bg-white rounded-2xl p-4 border border-slate-100 text-center"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${card.color} rounded-xl mb-3`}>
                    {card.icon}
                  </div>
                  <div className="text-xs text-slate-500 mb-1 font-medium">{card.label}</div>
                  {card.href ? (
                    <a href={card.href} className="text-sm font-semibold text-slate-800 hover:text-blue-800 transition-colors break-all">
                      {card.value}
                    </a>
                  ) : (
                    <div className="text-sm font-semibold text-slate-800">{card.value}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Address card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 mb-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-0.5 font-medium">Address</div>
                  <p className="text-sm text-slate-700 leading-relaxed">{SCHOOL_ADDRESS}</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-blue-50 border-2 border-blue-100 border-dashed rounded-2xl h-52 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-12 h-12 text-blue-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-blue-400 text-sm font-medium">Map — Balapura, Sira Taluk</p>
                <p className="text-blue-300 text-xs mt-1">Tumakuru District, Karnataka</p>
              </div>
            </div>
          </div>

          {/* Right: contact form */}
          <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm">
            <h3 className="font-serif font-bold text-slate-900 text-2xl mb-6">
              Send Us a Message
            </h3>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-900 text-xl mb-2">Thank you!</h4>
                <p className="text-slate-600 text-sm">
                  Your message has been received. We will get back to you within 1-2 business days.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-6 text-blue-800 text-sm font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Your Name <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Email Address <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-colors"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="admissions">Admissions Enquiry</option>
                    <option value="academics">Academics</option>
                    <option value="fees">Fee Structure</option>
                    <option value="general">General Enquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Message <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
