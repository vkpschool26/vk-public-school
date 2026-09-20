import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Apply",
    description: "Fill out the online form or collect an application from the school office.",
  },
  {
    step: "02",
    title: "Interview",
    description: "A friendly interaction with the student and parents to understand their needs.",
  },
  {
    step: "03",
    title: "Enrolment",
    description: "Complete the admission process and welcome your child to the VK family.",
  },
];

export function AdmissionsCTA() {
  return (
    <section
      className="py-16 lg:py-24 bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 relative overflow-hidden"
      aria-labelledby="admissions-cta-heading"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            Admissions Open
          </span>
          <h2
            id="admissions-cta-heading"
            className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Join Us for 2025-26
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Secure your child&apos;s future with a quality education at VK
            Public School. Admissions are open for Nursery to Grade 5. Seats
            are limited — apply early to avoid disappointment.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={step.step} className="relative flex flex-col items-center text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className="hidden sm:block absolute top-6 left-[calc(50%+3rem)] w-full h-0.5 bg-white/20"
                  aria-hidden="true"
                />
              )}
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 z-10">
                {step.step}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-blue-200 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-blue-900"
          >
            Start Application
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/30 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
