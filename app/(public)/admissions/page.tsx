"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  SCHOOL_PHONE,
  SCHOOL_EMAIL,
  SCHOOL_GRADE_RANGE,
} from "@/lib/data/school";

const steps = [
  {
    step: "01",
    title: "Download / Collect Application",
    description:
      "Download the application form from our website or collect a physical copy from the school office during working hours (Mon–Sat, 8 AM – 6 PM).",
  },
  {
    step: "02",
    title: "Fill & Submit Form",
    description:
      "Complete the application form with all required details and submit it along with the necessary documents to the school office.",
  },
  {
    step: "03",
    title: "Interaction Session",
    description:
      "A friendly, informal interaction session is scheduled with the student and parents. This is an opportunity for us to understand the child's needs.",
  },
  {
    step: "04",
    title: "Admission Confirmation",
    description:
      "Upon successful completion of the process, admission is confirmed. Parents will receive a welcome kit and all necessary information.",
  },
];

const gradeEligibility = [
  { grade: "Nursery", age: "3 – 4 years as of 1st June" },
  { grade: "LKG (Lower Kindergarten)", age: "4 – 5 years as of 1st June" },
  { grade: "UKG (Upper Kindergarten)", age: "5 – 6 years as of 1st June" },
  { grade: "Grade 1", age: "6 years as of 1st June" },
  { grade: "Grade 2 to Grade 5", age: "Lateral admissions subject to seat availability" },
];

const documents = [
  "Birth certificate (original + photocopy)",
  "Passport-size photographs of the child (4 copies)",
  "Aadhaar card of child and parents",
  "Transfer Certificate (for lateral admissions)",
  "Previous school report card (for lateral admissions)",
  "Caste certificate (if applicable, for category reservations)",
  "Address proof (Ration card / Electricity bill / Aadhaar)",
];

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    childName: "",
    dob: "",
    grade: "",
    parentName: "",
    phone: "",
    email: "",
    address: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
          <span className="inline-block bg-amber-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            Admissions Open 2025-26
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Join the VK Family
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Enrol your child for {SCHOOL_GRADE_RANGE} at VK Public School.
            Seats are limited — apply early.
          </p>
        </div>
      </div>

      {/* Process */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="How to Apply"
            heading="Admission Process"
            description="Our admission process is simple, transparent, and designed to be stress-free for both parents and children."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow duration-300 h-full">
                  <div className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility & Docs */}
      <section className="py-14 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <SectionHeading
                eyebrow="Age Criteria"
                heading="Grade Eligibility"
                align="left"
                className="mb-6"
              />
              <div className="space-y-3">
                {gradeEligibility.map((item) => (
                  <div key={item.grade} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100">
                    <svg className="w-5 h-5 text-blue-800 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{item.grade}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{item.age}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Required Documents"
                heading="Documents Needed"
                align="left"
                className="mb-6"
              />
              <div className="bg-white rounded-2xl p-6 border border-slate-100">
                <ul className="space-y-3">
                  {documents.map((doc) => (
                    <li key={doc} className="flex items-start gap-3 text-sm text-slate-700">
                      <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fee note */}
      <section className="py-10 bg-amber-50 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Fee Structure</h3>
              <p className="text-slate-600 text-sm mt-1">
                Detailed fee information is provided during the admission process. For queries about fees, please contact us at{" "}
                <a href={`tel:${SCHOOL_PHONE}`} className="text-blue-800 font-medium hover:underline">{SCHOOL_PHONE}</a>{" "}
                or{" "}
                <a href={`mailto:${SCHOOL_EMAIL}`} className="text-blue-800 font-medium hover:underline">{SCHOOL_EMAIL}</a>.
                Our fees are competitive and we offer provisions for deserving students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Online Enquiry"
            heading="Submit an Enquiry"
            description="Fill in the form below and our admissions team will contact you within 1-2 working days."
            className="mb-10"
          />

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 text-xl mb-2">Enquiry Submitted!</h3>
              <p className="text-slate-600 text-sm">
                Thank you for your interest in VK Public School. We will contact you at the provided phone number within 1-2 working days.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ childName: "", dob: "", grade: "", parentName: "", phone: "", email: "", address: "", message: "" }); }}
                className="mt-6 text-blue-800 text-sm font-semibold hover:underline"
              >
                Submit another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="childName" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Child&apos;s Full Name <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input id="childName" name="childName" type="text" required value={formData.childName} onChange={handleChange} placeholder="Child's name" className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-colors" />
                </div>
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Date of Birth <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input id="dob" name="dob" type="date" required value={formData.dob} onChange={handleChange} className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-colors" />
                </div>
              </div>
              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Applying for Grade <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <select id="grade" name="grade" required value={formData.grade} onChange={handleChange} className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-colors">
                  <option value="">Select grade</option>
                  {["Nursery", "LKG", "UKG", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"].map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="parentName" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Parent / Guardian Name <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input id="parentName" name="parentName" type="text" required value={formData.parentName} onChange={handleChange} placeholder="Parent's name" className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-colors" />
                </div>
                <div>
                  <label htmlFor="adm-phone" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Phone Number <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input id="adm-phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="10-digit mobile number" className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-colors" />
                </div>
              </div>
              <div>
                <label htmlFor="adm-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input id="adm-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Optional" className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-colors" />
              </div>
              <div>
                <label htmlFor="adm-address" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Residential Address
                </label>
                <input id="adm-address" name="address" type="text" value={formData.address} onChange={handleChange} placeholder="Village / Town" className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-colors" />
              </div>
              <div>
                <label htmlFor="adm-message" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Additional Information
                </label>
                <textarea id="adm-message" name="message" rows={3} value={formData.message} onChange={handleChange} placeholder="Any additional information or questions..." className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-colors resize-none" />
              </div>
              <button type="submit" className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3.5 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2">
                Submit Enquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
