import type { EnergyEfficiencyEducationStep } from "@/features/education/types";

import { CostOfElectricity, TheOptions, WhyTheIncrease, WillIncreaseStop } from "@/features/education/ui/components/faqs";

export const CALIFORNIA_2025_EDUCATION = {
  accessor: "california-2025",
  title: "California 2025",
  questions: [
    {
      question: "Is the cost of electricity increasing?",
      answer: CostOfElectricity,
      media: [
        {
          image: "/images/education/electricity-rates-graph.png",
          link: "https://www.spglobal.com/marketintelligence/en/news-insights/latest-news-headlines/skyrocketing-electricity-prices-test-california-s-energy-transition-80305308",
        },
      ],
    },
    {
      question: "What's driving the increase?",
      answer: WhyTheIncrease,
      media: [
        {
          image: "/images/education/edison-fine-1.png",
          link: "https://www.latimes.com/california/story/2021-12-17/southern-california-edison-faces-550m-penalty-for-wildfires",
        },
        {
          image: "/images/education/edison-fine-2.png",
          link: "https://www.dailynews.com/2021/01/25/socal-edison-reaches-2-2-billion-settlement-for-woolsey-fire/",
        },
        {
          image: "/images/education/home-with-solar-percent.png",
          link: "https://www.altenergymag.com/article/2019/04/california-leads-nation-in-residential-solar-installation-rates-overall-homes-and-total-capacity/30812/#:~:text=Analysis%20and%20Trends-,Gavop's%20analysis%20of%20latest%20solar%20installation%20data%20from%20SEIA%20and,the%20highest%20installed%20solar%20capacity.",
        },
      ],
    },
    {
      question: "Will the increase stop?",
      answer: WillIncreaseStop,
      media: [
        {
          image: "/images/education/edison-increases/sce-inc-2410.png",
          link: "https://www.sce.com/save-money/rates-financing/sce-rate-advisory/20241001",
        },
        {
          image: "/images/education/edison-increases/sce-inc-2406.png",
          link: "https://www.sce.com/save-money/rates-financing/sce-rate-advisory/20240601",
        },
        {
          image: "/images/education/edison-increases/sce-inc-2403.png",
          link: "https://www.sce.com/save-money/rates-financing/sce-rate-advisory/20240301",
        },
        {
          image: "/images/education/edison-increases/sce-inc-2401.png",
          link: "https://www.sce.com/save-money/rates-financing/sce-rate-advisory/20240101",
        },
        {
          image: "/images/education/edison-increases/sce-inc-2310.png",
          link: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories/rate-change-alerts---previous-years",
        },
        {
          image: "/images/education/edison-increases/sce-inc-2306.png",
          link: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories/rate-change-alerts---previous-years",
        },
        {
          image: "/images/education/edison-increases/sce-inc-2301.png",
          link: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories/rate-change-alerts---previous-years",
        },
        {
          image: "/images/education/edison-increases/sce-inc-2210.png",
          link: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories/rate-change-alerts---previous-years",
        },
        {
          image: "/images/education/edison-increases/sce-inc-2203.png",
          link: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories/rate-change-alerts---previous-years",
        },
        {
          image: "/images/education/edison-increases/sce-inc-2201.png",
          link: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories/rate-change-alerts---previous-years",
        },
        {
          image: "/images/education/edison-increases/sce-inc-2110.png",
          link: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories/rate-change-alerts---previous-years",
        },
        {
          image: "/images/education/edison-increases/sce-inc-2106.png",
          link: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories/rate-change-alerts---previous-years",
        },
        {
          image: "/images/education/edison-increases/sce-inc-2102.png",
          link: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories/rate-change-alerts---previous-years",
        },
        {
          image: "/images/education/edison-increases/sce-inc-2010.png",
          link: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories/rate-change-alerts---previous-years",
        },
        {
          image: "/images/education/edison-increases/sce-inc-2004.png",
          link: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories/rate-change-alerts---previous-years",
        },
        {
          image: "/images/education/edison-increases/sce-inc-2001.png",
          link: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories/rate-change-alerts---previous-years",
        },
      ],
    },
    {
      question: "What are my options?",
      answer: TheOptions,
      media: [
        {
          image: "/images/education/power-plant.jpg",
          link: "",
        },
        {
          image: "/images/education/solar-panels-money.jpeg",
          link: "",
        },
      ],
    },
  ],
} as const satisfies EnergyEfficiencyEducationStep;
