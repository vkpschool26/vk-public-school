import type { NavItem } from "@/types";

export const SCHOOL_NAME = "VK Public School";
export const SCHOOL_TAGLINE = "Learn • Lead • Succeed";
export const SCHOOL_GRADE_RANGE = "Nursery to Grade 5";
export const SCHOOL_ADDRESS =
  "Balapura, Bukkapattana Hobli, Sira Taluk, Tumakuru District, Karnataka – 572115, India";
export const SCHOOL_PHONE = "7259434347";
export const SCHOOL_EMAIL = "info@vkpublicschool.org";
export const SCHOOL_FOUNDED = "2026";

export const SCHOOL_MISSION =
  "Provide quality education in a nurturing and supportive environment that encourages every child to learn, grow, and succeed.";

export const SCHOOL_PHILOSOPHY =
  "Every child is unique and capable of achieving great things when guided with care, encouragement, and the right learning environment.";

export const SCHOOL_VALUES = [
  "Excellence",
  "Discipline",
  "Honesty",
  "Creativity",
  "Respect",
  "Responsibility",
];

export const NAV_ITEMS: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Principal's Message", href: "/about#principal" },
      { label: "Vision & Mission", href: "/about#vision" },
    ],
  },
  { label: "Academics", href: "/academics" },
  { label: "Activities", href: "/activities" },
  { label: "Facilities", href: "/facilities" },
  { label: "Admissions", href: "/admissions" },
  { label: "Gallery", href: "/gallery" },
  {
    label: "More",
    href: "#",
    children: [
      { label: "Events", href: "/events" },
      { label: "News & Notices", href: "/news" },
      { label: "Achievements", href: "/achievements" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
