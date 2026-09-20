import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  SCHOOL_NAME,
  SCHOOL_MISSION,
  SCHOOL_PHILOSOPHY,
  SCHOOL_VALUES,
  SCHOOL_FOUNDED,
  SCHOOL_GRADE_RANGE,
} from "@/lib/data/school";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SCHOOL_NAME} — our history, philosophy, vision, and mission to provide quality education in Tumakuru District, Karnataka.`,
};

export default function AboutPage() {
  return (
    <div>
      {/* Page hero */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">
              Our Story
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
              About VK Public School
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
              Nurturing young minds in the heart of Karnataka
            </p>
          </div>
        </div>
      </div>

      {/* About content */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="inline-block text-amber-500 font-semibold text-sm uppercase tracking-widest mb-2">
                Who We Are
              </span>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-5">
                A School Built on Values & Excellence
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  VK Public School was established in {SCHOOL_FOUNDED} with a
                  singular purpose: to provide quality, English-medium education
                  to the children of Balapura and the surrounding villages of
                  Bukkapattana Hobli, Sira Taluk, Tumakuru District.
                </p>
                <p>
                  We are a primary school offering education from Nursery
                  through Grade 5 ({SCHOOL_GRADE_RANGE}). Our school follows
                  the NCERT curriculum while incorporating a rich tapestry of
                  co-curricular activities that ensure every child receives a
                  well-rounded education.
                </p>
                <p>
                  From our very first year, we committed to building a school
                  where children feel safe, valued, and inspired to learn. We
                  are growing into a trusted educational institution serving
                  families across the region.
                </p>
                <p>
                  VK Public School is committed to becoming one of the leading
                  primary schools in Sira Taluk, built on the dedication of our
                  teachers, the support of our parents, and most importantly,
                  the hard work of our students.
                </p>
              </div>
            </div>
            <div className="space-y-5">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Established</h3>
                    <p className="text-slate-600 text-sm">Established {SCHOOL_FOUNDED} — Serving the community with quality education</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Students</h3>
                    <p className="text-slate-600 text-sm">Over 300 students enrolled across Nursery to Grade 5</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Affiliation</h3>
                    <p className="text-slate-600 text-sm">Recognised by the Government of Karnataka, Department of Public Instruction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section id="principal" className="py-14 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Leadership"
            heading="Principal's Message"
            className="mb-12"
          />
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 sm:p-10 border border-slate-100 shadow-sm">
            <svg className="w-10 h-10 text-amber-400 mb-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="space-y-4 text-slate-700 text-lg leading-relaxed italic">
              <p>
                &ldquo;At VK Public School, we believe that education is not just
                about preparing children for examinations — it is about
                preparing them for life. Every child who walks through our doors
                brings with them unique gifts, curiosity, and the limitless
                capacity to grow.
              </p>
              <p>
                Our role as educators is to create an environment where that
                curiosity is celebrated, where questions are welcomed, and where
                every child feels seen, heard, and valued. We combine academic
                rigour with compassion, structure with creativity, and ambition
                with kindness.
              </p>
              <p>
                I am incredibly proud of every student, teacher, and parent who
                is part of the VK Public School family. Together, we are
                building something truly special — a community of learners who
                will go on to lead, inspire, and serve.&rdquo;
              </p>
            </blockquote>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="font-semibold text-slate-900">The Principal</div>
              <div className="text-slate-500 text-sm">{SCHOOL_NAME}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Our Purpose"
            heading="Vision & Mission"
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-8 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-serif font-bold text-2xl mb-4">Our Vision</h3>
              <p className="text-blue-100 leading-relaxed">
                To be the most trusted and beloved primary school in Tumakuru
                District — a school where every child achieves their full
                potential and graduates as a confident, compassionate, and
                capable young person ready to contribute positively to society.
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-2xl p-8 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-serif font-bold text-2xl mb-4">Our Mission</h3>
              <p className="text-emerald-100 leading-relaxed">{SCHOOL_MISSION}</p>
            </div>
          </div>

          {/* Philosophy */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 text-center max-w-3xl mx-auto">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">Our Philosophy</span>
            <p className="mt-3 font-serif text-2xl text-slate-800 font-semibold leading-relaxed">
              &ldquo;{SCHOOL_PHILOSOPHY}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="What We Stand For"
            heading="Our Core Values"
            description="The six values that guide everything we do at VK Public School — in the classroom, on the playground, and in life."
            className="mb-12"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SCHOOL_VALUES.map((value, index) => {
              const colors = [
                "bg-blue-800",
                "bg-emerald-700",
                "bg-amber-600",
                "bg-purple-700",
                "bg-indigo-700",
                "bg-red-700",
              ];
              return (
                <div
                  key={value}
                  className="bg-white rounded-2xl p-5 border border-slate-100 text-center hover:shadow-md transition-shadow duration-300"
                >
                  <div
                    className={`w-10 h-10 ${colors[index]} rounded-xl mx-auto mb-3 flex items-center justify-center`}
                  >
                    <span className="text-white font-bold text-xs">
                      {value[0]}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-900 text-sm">
                    {value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
