export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  category: "Academic" | "Cultural" | "Sports" | "Holiday";
  image?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: "Classrooms" | "Events" | "Sports" | "Activities" | "Facilities";
  src: string;
  alt: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  items: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  year: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: "Academic" | "General" | "Holiday" | "Admissions";
  content: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavSubItem[];
}

export interface NavSubItem {
  label: string;
  href: string;
}
