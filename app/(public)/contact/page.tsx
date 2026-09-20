"use client";

import { useState } from "react";
import {
  SCHOOL_NAME,
  SCHOOL_PHONE,
  SCHOOL_EMAIL,
  SCHOOL_ADDRESS,
} from "@/lib/data/school";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
    <div>
      <div className="bg-gradient-to-br from-blue-900 to-indigo-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Reach Out
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            We&apos;re here to answer your questions and help your child begin
            their journey at {SCHOOL_NAME}
          </p>
        </div>
      </div>

      {/* Contact details */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {[
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
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                label: "Address",
                value: "Balapura, Bukkapattana Hobli, Sira Taluk, Tumakuru",
                href: "https://maps.app.goo.gl/7uHAnsa5xwZ6SkKP8",
                color: "bg-red-100 text-red-600",
              },
            ].map((card) => (
              <div key={card.label} className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-sm transition-shadow duration-300 text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${card.color} rounded-xl mb-3`}>
                  {card.icon}
                </div>
                <div className="text-xs text-slate-500 font-medium mb-1">{card.label}</div>
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

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map + address */}
            <div>
              <h2 className="font-serif font-bold text-slate-900 text-2xl mb-5">
                Find Us
              </h2>
              {/* Map — opens Google Maps */}
              <a
                href="https://maps.app.goo.gl/7uHAnsa5xwZ6SkKP8"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-blue-50 border-2 border-blue-100 hover:border-blue-300 border-dashed rounded-2xl h-64 flex items-center justify-center mb-5 transition-colors duration-200 block"
                aria-label="Get directions to VK Public School on Google Maps"
              >
                <div className="text-center px-4">
                  <svg className="w-12 h-12 text-blue-300 group-hover:text-blue-500 mx-auto mb-3 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-blue-500 font-semibold">VK Public School</p>
                  <p className="text-blue-400 text-sm mt-1">Balapura, Bukkapattana Hobli</p>
                  <p className="text-blue-400 text-sm">Sira Taluk, Tumakuru – 572115</p>
                  <span className="inline-flex items-center gap-1.5 mt-3 text-blue-600 group-hover:text-blue-800 text-sm font-semibold transition-colors duration-200">
                    Get Directions
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </div>
              </a>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-2">Full Address</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{SCHOOL_ADDRESS}</p>
              </div>

            </div>

            {/* Contact form */}
            <div>
              <h2 className="font-serif font-bold text-slate-900 text-2xl mb-5">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
                  <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 text-xl mb-2">Message Sent!</h3>
                  <p className="text-slate-600 text-sm">
                    Thank you for reaching out. We will respond within 1-2 business days.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="mt-5 text-blue-800 text-sm font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="ct-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Name <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input id="ct-name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your name" className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="ct-phone" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Phone
                      </label>
                      <input id="ct-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Mobile number" className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ct-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Email <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input id="ct-email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="ct-subject" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Subject
                    </label>
                    <select id="ct-subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-colors">
                      <option value="">Select subject</option>
                      <option value="admissions">Admissions Enquiry</option>
                      <option value="academics">Academics</option>
                      <option value="fees">Fee Structure</option>
                      <option value="transport">Transport</option>
                      <option value="general">General Enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="ct-message" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Message <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <textarea id="ct-message" name="message" rows={5} required value={formData.message} onChange={handleChange} placeholder="How can we help you?" className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-colors resize-none" />
                  </div>
                  <button type="submit" className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3.5 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
