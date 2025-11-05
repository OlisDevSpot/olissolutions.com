import { Warranties } from "@/features/education/ui/components/faqs";

export const PROGRAM_BENFITS_EDUCATION = {
  type: "Program Benefits",
  questions: [
    {
      question: "What is the guarantee?",
      answer: "Unlike a solar purchase agreement, the program guarantees your production for the life of the term.",
      media: [
        {
          image: "/images/education/palmetto/lightreach-1-guarantee.png",
          link: "",
        },
      ],
    },
    {
      question: "What is the warranty?",
      answer: Warranties,
      images: [
        {
          image: "/images/education/palmetto/lightreach-13-warranty.png",
          link: "",
        },
      ],
    },
    {
      question:
          "I heard home trades have liens, is there a lien on my home?",
      answer: "No liens, ever.",
      images: [
        {
          image: "/images/education/palmetto/lightreach-13-no-lien.png",
          link: "",
        },
      ],
    },
    {
      question: "Can you summarize the benefits?",
      answer: "Sure.",
      images: [
        {
          image: "/images/education/palmetto/lightreach-coverage-summary.png",
          link: "/images/education/palmetto/lightreach-coverage-summary.png",
        },
      ],
    },
    {
      question: "How do I pay back the assistance?",
      answer: "All the benefits are completely yours! Only requirement is to qualify.",
    },
  ],
}
