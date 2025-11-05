import type { EnergyEfficiencyProgramsGroup } from "../types";

export const ENERGY_EFFICIENCY_PROGRAMS_SEQ = [
  "California Energy Commission",
  "CA Department of Community Services and Development",
  "California Public Utilities Commission",
  "LADWP",
  "LADWP Low Income",
  "LADWP Senior Citizens",
  "Edison",
  "Department of Energy",
  "Energy Star",
];

export const ENERGY_EFFICIENCY_PROGRAMS = [
  {
    groupTitle: "LADWP General",
    utility: ["ladwp"],
    programs: [
      {
        label: "Power System",
        href: "https://www.ladwp.com/who-we-are/power-system",
      },
      {
        label: "Powered by Equity",
        href: "https://www.ladwp.com/strategic-initiatives/leading-equity/powered-equity",
      },
      {
        label: "Consumer Rebate Programs",
        href: "https://www.ladwp.com/residential-services/programs-and-rebates-residential/consumer-rebate-program",
      },
    ],
  },
  {
    groupTitle: "LADWP Low Income",
    utility: ["ladwp"],
    programs: [
      {
        label: "Home Energy Assistance Program",
        href: "https://www.ladwp.com/residential-services/assistance-programs/low-income-home-energy-assistance-program-liheap",
      },
      {
        label: "EZ-Save Program",
        href: "https://www.ladwp.com/residential-services/assistance-programs/ez-save-program",
      },
    ],
  },
  {
    groupTitle: "LADWP Senior Citizens",
    utility: ["ladwp"],
    programs: [
      {
        label: "Lifeline Program",
        href: "https://www.ladwp.com/residential-services/assistance-programs/senior-citizendisability-lifeline-rate",
      },
    ],
  },
  {
    groupTitle: "Edison General",
    utility: ["edison"],
    programs: [
      {
        label: "Microgrid Incentive Program",
        href: "https://www.sce.com/partners/partnerships/microgrid-incentive-program",
      },
      {
        label: "Residential Direct Install Program",
        href: "https://www.sce.com/residential/rebates-incentives-saving-tips/residential-direct-install-program",
      },
    ],
  },
  {
    groupTitle: "Edison Low Income",
    utility: ["edison"],
    programs: [
      {
        label: "Energy Assistance Fund",
        href: "https://www.sce.com/residential/assistance/energy-assistance-fund",
      },
      {
        label: "Energy Savings Assistance Program",
        href: "https://www.sce.com/residential/assistance/energy-saving-program",
      },
    ],
  },
  {
    groupTitle: "California Energy Commission",
    utility: ["ladwp", "edison"],
    programs: [
      {
        label: "Inflation Reduction Act Residential Energy Rebate Programs",
        href: "https://www.energy.ca.gov/programs-and-topics/programs/inflation-reduction-act-residential-energy-rebate-programs",
      },
      {
        label: "HEEHRA Rebate (IRA) Program",
        href: "https://www.heehra-incomeportal.com/home/index",
      },
      {
        label: "California Electric Homes Program",
        href: "https://www.energy.ca.gov/programs-and-topics/programs/california-electric-homes-program-calehp",
      },
      {
        label: "Clean Transportation Program",
        href: "https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program",
      },
      {
        label: "Demand Side Grid Support Program",
        href: "https://www.energy.ca.gov/programs-and-topics/programs/demand-side-grid-support-program",
      },
      {
        label:
          "Community Energy Reliability and Resilience Investment (CERRI) Program",
        href: "https://www.energy.ca.gov/programs-and-topics/programs/community-energy-reliability-and-resilience-investment-cerri-program",
      },
      {
        label: "Energy Conservation Assistance Act",
        href: "https://www.energy.ca.gov/programs-and-topics/programs/energy-conservation-assistance-act",
      },
      {
        label: "Energy Partnership Program",
        href: "https://www.energy.ca.gov/programs-and-topics/programs/energy-partnership-program",
      },
      {
        label: "Equitable Building Decarbonization Program",
        href: "https://www.energy.ca.gov/programs-and-topics/programs/equitable-building-decarbonization-program",
      },
      {
        label: "Home Energy Rating and Labeling Program",
        href: "https://www.energy.ca.gov/programs-and-topics/programs/home-energy-rating-and-labeling-program",
      },
      {
        label: "New Solar Homes Partnership Program - NSHP",
        href: "https://www.energy.ca.gov/programs-and-topics/programs/new-solar-homes-partnership-program-nshp",
      },
    ],
  },
  {
    groupTitle: "California Public Utilities Commission",
    utility: ["ladwp", "edison"],
    programs: [
      {
        label: "Income Qualified Assistance Programs",
        href: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/income-qualified-assistance-programs",
      },
      {
        label: "Solar in Disadvantaged Communities (DACs) Program",
        href: "https://www.cpuc.ca.gov/SolarInDACs",
      },
      {
        label: "Market Access Program",
        href: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/demand-side-management/energy-efficiency/market-access-program",
      },
      {
        label: "Energy Savings Assistance Program",
        href: "https://www.cpuc.ca.gov/consumer-support/financial-assistance-savings-and-discounts/energy-savings-assistance",
      },
    ],
  },
  {
    groupTitle: "CA Department of Community Services and Development",
    utility: ["ladwp", "edison"],
    programs: [
      {
        label: "Weatherization Assistance Program",
        href: "https://www.csd.ca.gov/Pages/Residential-Energy-Efficiency.aspx",
      },
      {
        label: "Low Income Home Energy Assistance ​Program",
        href: "https://www.csd.ca.gov/energybills",
      },
    ],
  },
  {
    groupTitle: "Department of Energy",
    utility: ["ladwp", "edison"],
    programs: [
      {
        label: "Home Trades Program",
        href: "https://www.energy.gov/save/home-trades",
      },
      {
        label: "Home Efficiency Rebates",
        href: "https://www.energy.gov/scep/home-efficiency-rebates",
      },
      {
        label: "Home Electrification and Appliance Rebates",
        href: "https://www.energy.gov/scep/home-electrification-and-appliance-rebates",
      },
    ],
  },
  {
    groupTitle: "Federal Tax Credits",
    utility: ["ladwp", "edison"],
    programs: [
      {
        label: "Insulation tax credit program",
        href: "https://www.energystar.gov/about/federal-tax-credits/insulation",
      },
      {
        label: "Windows tax credit program",
        href: "https://www.energystar.gov/about/federal-tax-credits/windows-skylights",
      },
      {
        label: "Battery tax credit program",
        href: "https://www.energystar.gov/about/federal-tax-credits/battery-storage-technology",
      },
      {
        label: "Solar tax credit program",
        href: "https://www.energystar.gov/about/federal-tax-credits/solar-energy-systems",
      },
      {
        label: "Electric panel trade tax credit program",
        href: "https://www.energystar.gov/about/federal-tax-credits/electric-panel-trade",
      },
      {
        label: "Heating & cooling tax credit program",
        href: "https://www.energystar.gov/about/federal-tax-credits/central-air-conditioners",
      },
    ],
  },
  {
    groupTitle: "Energy Star",
    utility: ["ladwp", "edison"],
    programs: [
      {
        label: "Federal Tax Credits for Energy Efficiency",
        href: "https://www.energystar.gov/about/federal-tax-credits",
      },
      {
        label: "Energy Star Rebate Finder",
        href: "https://www.energystar.gov/productfinder/",
      },
    ],
  },
  {
    groupTitle: "Other Energy Bodies",
    utility: ["ladwp", "edison"],
    programs: [
      {
        label: "The Switch is On",
        href: "https://www.switchison.org/ca",
      },
      {
        label: "Tech Clean CA",
        href: "https://techcleanca.com/",
      },
      {
        label: "Building Decarbonization Coalition (BDC)",
        href: "https://buildingdecarb.org/",
      },
    ],
  },
  {
    groupTitle: "Useful Links",
    utility: ["ladwp", "edison"],
    programs: [
      {
        label: "CPUC Rate Change Alerts",
        href: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories/rate-change-alerts---previous-years",
      },
      {
        label: "CPUC Rates Report 2024",
        href: "https://www.publicadvocates.cpuc.ca.gov/-/media/cal-advocates-website/files/press-room/reports-and-analyses/240722-public-advocates-office-q2-2024-electric-rates-report.pdf",
      },
      {
        label: "Edison Rate Change 2024",
        href: "https://www.sce.com/residential/rates/rateadvisory",
      },
      {
        label: "CEC Approved Programs",
        href: "https://www.energy.ca.gov/programs-and-topics/programs",
      },
      {
        label: "NEM 2.0 vs NEM 3.0",
        href: "https://www.exro.com/industry-insights/california-net-energy-metering-policies",
      },
      {
        label: "EPA Green Energy Conversion",
        href: "https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator#results",
      },
    ],
  },
] as const satisfies EnergyEfficiencyProgramsGroup[];
