export const DISCIPLINES = [
  {
    id: "all",
    code: "ALL",
    number: "00",
    name: "All Disciplines",
    shortName: "All",
    desc: "Complete spectrum of 27 structural engineering and diagnostic capabilities.",
    count: 27
  },
  {
    id: "audit",
    code: "AUD",
    number: "01",
    name: "Structural Audit & Certification",
    shortName: "Audit",
    desc: "Thorough structural assessment, stability verification, and compliance certification.",
    count: 3
  },
  {
    id: "ndt",
    code: "NDT",
    number: "02",
    name: "Non-Destructive Testing (NDT)",
    shortName: "Testing (NDT)",
    desc: "Advanced testing methods that diagnose structural health without causing damage.",
    count: 12
  },
  {
    id: "design",
    code: "DES",
    number: "03",
    name: "Design & Detailing",
    shortName: "Design",
    desc: "Structural engineering design, computational analysis, and detailed fabrication drawings.",
    count: 4
  },
  {
    id: "infra",
    code: "INF",
    number: "04",
    name: "Infrastructure & Heavy Civil",
    shortName: "Infrastructure",
    desc: "Engineering solutions for large-scale infrastructure, tunnels, highways, and industrial facilities.",
    count: 4
  },
  {
    id: "repair",
    code: "REP",
    number: "05",
    name: "Repair & Strengthening Consultancy",
    shortName: "Rehabilitation",
    desc: "Expert consultancy for structural restoration, retrofit engineering, and life extension.",
    count: 4
  }
];

export const SERVICES = [
  // --- 01. AUDIT & CERTIFICATION ---
  {
    id: "structural-audit",
    code: "AUD-01",
    disciplineId: "audit",
    disciplineName: "Structural Audit & Certification",
    subGroup: "Statutory & Health Audit",
    title: "Structural audit",
    shortDesc: "A full evaluation of structural health: visual inspection, material testing and load-carrying capacity, to determine adequacy and safety.",
    fullDesc: "Comprehensive baseline inspection and forensic structural evaluation conforming to municipal bylaws and NBC standards. Combines visual distress mapping, non-destructive screening, and structural capacity recalculations to determine residual service life and safety factors.",
    standard: "NBC 2016 / IS 456:2000 / Municipal Corporation Guidelines",
    keyDeliverables: [
      "Distress mapping & defect photo documentation",
      "Structural adequacy & load calculation summary",
      "Immediate vs long-term recommendation matrix",
      "Graded risk classification report"
    ],
    typicalApplications: "Aging commercial complexes, high-rise residential societies, pre-monsoon industrial audits",
    turnaround: "5-7 business days"
  },
  {
    id: "stability-certificate",
    code: "AUD-02",
    disciplineId: "audit",
    disciplineName: "Structural Audit & Certification",
    subGroup: "Statutory & Health Audit",
    title: "Stability certificate",
    shortDesc: "Official stability certification as per industry standards, confirming a building is sound for occupancy and continued use.",
    fullDesc: "Formally registered structural soundness certification signed by authorized Chartered Structural Engineers. Validates structural stability against dead, live, seismic, and wind loads for statutory licensing, factory inspectorate renewals, and tenant occupancy clearances.",
    standard: "The Factories Act 1948 / State DCR / IS 1893 (Part 1)",
    keyDeliverables: [
      "Statutory Form 1A / Form 2 Certificate",
      "Seismic and wind load compliance sign-off",
      "Occupancy & load-rating limitation schedule"
    ],
    typicalApplications: "Industrial manufacturing plants, educational institutions, commercial towers, factory license renewal",
    turnaround: "3-5 business days"
  },
  {
    id: "estimation-and-costing",
    code: "AUD-03",
    disciplineId: "audit",
    disciplineName: "Structural Audit & Certification",
    subGroup: "Cost & Quantity Surveying",
    title: "Estimation and costing",
    shortDesc: "Accurate cost estimates for repair, strengthening and rehabilitation, based on detailed assessment and a bill of quantities.",
    fullDesc: "Detailed structural quantity surveying and financial forecasting for retrofit interventions. Integrates material specifications, labor work rates, specialized equipment logistics, and contingency modeling into a rock-solid tender-ready bill of quantities (BOQ).",
    standard: "CPWD / DSR / Standard Method of Measurement (SMM)",
    keyDeliverables: [
      "Itemized Bill of Quantities (BOQ)",
      "Technical specifications for tender execution",
      "Phase-wise cashflow and resource projection"
    ],
    typicalApplications: "Societal rehabilitation budgets, CAPEX allocation for industrial retrofits, insurance claims",
    turnaround: "4-6 business days"
  },

  // --- 02. NDT TESTING (12 SERVICES) ---
  // Subgroup: RCC Structures (6)
  {
    id: "rebar-scanning",
    code: "NDT-01",
    disciplineId: "ndt",
    disciplineName: "Non-Destructive Testing (NDT)",
    subGroup: "On RCC structures",
    title: "Rebar scanning",
    shortDesc: "Detects and maps reinforcement in concrete to verify cover depth, bar diameter and spacing.",
    fullDesc: "High-resolution electromagnetic and pulse-induction scanning of concrete members. Accurately determines reinforcement grid configuration, bar diameters, concrete clear cover, and identifies voids or conduit interference prior to coring or structural modifications.",
    standard: "BS 1881: Part 204 / ACI 228.2R",
    keyDeliverables: [
      "2D/3D subsurface reinforcement layout map",
      "Clear cover depth statistical histogram",
      "Core drilling clearance zone markups"
    ],
    typicalApplications: "Slab retrofits, post-tensioned tendon mapping, verification against architectural drawings",
    turnaround: "24-48 hours"
  },
  {
    id: "rebound-hammer-test",
    code: "NDT-02",
    disciplineId: "ndt",
    disciplineName: "Non-Destructive Testing (NDT)",
    subGroup: "On RCC structures",
    title: "Rebound hammer test",
    shortDesc: "Estimates in-situ compressive strength by measuring surface hardness rebound values.",
    fullDesc: "Calibrated Schmidt rebound hammer testing (Type N) across designated structural elements. Provides instant comparative indices of surface concrete hardness and uniform compressive strength estimations across columns, beams, and sheer walls.",
    standard: "IS 13311 (Part 2):1992 / ASTM C805 / BS EN 12504-2",
    keyDeliverables: [
      "Rebound index distribution tables",
      "Estimated in-situ compressive strength (MPa)",
      "Surface quality comparative grading"
    ],
    typicalApplications: "Quality assurance in newly cast structures, preliminary structural health surveys, fire-damage assessment",
    turnaround: "24 hours"
  },
  {
    id: "ultrasonic-pulse-velocity-test",
    code: "NDT-03",
    disciplineId: "ndt",
    disciplineName: "Non-Destructive Testing (NDT)",
    subGroup: "On RCC structures",
    title: "Ultrasonic pulse velocity test",
    shortDesc: "Evaluates concrete quality and homogeneity and detects internal flaws using ultrasonic waves.",
    fullDesc: "Electro-acoustic transducer wave transmission through concrete sections (direct, semi-direct, and indirect profiling). Measures transit time to evaluate concrete homogeneity, detect internal honeycombing, voids, micro-cracks, and estimate dynamic modulus of elasticity.",
    standard: "IS 13311 (Part 1):1992 / ASTM C597 / BS EN 12504-4",
    keyDeliverables: [
      "Pulse velocity maps (km/sec) and quality grading",
      "Void and discontinuity depth estimation",
      "Internal concrete integrity contour charts"
    ],
    typicalApplications: "Heavy foundation pads, bridge piers, pre-cast beam verification, forensic defect tracing",
    turnaround: "24-48 hours"
  },
  {
    id: "carbonation-depth-test",
    code: "NDT-04",
    disciplineId: "ndt",
    disciplineName: "Non-Destructive Testing (NDT)",
    subGroup: "On RCC structures",
    title: "Carbonation depth test",
    shortDesc: "Measures the carbonation front to assess vulnerability to reinforcement corrosion.",
    fullDesc: "Chemical indicator testing using 1% phenolphthalein solution on freshly exposed concrete surfaces. Quantifies atmospheric carbon dioxide penetration and pH reduction (below 9.0), establishing the residual protective buffer over embedded steel reinforcement.",
    standard: "BS EN 14630 / RILEM CPC-18",
    keyDeliverables: [
      "Front depth measurements (mm) across tested cores",
      "Corrosion depassivation risk forecast",
      "Protective coating lifecycle recommendation"
    ],
    typicalApplications: "Coastal buildings, industrial environments with heavy exhaust, structures older than 15 years",
    turnaround: "24-48 hours"
  },
  {
    id: "concrete-core-test",
    code: "NDT-05",
    disciplineId: "ndt",
    disciplineName: "Non-Destructive Testing (NDT)",
    subGroup: "On RCC structures",
    title: "Concrete core test",
    shortDesc: "Extracts cores for laboratory testing and accurate compressive strength.",
    fullDesc: "Precision diamond core extraction (typically 75mm - 100mm dia) followed by laboratory end-dressing, density measurement, and crushing under a calibrated universal testing machine (UTM). Provides the definitive legal and engineering benchmark for in-situ strength.",
    standard: "IS 516:1959 / IS 1199 / ASTM C42 / BS EN 12504-1",
    keyDeliverables: [
      "Corrected cylinder compressive strength results",
      "Equivalent cube strength certifications",
      "Visual core morphology and aggregate distribution photo analysis"
    ],
    typicalApplications: "Court dispute resolution, low cube failure investigations, structural capacity re-rating",
    turnaround: "3-5 business days"
  },
  {
    id: "half-cell-potential-test",
    code: "NDT-06",
    disciplineId: "ndt",
    disciplineName: "Non-Destructive Testing (NDT)",
    subGroup: "On RCC structures",
    title: "Half-cell potential test",
    shortDesc: "Assesses the probability of rebar corrosion through electrochemical potential.",
    fullDesc: "Electrochemical mapping using a high-impedance voltmeter and copper/copper-sulfate (Cu/CuSO4) reference electrode. Measures electrical potential fields across the concrete surface to locate active corrosion hot-spots before concrete spalling or delamination occurs.",
    standard: "ASTM C876-15 / RILEM TC 154-EMC",
    keyDeliverables: [
      "Equipotential contour corrosion maps",
      "Corrosion risk probability distribution (>90%, 50%, <10%)",
      "Cathodic protection / sacrificial anode requirements"
    ],
    typicalApplications: "Bridges, parking decks, marine wharves, water treatment tanks",
    turnaround: "48 hours"
  },

  // Subgroup: Steel Members (5)
  {
    id: "ultrasonic-thickness-gauge-test",
    code: "NDT-07",
    disciplineId: "ndt",
    disciplineName: "Non-Destructive Testing (NDT)",
    subGroup: "On steel members",
    title: "Ultrasonic thickness gauge test",
    shortDesc: "Precisely measures member thickness to detect corrosion loss.",
    fullDesc: "High-frequency ultrasonic pulse-echo measurement through protective coatings. Accurately determines remaining wall and flange thickness of structural steelwork, storage tanks, and pipes without interrupting active production operations.",
    standard: "ASTM E797 / BS EN ISO 16809",
    keyDeliverables: [
      "Precision thickness data grid (0.01mm resolution)",
      "Corrosion rate & section loss percentage report",
      "Residual load capacity reduction factor"
    ],
    typicalApplications: "Industrial pipe racks, steel silos, pressure vessels, offshore platforms",
    turnaround: "24 hours"
  },
  {
    id: "dye-and-liquid-penetration-test",
    code: "NDT-08",
    disciplineId: "ndt",
    disciplineName: "Non-Destructive Testing (NDT)",
    subGroup: "On steel members",
    title: "Dye and liquid penetration test",
    shortDesc: "Detects surface cracks and discontinuities in steel weldments.",
    fullDesc: "Capillary action solvent-removable dye penetrant inspection across critical structural weld seams and heat-affected zones. Reveals micro-fissures, porosity, cold laps, and surface fatigue cracks invisible to the naked human eye.",
    standard: "ASME Sec V Art 6 / ASTM E165 / IS 3658",
    keyDeliverables: [
      "Visual photographic evidence of bleed-out indications",
      "Weld defect classification & sizing (linear vs rounded)",
      "Weld acceptance / rejection certification per code"
    ],
    typicalApplications: "Crane gantry girders, seismic bracing connections, fabrication shop sign-offs",
    turnaround: "Same day / 24 hours"
  },
  {
    id: "flaw-detection-test",
    code: "NDT-09",
    disciplineId: "ndt",
    disciplineName: "Non-Destructive Testing (NDT)",
    subGroup: "On steel members",
    title: "Flaw detection test",
    shortDesc: "Identifies internal and surface flaws in structural steel members.",
    fullDesc: "Ultrasonic A-scan / phased array flaw examination using angle-beam transducers. Detects internal volumetric and planar discontinuities such as lack of fusion, slag inclusions, internal laminations, and root cracks deep within structural steel plates and heavy weldments.",
    standard: "AWS D1.1 / ASME Sec V Art 4 / BS EN ISO 17640",
    keyDeliverables: [
      "Flaw echo waveform echograms & depth calculations",
      "Defect volumetric mapping and severity rating",
      "Weld repair protocol sheet"
    ],
    typicalApplications: "Bridge truss joints, high-rise moment connections, heavy portal frames",
    turnaround: "24-48 hours"
  },
  {
    id: "vibration-meter-test",
    code: "NDT-10",
    disciplineId: "ndt",
    disciplineName: "Non-Destructive Testing (NDT)",
    subGroup: "On steel members",
    title: "Vibration meter test",
    shortDesc: "Measures and analyses structural vibrations for dynamic assessment.",
    fullDesc: "Tri-axial accelerometer dynamic sensing measuring velocity, displacement, and acceleration spectra. Evaluates structural resonance frequencies, machine-induced harmonic excitation, and human comfort criteria under operational conditions.",
    standard: "ISO 2631 / ISO 10816 / DIN 4150-3",
    keyDeliverables: [
      "Time-domain and FFT frequency spectrum charts",
      "Natural frequency (eigenmode) identification",
      "Damping ratio & vibration mitigation recommendations"
    ],
    typicalApplications: "Heavy turbine foundations, industrial vibrating screens, pedestrian footbridges",
    turnaround: "48 hours"
  },
  {
    id: "magnetic-particle-test",
    code: "NDT-11",
    disciplineId: "ndt",
    disciplineName: "Non-Destructive Testing (NDT)",
    subGroup: "On steel members",
    title: "Magnetic particle test",
    shortDesc: "Detects surface and near-surface defects in ferromagnetic materials.",
    fullDesc: "Electromagnetic yoke flux leakage inspection using fluorescent or black magnetic particulate ink under white or ultraviolet light. Detects tight fatigue cracks, seam tears, and sub-surface weld flaws in ferromagnetic steel assemblies.",
    standard: "ASTM E709 / ASME Sec V Art 7 / IS 3703",
    keyDeliverables: [
      "Magnetic flux leakage indication maps",
      "Defect location, orientation, and length logs",
      "Certified NDT Level II sign-off report"
    ],
    typicalApplications: "Industrial crane hooks, lifting lugs, heavy equipment chassis, bolted joint plates",
    turnaround: "Same day / 24 hours"
  },

  // Subgroup: Road and Paving Surfaces (1)
  {
    id: "skid-resistance-test",
    code: "NDT-12",
    disciplineId: "ndt",
    disciplineName: "Non-Destructive Testing (NDT)",
    subGroup: "On road and paving surfaces",
    title: "Skid resistance test",
    shortDesc: "Measures pavement surface friction for road safety assessment and compliance.",
    fullDesc: "Standard British Pendulum Tester (BPT) micro-texture friction evaluation on wet and dry pavement surfaces. Calculates British Pendulum Number (BPN) to assess skid safety, micro-texture degradation, and aquaplaning risks under vehicular traffic.",
    standard: "ASTM E303 / BS EN 13036-4 / IRC SP 18",
    keyDeliverables: [
      "BPN frictional value reports across chainages",
      "Safety classification vs statutory highway thresholds",
      "Pavement grooving or resurfacing recommendations"
    ],
    typicalApplications: "Expressway curves, airport runways, industrial factory vehicular aprons, bridge decks",
    turnaround: "24-48 hours"
  },

  // --- 03. DESIGN & DETAILING (4 SERVICES) ---
  {
    id: "peb-structures",
    code: "DES-01",
    disciplineId: "design",
    disciplineName: "Design & Detailing",
    subGroup: "Engineered Superstructures",
    title: "PEB structures",
    shortDesc: "Pre-engineered building design and detailing for industrial and commercial use, with optimised material and fast erection.",
    fullDesc: "Comprehensive computational design of Pre-Engineered Steel Buildings (PEB) optimizing tapered built-up sections, cold-formed Z & C purlins, and crane girder support systems. Engineered for minimum steel tonnage, maximum clear spans, and rapid site erection.",
    standard: "MBMA 2012 / AISC 360 / IS 800:2007",
    keyDeliverables: [
      "Complete 3D structural analysis models (STAAD / ETABS)",
      "Anchor bolt layout & foundation reaction schedules",
      "Primary frame & secondary framing fabrication packages",
      "Bill of Materials (BOM) with tonnage breakdown"
    ],
    typicalApplications: "Warehouses, manufacturing plants, aircraft hangars, commercial logistics hubs",
    turnaround: "10-14 business days"
  },
  {
    id: "steel-structures",
    code: "DES-02",
    disciplineId: "design",
    disciplineName: "Design & Detailing",
    subGroup: "Engineered Superstructures",
    title: "Steel structures",
    shortDesc: "Complete steel design, analysis and connection detailing for buildings, industrial structures and special facilities.",
    fullDesc: "Advanced structural steel engineering for multi-tier industrial frames, pipe conveyor corridors, and commercial architectural structures. Includes nonlinear finite-element connection design for high-strength friction grip (HSFG) bolts and complete seismic force resistance.",
    standard: "IS 800:2007 / AISC 360-16 / Eurocode 3",
    keyDeliverables: [
      "Design calculation reports with wind/seismic derivations",
      "Connection design sheets (bolted/welded moment splices)",
      "General arrangement (GA) engineering drawings",
      "Tekla Structures / 3D detailing models"
    ],
    typicalApplications: "Heavy process plants, conveyor galleries, stadium roofs, multi-story steel towers",
    turnaround: "14-21 business days"
  },
  {
    id: "rcc-structures",
    code: "DES-03",
    disciplineId: "design",
    disciplineName: "Design & Detailing",
    subGroup: "Engineered Superstructures",
    title: "RCC structures",
    shortDesc: "Reinforced concrete design for residential, commercial and industrial buildings, with code-compliant analysis and detailing.",
    fullDesc: "End-to-end reinforced concrete design including raft/pile foundations, ductile moment-resisting frames, shear core walls, and post-tensioned flat slabs. Conforms stringently to ductile seismic detailing criteria for maximum life safety.",
    standard: "IS 456:2000 / IS 13920:2016 (Ductile Detailing) / ACI 318",
    keyDeliverables: [
      "Full structural analysis package with P-Delta calculations",
      "Bar Bending Schedules (BBS) for all structural members",
      "Detailed reinforcement drawings with clash-free sections",
      "Proof-consultancy endorsement certificates"
    ],
    typicalApplications: "High-rise residential complexes, commercial IT parks, hospital infrastructure",
    turnaround: "14-28 business days"
  },
  {
    id: "erection-and-shop-ticket-drawings",
    code: "DES-04",
    disciplineId: "design",
    disciplineName: "Design & Detailing",
    subGroup: "Shop Detailing & BIM",
    title: "Erection and shop ticket drawings",
    shortDesc: "Fabrication and erection drawings for precast members, columns, spandrels, double T sections, shear walls and hollow core.",
    fullDesc: "Production-ready fabrication shop tickets and field erection sequencing drawings for precast concrete and structural steel elements. Incorporates lifting insert engineering, center-of-gravity calculations, transport limit states, and connection hardware schedules.",
    standard: "PCI Design Handbook / AISC Detailing Manual / BS 8666",
    keyDeliverables: [
      "Individual piece shop ticket drawings with 3D views",
      "Erection sequence plans with crane radius clearances",
      "Hardware, embedment, and shimming detail sheets",
      "CNC / DXF data files for automated fabrication"
    ],
    typicalApplications: "Precast multi-level parking structures, modular housing, precast bridges, industrial facades",
    turnaround: "7-10 business days"
  },

  // --- 04. INFRASTRUCTURE & HEAVY CIVIL (4 SERVICES) ---
  {
    id: "tunnels",
    code: "INF-01",
    disciplineId: "infra",
    disciplineName: "Infrastructure & Heavy Civil",
    subGroup: "Civil Mega-Infrastructure",
    title: "Tunnels",
    shortDesc: "Lining design, portal structures and condition assessment of existing tunnels.",
    fullDesc: "Specialized geotechnical and underground structural engineering encompassing primary rock support (shotcrete & rock bolts), precast segment linings, cut-and-cover portal structures, and comprehensive distress condition audits of operational tunnels.",
    standard: "ITA Guidelines / IRC SP 91 / ACI 544 (Fiber Reinforced)",
    keyDeliverables: [
      "Tunnel cross-section structural calculation dossiers",
      "Segmental lining joint & waterproofing detail plans",
      "In-situ convergence and lining crack audit reports"
    ],
    typicalApplications: "Metro rail transit corridors, highway mountain passes, hydroelectric water conductor tunnels",
    turnaround: "15-30 business days"
  },
  {
    id: "roads-and-highways",
    code: "INF-02",
    disciplineId: "infra",
    disciplineName: "Infrastructure & Heavy Civil",
    subGroup: "Civil Mega-Infrastructure",
    title: "Roads and highways",
    shortDesc: "Bridges, culverts, retaining walls and pavement assessment for road infrastructure.",
    fullDesc: "Structural design and rehabilitation engineering for highway assets: RCC box culverts, composite girder bridges, reinforced earth (RE) walls, slope stability soil-nailing systems, and automated pavement condition index (PCI) structural surveys.",
    standard: "IRC 5 / IRC 6 (Loads & Stresses) / IRC 112 (Concrete Bridges)",
    keyDeliverables: [
      "Bridge superstructure & substructure design packages",
      "Retaining wall stability & global slip circle calculations",
      "Pavement rehabilitation and overlay design sheets"
    ],
    typicalApplications: "State and national highway upgrades, arterial bypasses, flyover approaches",
    turnaround: "14-21 business days"
  },
  {
    id: "industrial-structures",
    code: "INF-03",
    disciplineId: "infra",
    disciplineName: "Infrastructure & Heavy Civil",
    subGroup: "Civil Mega-Infrastructure",
    title: "Industrial structures",
    shortDesc: "Design and assessment of power plants, silos, cooling towers, chimneys and other specialised facilities.",
    fullDesc: "Heavy civil engineering for critical industrial installations subjected to extreme thermal gradients, dynamic vibration, and corrosive chemicals. Encompasses post-tensioned silos, natural draft cooling towers, tall RCC chimneys, and heavy machine foundations.",
    standard: "IS 4998 (Chimneys) / IS 4995 (Silos) / ACI 307 / DIN 1056",
    keyDeliverables: [
      "Dynamic response spectra and thermal stress calculations",
      "Foundation interaction analysis with elastic soil springs",
      "Specialized protective lining & coating specifications"
    ],
    typicalApplications: "Thermal & nuclear power plants, cement manufacturing complexes, grain storage silos",
    turnaround: "21-35 business days"
  },
  {
    id: "as-built-drawings",
    code: "INF-04",
    disciplineId: "infra",
    disciplineName: "Infrastructure & Heavy Civil",
    subGroup: "Civil Mega-Infrastructure",
    title: "As-built drawings",
    shortDesc: "Precise documentation of residential, commercial, industrial and infrastructure projects, using advanced surveying instruments.",
    fullDesc: "High-precision physical asset documentation employing total stations, terrestrial 3D LiDAR point-cloud scanners, and ultrasonic verification. Translates aging physical assets with missing archives into authoritative 2D CAD and 3D BIM digital twins.",
    standard: "ISO 19650 (BIM) / RICS Geomatics Standards",
    keyDeliverables: [
      "Verified CAD architectural & structural as-built sets",
      "Revit / IFC 3D digital twin models (LOD 300-400)",
      "Dimensional deviation & verticality tolerance logs"
    ],
    typicalApplications: "Heritage structure restoration, brownfield industrial expansions, municipal compliance filings",
    turnaround: "5-10 business days"
  },

  // --- 05. REPAIR & STRENGTHENING (4 SERVICES) ---
  {
    id: "repair-methodology",
    code: "REP-01",
    disciplineId: "repair",
    disciplineName: "Repair & Strengthening Consultancy",
    subGroup: "Structural Rehabilitation",
    title: "Repair methodology",
    shortDesc: "Detailed repair methods built on structural assessment and material test results.",
    fullDesc: "Bespoke forensic repair specifications tailored directly to verified failure mechanisms. Defines surface preparation parameters, polymer-modified mortars, micro-concrete gravity grouting, and anti-corrosive galvanic protection systems.",
    standard: "ICRI Technical Guidelines / EN 1504 (Concrete Repair)",
    keyDeliverables: [
      "Step-by-step Contractor Execution Manual",
      "Approved material technical data sheet (TDS) schedules",
      "Critical quality control inspection checkpoints"
    ],
    typicalApplications: "Severe reinforcement corrosion, honeycombed casting faults, seismic cracking repairs",
    turnaround: "5-7 business days"
  },
  {
    id: "strengthening-design",
    code: "REP-02",
    disciplineId: "repair",
    disciplineName: "Repair & Strengthening Consultancy",
    subGroup: "Structural Rehabilitation",
    title: "Strengthening design",
    shortDesc: "Carbon fibre wrapping, steel plate bonding and concrete jacketing designed to restore capacity.",
    fullDesc: "Advanced structural capacity enhancement engineering for columns, beams, and slabs subjected to load increases or structural distress. Calculates design laminates for Carbon Fiber Reinforced Polymer (CFRP), external post-tensioning, steel flitch plates, and RC jackets.",
    standard: "ACI 440.2R (FRP Systems) / IS 15988 / Eurocode 8 Part 3",
    keyDeliverables: [
      "Composite structural recalculations (bending & shear gain)",
      "Layer-by-layer CFRP/GFRP wrap layout plans",
      "Steel jacketing anchor bolt & shear key connection details"
    ],
    typicalApplications: "Adaptive building reuse, addition of new floors, column load upgrades, bridge girder strengthening",
    turnaround: "7-12 business days"
  },
  {
    id: "rehabilitation-planning",
    code: "REP-03",
    disciplineId: "repair",
    disciplineName: "Repair & Strengthening Consultancy",
    subGroup: "Structural Rehabilitation",
    title: "Rehabilitation planning",
    shortDesc: "Plans that extend the service life of ageing structures while keeping safety standards.",
    fullDesc: "Strategic structural asset lifecycle management. Formulates multi-phase intervention timelines, propping/shoring temporary load-support schemes, safety containment protocols, and budget prioritization ensuring building operations continue during execution.",
    standard: "ISO 13822 (Assessment of Existing Structures) / ACI 562",
    keyDeliverables: [
      "Phase-wise propping and shoring structural schematics",
      "Occupant safety & site logistics management plan",
      "Service life extension projection model (10-30 years)"
    ],
    typicalApplications: "Occupied residential towers, operational hospital wings, active industrial manufacturing floors",
    turnaround: "7-14 business days"
  },
  {
    id: "quality-assurance",
    code: "REP-04",
    disciplineId: "repair",
    disciplineName: "Repair & Strengthening Consultancy",
    subGroup: "Structural Rehabilitation",
    title: "Quality assurance",
    shortDesc: "Third-party inspection during repair and strengthening, to confirm compliance with specifications.",
    fullDesc: "Independent third-party engineering supervision during active retrofit execution. Validates substrate moisture, pull-off adhesion tensile testing (ASTM D4541), grout cube crushing tests, and composite cure integrity to guarantee compliance with engineering designs.",
    standard: "ISO 9001:2015 / ICRI 210.3 / ASTM D7522",
    keyDeliverables: [
      "Milestone site inspection logs & non-conformance reports",
      "Material batch test verification certificates",
      "Final Engineering Completion & Warranty Endorsement"
    ],
    typicalApplications: "High-value societal rehabilitation contracts, government infrastructure retrofits, corporate CAPEX works",
    turnaround: "Continuous site milestone deployment"
  }
];

export const HOW_WE_WORK_STEPS = [
  {
    step: "01",
    phase: "In-Situ Investigation",
    title: "Physical & Empirical Diagnostics",
    desc: "We deploy calibrated digital instrumentation to measure real-world conditions rather than relying on architectural assumptions.",
    subItems: [
      "High-density ultrasonic & electromagnetic rebar mapping",
      "Chemical depth analysis and core extraction",
      "Photographic distress logging and crack width measurement"
    ]
  },
  {
    step: "02",
    phase: "Computational Modeling",
    title: "Finite Element & Code Analysis",
    desc: "Field telemetry feeds directly into nonlinear 3D structural analysis models to simulate stress distribution under dead, live, wind, and seismic forces.",
    subItems: [
      "P-Delta & modal response spectrum simulations",
      "Comparison against IS 456, IS 1893, and international codes",
      "Residual capacity and margin-of-safety calculations"
    ]
  },
  {
    step: "03",
    phase: "Engineering Deliverables",
    title: "Tender-Ready Detail Packages",
    desc: "From millimetric fabrication shop tickets to CFRP laminate layouts, we deliver actionable engineering drawings ready for zero-defect execution.",
    subItems: [
      "Bar Bending Schedules (BBS) and structural GA drawings",
      "Defect-specific repair methodologies and material specs",
      "Itemized Bill of Quantities (BOQ) with market rate estimates"
    ]
  },
  {
    step: "04",
    phase: "Accountability & QA",
    title: "Statutory Sign-Off & Third-Party QA",
    desc: "We stand behind the work with registered Chartered Structural Engineer certifications and active on-site verification testing.",
    subItems: [
      "Municipal and Factory Inspectorate stability certificates",
      "Pull-off tensile adhesion testing on retrofitted carbon wraps",
      "Final certified structural fitness sign-off"
    ]
  }
];

export const CORE_VALUES = [
  {
    title: "Integrity over impression",
    desc: "Our reports, designs and audits state facts, not formalities. If a structure requires urgent intervention, we say so with mathematical clarity.",
    code: "PRINCIPLE 01"
  },
  {
    title: "Data-driven decisions",
    desc: "From ultrasonic wave velocities to finite-element stress models, every recommendation is backed by verifiable engineering logic.",
    code: "PRINCIPLE 02"
  },
  {
    title: "As-built accuracy",
    desc: "Advanced surveying instruments, total stations, and digital calipers ensure every drawing matches the exact physical reality on site.",
    code: "PRINCIPLE 03"
  }
];

