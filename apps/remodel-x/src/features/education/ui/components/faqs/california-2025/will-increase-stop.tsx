import { ArrowUpRight } from "lucide-react";

export function WillIncreaseStop() {
  return (
    <div className="flex flex-col gap-2">
      <p className="space-y-4 leading-6">
        Unfortunately, that scenario is unlikely. The data projects that
        electrical costs will keep increasing due to all the factors
        mentioned above.
      </p>
      <span className="">
        Over the past 5 years (2020 - 2024), SoCal utilities have
        increased rates
        {" "}
        <strong className="underline underline-offset-4">
          16 times!
        </strong>
        <a
          href="https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories/rate-change-alerts---previous-years"
          target="_blank"
          className="h-[24px] inline-flex"
        >
          <span className="text-xs bg-yellow-50 rounded-xl text-neutral-700 border ml-2 px-2 flex justify-center items-center hover:bg-yellow-200 hover:text-neutral-900 transition">
            CPUC
            <ArrowUpRight size={12} className="inline ml-1" />
          </span>
        </a>
        <a
          href="https://www.sce.com/save-money/rates-financing/sce-rate-advisory/20240101"
          target="_blank"
          className="h-[24px] inline-flex"
        >
          <span className="text-xs bg-yellow-50 rounded-xl text-neutral-700 border ml-2 px-2 flex justify-center items-center hover:bg-yellow-200 hover:text-neutral-900 transition">
            Edison
            <ArrowUpRight size={12} className="inline ml-1" />
          </span>
        </a>
      </span>
    </div>
  )
}
