import Link from "next/link";
import Image from "next/image";
import {
  SCHOOL_NAME,
  SCHOOL_TAGLINE,
  SCHOOL_ADDRESS,
  SCHOOL_PHONE,
  SCHOOL_EMAIL,
} from "@/lib/data/school";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300" role="contentinfo">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: School info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="https://vkpublicschool.org/wp-content/uploads/2026/05/cropped-vkp-126x110.jpeg"
                alt="VK Public School logo"
                width={56}
                height={49}
                className="rounded object-contain"
              />
              <div>
                <div className="font-serif font-bold text-white text-base leading-tight">
                  {SCHOOL_NAME}
                </div>
                <div className="text-amber-400 text-xs font-semibold">
                  {SCHOOL_TAGLINE}
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Providing quality education to young learners from Nursery to
              Grade 5 in Tumakuru District, Karnataka.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Academics", href: "/academics" },
                { label: "Activities", href: "/activities" },
                { label: "Facilities", href: "/facilities" },
                { label: "Achievements", href: "/achievements" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors duration-150 flex items-center gap-1.5"
                  >
                    <svg
                      className="w-3 h-3 text-blue-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 6 10"
                      aria-hidden="true"
                    >
                      <path d="M1 1l4 4-4 4" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Academics */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Academics
            </h3>
            <ul className="space-y-2.5">
              {[
                "Nursery & Kindergarten",
                "Grade 1 & 2",
                "Grade 3 & 4",
                "Grade 5",
                "Sports & Games",
                "Arts & Culture",
                "Yoga & Wellness",
                "Admissions 2025-26",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/academics"
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors duration-150 flex items-center gap-1.5"
                  >
                    <svg
                      className="w-3 h-3 text-blue-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 6 10"
                      aria-hidden="true"
                    >
                      <path d="M1 1l4 4-4 4" />
                    </svg>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <svg
                  className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm text-slate-400 leading-relaxed">
                  {SCHOOL_ADDRESS}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${SCHOOL_PHONE}`}
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors duration-150"
                >
                  <svg
                    className="w-4 h-4 text-amber-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {SCHOOL_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SCHOOL_EMAIL}`}
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors duration-150"
                >
                  <svg
                    className="w-4 h-4 text-amber-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {SCHOOL_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <svg
                  className="w-4 h-4 text-amber-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Mon – Sat: 8:00 AM – 6:00 PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            &copy; {currentYear} {SCHOOL_NAME}. All rights reserved.
          </span>
          <span>
            Balapura, Bukkapattana Hobli, Sira Taluk, Tumakuru District,
            Karnataka – 572115
          </span>
        </div>
      </div>
    </footer>
  );
}
