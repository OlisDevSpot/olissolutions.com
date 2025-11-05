export function CostOfElectricity() {
  const utilityBill = 200
  
  return (
    <div className="space-y-4 leading-6">
      <p className="mb-4">
        The average yearly increase in CA over the past 7 years is
        {" "}
        <strong>13.2%/year</strong>
        .
        <br />
        The average in SoCal is 
        {" "}
        <strong>14.2%/year</strong>
      </p>
      <a
        href="https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories/rate-change-alerts---previous-years"
        target="_blank"
        className="hover:underline transition text-blue-500 hover:text-blue-400"
      >
        CPUC Rate Change Alerts
      </a>
      <div className="flex justify-between items-center">
        <div className="bg-green-100 text-green-600 font-semibold p-2 rounded-lg text-center">
          <p>Average bill (2020)</p>
          <strong>
            $
            {(utilityBill / 1.53).toFixed(1)}
          </strong>
        </div>
        <div className="relative text-center grow has-arrow">
          <strong className="text-center h-fit leading-loose">
            56.8% 
            {" "}
            <br />
            increase
          </strong>
        </div>
        <div className="bg-red-100 text-red-600 font-semibold p-2 rounded-lg text-center">
          <p>Average bill (2024)</p>
          <strong>
            $
            {utilityBill}
          </strong>
        </div>
      </div>
    </div>
  )
}
