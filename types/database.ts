// Supabase database type definitions.
// Hand-authored to match supabase/migrations/20260920000000_initial_schema.sql.
// Once the Supabase project is connected, regenerate with:
//   npx supabase gen types typescript --project-id <your-project-id> > types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          title: string;
          date: string;
          description: string;
          category: "Academic" | "Cultural" | "Sports" | "Holiday";
          image_url: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          date: string;
          description: string;
          category: "Academic" | "Cultural" | "Sports" | "Holiday";
          image_url?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          date?: string;
          description?: string;
          category?: "Academic" | "Cultural" | "Sports" | "Holiday";
          image_url?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      gallery_images: {
        Row: {
          id: string;
          title: string;
          category: "Classrooms" | "Events" | "Sports" | "Activities" | "Facilities";
          storage_path: string;
          alt: string;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          category: "Classrooms" | "Events" | "Sports" | "Activities" | "Facilities";
          storage_path: string;
          alt: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: "Classrooms" | "Events" | "Sports" | "Activities" | "Facilities";
          storage_path?: string;
          alt?: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      notices: {
        Row: {
          id: string;
          title: string;
          date: string;
          category: "Academic" | "General" | "Holiday" | "Admissions";
          content: string;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          date: string;
          category: "Academic" | "General" | "Holiday" | "Admissions";
          content: string;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          date?: string;
          category?: "Academic" | "General" | "Holiday" | "Admissions";
          content?: string;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      achievements: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon: string;
          year: string;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          icon: string;
          year: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          icon?: string;
          year?: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      activities: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon: string;
          color: string;
          items: string[];
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          icon: string;
          color: string;
          items?: string[];
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          icon?: string;
          color?: string;
          items?: string[];
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

// Convenience row types — import these in UI and data-fetching code
export type EventRow = Database["public"]["Tables"]["events"]["Row"];
export type GalleryImageRow = Database["public"]["Tables"]["gallery_images"]["Row"];
export type NoticeRow = Database["public"]["Tables"]["notices"]["Row"];
export type AchievementRow = Database["public"]["Tables"]["achievements"]["Row"];
export type ActivityRow = Database["public"]["Tables"]["activities"]["Row"];
