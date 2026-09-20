"use client";

import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS, SCHOOL_PHONE, SCHOOL_EMAIL } from "@/lib/data/school";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-blue-800">
          <div className="flex items-center gap-3">
            <Image
              src="https://vkpublicschool.org/wp-content/uploads/2026/05/cropped-vkp-126x110.jpeg"
              alt="VK Public School logo"
              width={36}
              height={31}
              className="rounded object-contain"
            />
            <span className="font-serif font-bold text-white text-base">
              VK Public School
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-white/80 hover:text-white p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-5" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <div>
                    <span className="block px-3 py-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      {item.label}
                    </span>
                    <ul className="ml-3 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="block px-3 py-2 text-slate-700 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-150 font-medium"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block px-3 py-2.5 text-slate-800 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-150 font-semibold"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Apply Now CTA */}
        <div className="px-5 pb-4">
          <Link
            href="/admissions"
            onClick={onClose}
            className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition-colors duration-200"
          >
            Apply for Admission
          </Link>
        </div>

        {/* Contact info */}
        <div className="px-5 pb-6 border-t border-slate-100 pt-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Contact Us
          </h3>
          <div className="space-y-2">
            <a
              href={`tel:${SCHOOL_PHONE}`}
              className="flex items-center gap-2 text-slate-700 hover:text-blue-800 text-sm"
            >
              <svg
                className="w-4 h-4 text-blue-800 flex-shrink-0"
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
            <a
              href={`mailto:${SCHOOL_EMAIL}`}
              className="flex items-center gap-2 text-slate-700 hover:text-blue-800 text-sm"
            >
              <svg
                className="w-4 h-4 text-blue-800 flex-shrink-0"
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
          </div>
        </div>
      </div>
    </>
  );
}
