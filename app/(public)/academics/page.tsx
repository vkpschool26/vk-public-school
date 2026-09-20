import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SCHOOL_NAME } from "@/lib/data/school";

export const metadata: Metadata = {
  title: "Academics",
  description: `Explore the academic curriculum at ${SCHOOL_NAME}. NCERT-aligned education from Nursery to Grade 5, covering Mathematics, Languages, EVS, and more.`,
};

const gradeLevels = [
  {
    grade: "Nursery",
    age: "3 – 4 years",
    focus: "Play-Based Foundation",
    description:
      "Children develop social skills, motor skills, and early literacy through play, storytelling, songs, and sensory activities.",
    subjects: ["Pre-Reading (Phonics)", "Pre-Writing", "Number Concepts", "Colours & Shapes", "Arts & Crafts", "Music & Movement"],
    color: "bg-pink-500",
  },
  {
    grade: "LKG",
    age: "4 – 5 years",
    focus: "Early Learning",
    description:
      "Building on the Nursery foundation, children begin structured learning with phonics, early reading, basic writing, and number recognition.",
    subjects: ["English (Phonics & Reading)", "Kannada", "Mathematics (1-50)", "EVS", "Arts & Crafts", "Yoga & PE"],
    color: "bg-orange-500",
  },
  {
    grade: "UKG",
    age: "5 – 6 years",
    focus: "Kindergarten",
    description:
      "Children are introduced to reading short stories, basic writing, and numbers up to 100, preparing them confidently for formal schooling.",
    subjects: ["English", "Kannada", "Hindi (Introduction)", "Mathematics (1-100)", "EVS", "Arts, PE & Yoga"],
    color: "bg-amber-500",
  },
  {
    grade: "Grade 1 – 2",
    age: "6 – 8 years",
    focus: "Primary Foundation",
    description:
      "The formal school years begin with a strong focus on literacy and numeracy. Activity-based learning makes every lesson engaging and memorable.",
    subjects: ["English", "Kannada", "Hindi", "Mathematics", "Environmental Studies", "Drawing & Craft"],
    color: "bg-blue-600",
  },
  {
    grade: "Grade 3 – 4",
    age: "8 – 10 years",
    focus: "Building Knowledge",
    description:
      "Curriculum deepens with more complex language, mathematical operations, and EVS concepts. Students develop critical thinking and research skills.",
    subjects: ["English", "Kannada", "Hindi", "Mathematics", "Environmental Studies", "Computer Basics", "Arts & Craft"],
    color: "bg-indigo-700",
  },
  {
    grade: "Grade 5",
    age: "10 – 11 years",
    focus: "Primary Completion",
    description:
      "Grade 5 prepares students for the transition to upper primary. Emphasis on independent learning, written expression, and problem-solving.",
    subjects: ["English", "Kannada", "Hindi", "Mathematics", "Science & Technology", "Social Studies", "Computer Education"],
    color: "bg-purple-700",
  },
];

const teachingMethods = [
  {
    title: "Activity-Based Learning",
    description: "Hands-on experiments, projects, and group activities replace passive listening.",
  },
  {
    title: "Story-Led Teaching",
    description: "Concepts are introduced through stories, making them relatable and memorable.",
  },
  {
    title: "Visual Learning",
    description: "Charts, diagrams, flashcards, and models make abstract concepts concrete.",
  },
  {
    title: "Collaborative Learning",
    description: "Pair and group work builds communication, teamwork, and leadership skills.",
  },
  {
    title: "Regular Assessments",
    description: "Formative and summative assessments track progress without creating undue pressure.",
  },
  {
    title: "Parent Involvement",
    description: "Regular parent-teacher meetings and updates keep families informed and involved.",
  },
];

export default function AcademicsPage() {
  return (
    <div>
      <div className="bg-gradient-to-br from-blue-900 to-indigo-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Curriculum
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Academics
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            A structured, NCERT-aligned curriculum that nurtures curiosity and
            builds a strong academic foundation from Nursery to Grade 5
          </p>
        </div>
      </div>

      {/* Grade levels */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Grade-Wise Curriculum"
            heading="What Your Child Learns"
            description="Each grade level is thoughtfully designed to build on the previous year, creating a seamless learning journey."
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gradeLevels.map((level) => (
              <div key={level.grade} className="bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className={`${level.color} px-5 py-4`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-white text-xl">{level.grade}</h3>
                      <p className="text-white/80 text-xs mt-0.5">{level.age}</p>
                    </div>
                    <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      {level.focus}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{level.description}</p>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Subjects</h4>
                  <ul className="space-y-1.5">
                    {level.subjects.map((sub) => (
                      <li key={sub} className="flex items-center gap-2 text-sm text-slate-700">
                        <svg className="w-3.5 h-3.5 text-blue-800 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching methodology */}
      <section className="py-14 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="How We Teach"
            heading="Our Teaching Methodology"
            description="We use proven, child-centred teaching methods that make learning joyful, effective, and long-lasting."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {teachingMethods.map((method, index) => (
              <div key={method.title} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-sm transition-shadow duration-300">
                <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-xl flex items-center justify-center font-bold text-lg mb-4">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{method.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              eyebrow="Evaluation"
              heading="Assessment & Reporting"
              align="left"
              className="mb-8"
            />
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                At VK Public School, assessment is seen as a tool for learning,
                not just measurement. We follow a Continuous and Comprehensive
                Evaluation (CCE) approach that considers the whole child —
                academics, co-curricular activities, values, and personal growth.
              </p>
              <p>
                Students are assessed through a combination of class
                participation, homework, projects, oral assessments, and formal
                written tests. Progress reports are shared with parents at
                regular intervals throughout the year.
              </p>
              <p>
                We believe in celebrating progress, not just performance. Every
                child&apos;s unique learning pace is respected, and our teachers
                provide additional support to students who need it.
              </p>
            </div>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {[
                { label: "Unit Tests", freq: "Monthly" },
                { label: "Report Cards", freq: "Quarterly" },
                { label: "PTM Meetings", freq: "Bi-Annual" },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center">
                  <div className="text-blue-800 font-bold text-lg">{item.freq}</div>
                  <div className="text-slate-600 text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
