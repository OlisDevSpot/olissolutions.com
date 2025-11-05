import type { EnergyEfficiencyEducationStep } from "@/features/education/types"

import { CanBillsBeHigher, GoalOfAssistancePrograms, ProgramsLimitations, QualificationCriteria, QualificationTypes } from "@/features/education/ui/components/faqs"

export const ASSISTANCE_PROGRAMS_EDUCATION = {
  accessor: "assistance-programs",
  title: "Assistance Program",
  questions: [
    {
      question: "What is the goal of the assistance program?",
      answer: GoalOfAssistancePrograms,
    },
    {
      question: "Can my bills be higher under the assistance program?",
      answer: CanBillsBeHigher,
    },
    {
      question: "What can I qualify for under the assistance program?",
      answer: QualificationTypes,
    },
    {
      question: "How do I qualify for assistance?",
      answer: QualificationCriteria,
    },
    {
      question: "Are there limitations?",
      answer: ProgramsLimitations,
    },
  ],
} as const satisfies EnergyEfficiencyEducationStep
