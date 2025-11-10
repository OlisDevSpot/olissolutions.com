import type { InsertScope } from '@olis/db/schema/platform'
import type { TradeAccessor } from '@olis/db/types/trades'

export const scopesData = {
  solar: [
    {
      label: 'Remove & Reinstall Panels',
      accessor: 'rnrPanels',
      description: 'Remove and reinstall existing solar system',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755057320/solar-remove-reinstall_okq2sj.jpg',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: 'Phase I: Site Preparation Conduct a site assessment to document the existing condition of the solar panels and mounting system.  Ensure proper labeling of all panels, wiring, and components for reinstallation.  Turn off the solar system and disconnect it from the main electrical panel and inverter.  Pull necessary permits if required by the city (permit-related expenses to be billed separately).  Phase II: Removal of Solar Panels Carefully detach and remove all solar panels, inverters, and mounting hardware.  Inspect roof conditions and document any necessary repairs.  Store all solar panels and components safely on-site or transport them to a storage area if needed.  Clean up all debris from the work area.  Phase III: Reinstallation of Solar Panels Inspect the roof for structural integrity before reinstalling the solar system.  Install mounting brackets and ensure proper waterproofing and sealing.  Reinstall solar panels and inverters according to manufacturer specifications.  Reconnect electrical wiring and ensure proper grounding.  Conduct system testing to confirm proper functionality and output.  Schedule and facilitate city inspection (if required).  Reconnect the system to the grid and verify performance.  Agreement Notes:  Additional repairs to roof decking or mounting hardware will be billed separately.  If any solar panel or component is damaged during removal due to existing wear, replacement costs will be quoted separately.',
    },
    {
      label: 'Install Panels',
      accessor: 'installPanels',
      description: 'Install a new solar system',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755057319/solar-installation_qfddia.jpg',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: 'Phase I: Site Preparation - Conduct a comprehensive site inspection to determine the optimal layout for the solar system. - Develop detailed engineering plans for the proposed solar installation, ensuring compliance with all municipal requirements. - Design architectural layouts that meet the specific criteria set by the city. - Pull all necessary city permit(s)  Phase II: Installation - Install the mounting brackets securely to support the solar panels. - Set up an approximately 8kW solar system, consisting of 20 Q-Cell PV modules, each rated at 400 watts. - Install 20 MicroInverters to convert the generated DC power to AC power. - Install risers where necessary to achieve the required tilt for optimal solar exposure. - Waterproof and seal all installations to prevent any potential leaks. - Clean up all debris from the installation site and ensure proper disposal.  Phase III: Interconnection - Schedule and facilitate the city inspection to verify the installation meets all regulatory standards. - Arrange for the utility company to inspect the system to ensure it is ready for grid connection. - Activate and configure the solar system for operation. - Provide monitoring of the solar system’s energy generation for a period of six months to ensure optimal performance.',
    },
    {
      label: 'Install Battery',
      accessor: 'installBattery',
      description: 'Install a new battery',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755057319/solar-battery-installation_rufdpn.jpg',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: null,
    },
  ],
  roof: [
    {
      label: 'Roof Overlay',
      accessor: 'overlay',
      description: 'Overlay existing roof',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1756441726/roof-overlay_bk8vt0.webp',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: 'Phase I: Site Preparation - Provide dumpster to jobsite - Cover ground around house, HVAC condensers as needed, fragile items and exposed ceilings in garage with nylon and tarps in order to collect debris from roof in an organized fashion - Pull city permit (permit related expenses to be billed separately)  Phase II: Demo - Demo existing roof finish - Clean wood deck from all nails and debris and prepare for new roof installation - Demo existing roof underlayment to decking - Inspect the wood decking for structural soundness and replace wood to match as necessary. - Replace up to 15% of damaged plywood - Clean all debris & haul away - Pass tear off inspection with local city inspector  Phase III: Install new roofing material per code - Prep work area, HVAC condensers as needed, cover with nylon and tarps in order to collect debris from roof in an organized fashion - Install new synthetic underlayment (UDL30 or equivalent) and fasten down with 1" plastic cap nails per code - Install new powder coated 2x2/ 2x3 drip edge metal flashings along perimeter (Eaves/gutters and Rakes) - Install starter shingles around the perimeter per manufacturer standards - Install ice & water shield (weather-lock) on all penetrations and valleys as needed - Install, seal and paint all metal flashings, pipes vents to match - Install new low profile attic vents to match - Install new Owens Corning Cool Shingles (25 yr Warranty) (Color to be selected by customer) - Install decorative hip / ridge caps  Agreement Notes - 1 BSQ.= 100 square feet - Contractor is not liable for any broken tiles - Any dry-rot repair is additional charge- $x/ man hour + material',
    },
    {
      label: 'Roof Tear-off',
      accessor: 'tearOff',
      description: 'Replace existing roofing',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755106329/tear-off_xx8abp.webp',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: 'Phase I: Site Preparation - Provide dumpster to jobsite - Cover ground around house, HVAC condensers as needed, fragile items and exposed ceilings in garage with nylon and tarps in order to collect debris from roof in an organized fashion - Pull city permit (permit related expenses to be billed separately)  Phase II: Demo - Demo existing roof finish - Clean wood deck from all nails and debris and prepare for new roof installation - Demo existing roof underlayment to decking - Inspect the wood decking for structural soundness and replace wood to match as necessary. - Replace up to 15% of damaged plywood - Clean all debris & haul away - Pass tear off inspection with local city inspector  Phase III: Install new roofing material per code - Prep work area, HVAC condensers as needed, cover with nylon and tarps in order to collect debris from roof in an organized fashion - Install new synthetic underlayment (UDL30 or equivalent) and fasten down with 1" plastic cap nails per code - Install new powder coated 2x2/ 2x3 drip edge metal flashings along perimeter (Eaves/gutters and Rakes) - Install starter shingles around the perimeter per manufacturer standards - Install ice & water shield (weather-lock) on all penetrations and valleys as needed - Install, seal and paint all metal flashings, pipes vents to match - Install new low profile attic vents to match - Install new Owens Corning Cool Shingles (25 yr Warranty) (Color to be selected by customer) - Install decorative hip / ridge caps  Agreement Notes - 1 BSQ.= 100 square feet - Contractor is not liable for any broken tiles - Any dry-rot repair is additional charge- $x/ man hour + material',
    },
    {
      label: 'Tile Reset',
      accessor: 'tileReset',
      description: 'Replace entire existing tile roofing',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755057322/tile-reset_dtudvv.webp',
      constructionType: 'rough-construction',
      scopeOfWorkBase: 'Phase I: Site Preparation - Cover ground around house, HVAC condensers as needed, fragile items and exposed ceilings in garage with nylon and tarps in order to collect debris from roof in an organized fashion - Pull city permit on homeowner\'s behalf  Phase II: Demo - Remove existing tiles from roof and store away (tiles to be reinstalled) - Clean wood deck from all nails and debris and prepare for new roof installation. - Demo existing roof underlayment to decking - Inspect the wood decking for structural soundness and replace wood to match as necessary. - Replace up to 15% of damaged plywood. - Clean all debris & haul away - Pass tear off inspection with local city inspector  Phase III: Install new roofing material per code - Prep work area, HVAC condensers as needed, cover with nylon and tarps in order to collect debris from roof in an organized fashion - Install new synthetic underlayment - UDL30 or equivalent and fasten down with 1" plastic cap nails per code - Install new powder coated 2x2/ 2x3 drip edge metal flashings along perimeter (Eaves/gutters and Rakes)- Color TBD - Install ice & water shield (weather-lock) on all penetrations and valleys as needed. - Install, seal and paint all metal flashings, pipes vents to match - Install new low profile attic vents to match - Re-install original roof tiles - Install decorative hip / ridge caps as needed - Clean up and haul away all debris  Notes - *1 sq.= 100 square feet - *Contractor is not liable for any broken tiles - *Permit fees will be billed separately. Contractor to pull and company to reimburse',
    },
    {
      label: 'Roof Redeck',
      accessor: 'redeck',
      description: 'Replace entire existing roofing',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755057314/redeck_lcalwr.webp',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: 'Phase I: Site Preparation - Cover ground around house, HVAC condensers as needed, fragile items and exposed ceilings in garage with nylon and tarps in order to collect debris from roof in an organized fashion  Phase II: Demo - Provide dumpster to jobsite - Demo existing asphalt shingles - Demo existing roof underlayment to decking - Demo all existing decking and vents - Team will inspect rafters (if damaged additional costs may apply) - Valley metal remains for re-enforcement - Provide and install new 1/2 inch plywood/osb boards over entire house roof - Clean all debris & haul away - Pass decking inspection with local city inspector  Phase III: Install new roofing material per code - Install new synthetic underlayment - UDL30 or equivalent and fasten down with 1" plastic cap nails per code - Install new powder coated 2x2/ 2x3 drip edge metal flashings along perimeter (Eaves/gutters and Rakes)- Color TBD - Install starter shingles around the perimeter per manufacturer standards - Install ice & water shield (weather-lock) on all penetrations and valleys as needed. - Install, seal and paint all metal flashings, pipes vents to match - Install new low profile attic vents to match - Install new Owens Corning Cool Shingles- 25 yr Warranty Color to be selected by customer. - Install decorative hip/ ridge caps  Notes - *1 sq.= 100 square feet - *Permit fees will be billed separately. Contractor to pull and company to reimburse',
    },
  ],
  atticBasement: [
    {
      label: 'Repair foundation',
      accessor: 'foundationRepair',
      description: 'Repair damaged foundation',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755057305/foundation-repair_vytinc.jpg',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: null,
    },
    {
      label: 'Replace attic insulation',
      accessor: 'rnrAttic',
      description: 'Remove & replace attic insulation',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1756165007/attic-insulation-replacement_rlyfdw.jpg',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: null,
    },
    {
      label: 'Top-off attic insulation',
      accessor: 'topOffAttic',
      description: 'Top-off attic insulation',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1756192856/attic-insulation-top-off_e3ycex.webp',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: null,
    },
    {
      label: 'Install crawl-space insulation',
      accessor: 'installCrawlSpaceInsulation',
      description: 'Add insulation to the cavities of your raised-foundation home',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755057302/craw-space-insulation-installation_lgw1jb.jpg',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: null,
    },
  ],
  dryscapingHardscaping: [
    {
      label: 'Install Artificial',
      accessor: 'installArtificial',
      description: 'Install Artificial Grasssss',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755057309/landscaping_vlm8zh.jpg',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: 'Phase I: Site Preparation Conduct an on-site assessment to determine drainage and grading requirements.  Remove any existing grass, weeds, or debris from the installation area.  Excavate the site to a depth of approximately 3-4 inches for proper base installation.  Install weed barrier fabric to prevent future weed growth.  Phase II: Base Installation Install a compacted base layer of Class II road base or decomposed granite to a depth of 3 inches.  Compact the base using a plate compactor to ensure a firm and level foundation.  Apply a top layer of fine sand or decomposed granite to smooth out the base.  Phase III: Artificial Turf Installation Roll out and cut artificial grass to fit the installation area.  Seam and secure sections together using commercial-grade adhesive and seam tape.  Secure turf edges with galvanized nails or landscape staples every 6-8 inches.  Brush silica sand or rubber infill into the turf to improve stability and durability.  Power brush the turf to ensure blades stand upright.  Clean up the work area and perform a final inspection.  Agreement Notes:  Additional site preparation, including leveling or drainage correction, will be billed separately.  The cost of artificial grass varies by type and quality',
    },
    {
      label: 'Install Gravel',
      accessor: 'installGravel',
      description: 'Install Gravel hereeee',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755106206/gravel-installation_yzid0r.jpg',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: 'Phase I: Site Preparation Conduct an on-site assessment to determine gravel type and quantity.  Clear and remove existing grass, weeds, and debris from the installation area.  Grade and level the ground for proper drainage.  Install a weed barrier fabric to reduce future weed growth.  Phase II: Gravel Installation Deliver and spread the selected type of gravel evenly across the designated area.  Install gravel at a depth of approximately 2-4 inches, depending on usage.  Rake and level the gravel for a smooth and even surface.  Phase III: Final Touches & Cleanup Compact the gravel with a roller or plate compactor for added stability (if necessary).  Clean up the work area and dispose of any excess material.  Agreement Notes:  Additional site leveling or excavation will be billed separately.  Gravel may shift over time and require periodic re-leveling.',
    },
    {
      label: 'Install Mulch',
      accessor: 'installMulch',
      description: 'Install Mulch sonnneee',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755106207/mulch-installation_q7bmzi.png',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: 'Phase I: Site Preparation Conduct an on-site assessment to determine the required mulch quantity.  Remove existing weeds, grass, and debris from the area.  Install weed barrier fabric to minimize weed growth.  Phase II: Mulch Installation Deliver and distribute high-quality organic or inorganic mulch evenly across the designated area.  Spread mulch to a depth of 2-3 inches for optimal moisture retention and weed suppression.  Rake and level the mulch to ensure a uniform finish.  Phase III: Final Touches & Cleanup Verify that mulch is evenly distributed and does not block plant bases.  Clean up all work areas and dispose of debris properly.  Agreement Notes:  Additional charges may apply for premium mulch varieties.  Mulch will naturally settle over time and may require periodic replenishment.',
    },
    {
      label: 'Install Concrete',
      accessor: 'installConcrete',
      description: 'Install Concrete sstrong sonnneee',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755106041/concrete-installation_qufksf.jpg',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: 'Phase I: Site Preparation Conduct an on-site assessment to determine grading and drainage requirements.  Excavate the area to the required depth based on the concrete application.  Remove any existing grass, debris, or obstructions from the site.  Install wooden forms to outline the pour area.  Phase II: Base & Reinforcement Installation Install a compacted base layer of Class II road base or decomposed granite.  Place reinforcement materials (e.g., rebar or wire mesh) as needed for added structural integrity.  Phase III: Concrete Pouring & Finishing Mix and pour concrete into the prepared forms.  Use screeds and floats to level and smooth the surface.  Apply finishing techniques (broom finish, stamped patterns, or smooth finish per client preference).  Allow concrete to cure for at least 24-48 hours before light foot traffic.  Phase IV: Final Touches & Cleanup Remove wooden forms after concrete has sufficiently cured.  Perform a final inspection to ensure a quality finish.  Clean up the work area and dispose of any excess material.  Agreement Notes:  Additional charges may apply for custom finishes, stamping, or color additives.  Concrete requires proper curing time before full use (vehicle traffic may require 7+ days).',
    },
    {
      label: 'Install Pavers',
      accessor: 'installPavers',
      description: 'Install Pavers beautiful',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755057303/driveway-replacement_dovzy4.jpg',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: 'Phase I: Site Preparation Conduct an on-site assessment to determine layout, drainage, and grading requirements.  Excavate the area to a depth of approximately 6-8 inches for proper base installation.  Remove any existing grass, soil, or debris from the site.  Install a weed barrier fabric to prevent future weed growth.  Phase II: Base Installation Install a compacted base layer of Class II road base or decomposed granite to a depth of 4-6 inches.  Compact the base using a plate compactor for stability.  Apply a layer of bedding sand (1 inch thick) and screed it for a smooth finish.  Phase III: Paver Installation Lay pavers according to the planned pattern, ensuring proper alignment.  Cut pavers as needed to fit edges and corners precisely.  Secure the pavers by filling joints with polymeric sand and compacting the surface.  Install edging restraints to keep pavers in place.  Phase IV: Final Touches & Cleanup Mist polymeric sand to activate binding agents and allow for curing.  Perform a final inspection to ensure proper alignment and leveling.  Clean up all debris and restore the surrounding area.  Agreement Notes:  Additional charges may apply for premium paver selections or complex patterns.  Settling over time may require periodic sand replenishment.',
    },
  ],
  hvac: [
    {
      label: 'Replace split system',
      accessor: 'replaceSplitSystem',
      description: 'Replace yo HVAC yo',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755057308/hvac-split-system-replacement_slgeo9.jpg',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: null,
    },
    {
      label: 'Replace package unit',
      accessor: 'replacePackageUnit',
      description: 'Replace yo roof hvac yo',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755057307/hvac-package-unit-replacement_g6rfyk.png',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: null,
    },
    {
      label: 'Replace furnace',
      accessor: 'replaceFurnace',
      description: 'Replace yo heater yo',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755057306/hvac-furnace-replacement_ezv0fi.jpg',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: null,
    },
    {
      label: 'Replace condenser & coil',
      accessor: 'replaceAC',
      description: 'Replace yo cooling component yo',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755106515/hvac-condenser-replacement_hrs5qo.jpg',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: null,
    },
    {
      label: 'Install mini-split',
      accessor: 'installMiniSplit',
      description: 'Install efficient mini splits',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755057310/mini-split-installation_mtbvqy.jpg',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: 'Phase I: Site Preparation Conduct an on-site assessment to determine the best location for indoor and outdoor units.  Confirm electrical requirements and ensure capacity for new mini-split system.  Pull necessary city permits if required (permit-related expenses to be billed separately).  Phase II: Installation Mount the indoor mini-split units in designated rooms with secure brackets.  Install refrigerant lines, condensate drain, and electrical wiring between indoor and outdoor units.  Drill small access holes through exterior walls as needed for refrigerant lines.  Mount and secure the outdoor condenser unit on a level concrete pad or wall bracket.  Ensure proper insulation and sealing of all penetrations to prevent air leaks.  Phase III: System Configuration & Testing Vacuum and charge the refrigerant system according to manufacturer specifications.  Connect the system to electrical power and test operation.  Configure remote controls and thermostat settings for optimal performance.  Provide homeowner training on proper use and maintenance.  Clean up all work areas and dispose of installation debris.  Agreement Notes:  Electrical trades, if required, will be billed separately.  Additional refrigerant line lengths beyond standard installation will incur extra charges.',
    },
  ],
  windows: [
    {
      label: 'Window replacement',
      accessor: 'replaceWindows',
      description: 'Replace existing windows',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755057322/windows-replacement_oalcrd.webp',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: `Phase I: Site Preparation - Accurately measure the size of each window opening. - Fabricate & provide new energy-efficient double pane windows.  Phase II: Demo - Remove existing windows - Clean up and haul away debris - Prepare the window opening, ensuring it is clean and level.  Phase III: Installation - Install new windows according to manufacturer instructions and industry best practices. - Apply 50 years caulking, all around frame by city code to properly insulate around the window frame and prevent air and water leakage. - Install trim and finish around the window frame to enhance aesthetics.  Quality Assurance - Conduct thorough inspections of each window installation to ensure proper functionality and appearance. - Test windows for smooth operation, proper sealing, security and no leaks. - Clean up the work area and remove any debris or construction waste.  Notes - Windows will be without grids  - Windows will have self-lock mechanism - No alteration to existing structure - all windows remain the size - Provide warranty information for the installed windows.\n\n\nRemove existing 13 single pane windows
      clean up and haul away debris
      Prepare and fix frame  for installation
      Install 13 new Retro fitted Vinyl Double Pane energy efficient windows
      Windows will be by Value or Premium pro series contractor’s edition or similar – white color
      Windows will be without grids with self - lock mechanism 
      Windows will be matching the existing windows opening method(sliding window will be replaced to sliding window and single hung will be replaced to single hung)
      replace 2 sliding doors to  new Double Pane energy efficient vinyl sliding doors – white color
      Install new coil wrap around the windows if interested - optional
      Apply 50 years caulking, all around frame by city code
      Install flat trim all around the windows
      Test for water proofing
      Clean up and haul away debris
`,
    },
    {
      label: 'Replace sliding door',
      accessor: 'replaceSlidingDoor',
      description: 'Replace old sliding door',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755105918/sliding-door-replacement_dzlpmm.jpg',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: 'Phase I: Site Preparation - Accurately measure the size of each door opening. - Fabricate & provide new energy-efficient double pane doors.  Phase II: Demo - Remove existing doors. - Clean up and haul away debris. - Prepare the door opening, ensuring it is clean and level.  Phase III: Installation - Install new doors according to manufacturer instructions and industry best practices. - Apply 50 years caulking, all around frame by city code to properly insulate around the door frame and prevent air and water leakage. - Install trim and finish around the door frame to enhance aesthetics.  Quality Assurance - Conduct thorough inspections of each door installation to ensure proper functionality and appearance. - Test doors for smooth operation, proper sealing, security and no leaks. - Clean up the work area and remove any debris or construction waste.  Notes - Doors will be without grids  - Doors will have self-lock mechanism - No alteration to existing structure - all doors remain the size - Provide warranty information for the installed doors.',
    },
    {
      label: 'Replace french doors',
      accessor: 'replaceFrenchDoors',
      description: 'Replace old french doors',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1762305348/replace-french-doors_jvglc8.jpg',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: 'Phase I: Site Preparation - Accurately measure the size of each door opening. - Fabricate & provide new energy-efficient double pane french doors.  Phase II: Demo - Remove existing doors. - Clean up and haul away debris. - Prepare the door opening, ensuring it is clean and level.  Phase III: Installation - Install new doors according to manufacturer instructions and industry best practices. - Apply 50 years caulking, all around frame by city code to properly insulate around the door frame and prevent air and water leakage. - Install trim and finish around the door frame to enhance aesthetics.  Quality Assurance - Conduct thorough inspections of each door installation to ensure proper functionality and appearance. - Test doors for smooth operation, proper sealing, security and no leaks. - Clean up the work area and remove any debris or construction waste.  Notes - Doors will be without grids  - Doors will have self-lock mechanism - No alteration to existing structure - all doors remain the size - Provide warranty information for the installed doors.',
    },
  ],
  exteriorPaintSiding: [
    {
      label: 'Install exterior paint',
      accessor: 'installExteriorPaint',
      description: 'Paint your home',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755057304/exterior-paint-cool-life_q3wimf.jpg',
      constructionType: 'energy-efficient',
      scopeOfWorkBase: null,
    },
    {
      label: 'Replace siding',
      accessor: 'replaceSiding',
      description: 'Replace the siding of your home',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755106514/siding-replacement_yjxz6x.jpg',
      constructionType: 'finish-construction',
      scopeOfWorkBase: null,
    },
  ],
  interiorPaint: [],
  electricals: [
    {
      label: 'Main Panel Trade',
      accessor: 'mpu',
      description: 'Main Panel Trade to 200A',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755029298/electricals_xjbtdn.jpg',
      constructionType: 'rough-construction',
      scopeOfWorkBase: null,
    },
    {
      label: 'Re-wire',
      accessor: 'rewire',
      description: 'Re-wire',
      imageUrl: 'https://res.cloudinary.com/doyafbzya/image/upload/v1755057317/rewire_pqtvpd.jpg',
      constructionType: 'rough-construction',
      scopeOfWorkBase: null,
    },
  ],
  bathroomRemodel: [],
  kitchenRemodel: [],
  plumbing: [],
  addition: [],
  flooring: [],
  adu: [],
} as const satisfies Partial<Record<TradeAccessor, Omit<InsertScope, 'tradeId'>[]>>
