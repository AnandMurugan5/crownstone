const unsplash = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?q=85&w=${w}&auto=format&fit=crop`;

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#portfolio" },
  { label: "Our Process", href: "#process" },
  { label: "Contact Us", href: "#contact" },
];

export const CONTACT = {
  phone1Display: "+91 9751247799",
  phone1Tel: "tel:+919751247799",
  phone1Wa: "919751247799",
  phone2Display: "+91 7448669505",
  phone2Tel: "tel:+917448669505",
  phone2Wa: "917448669505",
  email: "groundstoneconstarction1@gmail.com",
  instagramHandle: "@crown_stone_constraction",
  instagramUrl: "https://www.instagram.com/crown_stone_constraction",
  whatsappMessage:
    "Hello Crown Stone Construction, I would like to inquire about a project.",
};

export const waLink = (number) =>
  `https://wa.me/${number}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

export const IMAGES = {
  hero: unsplash("photo-1613977257363-707ba9348227", 2200),
  aboutMain: unsplash("photo-1580587771525-78b9dba3b914", 1200),
  aboutSecondary: unsplash("photo-1706808849780-7a04fbac83ef", 800),
};

export const SERVICES = [
  {
    id: "construction-works",
    title: "Construction Works",
    description:
      "Complete residential and commercial construction solutions with quality materials, professional execution, and reliable project management.",
    image: unsplash("photo-1602757115429-b4190ae087be", 1200),
    span: "lg:col-span-7",
  },
  {
    id: "renovation-works",
    title: "Renovation Works",
    description:
      "Transform existing spaces through modern renovation, structural improvements, and aesthetic upgrades.",
    image: unsplash("photo-1527335988388-b40ee248d80c", 1000),
    span: "lg:col-span-5",
  },
  {
    id: "building-plan-approval",
    title: "Building Plan Approval",
    description:
      "Professional assistance with building plan preparation and approval processes.",
    image: unsplash("photo-1542621334-a254cf47733d", 1000),
    span: "lg:col-span-4",
  },
  {
    id: "2d-architectural-planning",
    title: "2D Architectural Planning",
    description:
      "Detailed 2D floor plans designed around functionality, space utilization, and client requirements.",
    image: unsplash("photo-1721244654394-36a7bc2da288", 1000),
    span: "lg:col-span-4",
  },
  {
    id: "3d-architectural-design",
    title: "3D Architectural Design",
    description:
      "Realistic 3D architectural visualizations that help clients experience their dream buildings before construction.",
    image: unsplash("photo-1717137389747-d1d4ced6abc8", 1000),
    span: "lg:col-span-4",
  },
  {
    id: "interior-designing",
    title: "Interior Designing",
    description:
      "Beautiful and functional interior spaces with modern layouts, premium finishes, and customized designs.",
    image: unsplash("photo-1648881806148-e5c51179c826", 1000),
    span: "lg:col-span-5",
  },
  {
    id: "exterior-designing",
    title: "Exterior Designing",
    description:
      "Contemporary exterior elevations and façade designs that enhance the appearance and value of buildings.",
    image: unsplash("photo-1527576539890-dfa815648363", 1200),
    span: "lg:col-span-7",
  },
];

export const WHY_US = [
  {
    icon: "BadgeCheck",
    title: "Experienced Engineering Founders",
    desc: "Led directly by qualified engineers who personally oversee every project from design to handover.",
  },
  {
    icon: "ShieldCheck",
    title: "Quality Construction Standards",
    desc: "Uncompromising material grades, structural testing and rigorous site quality checks at every stage.",
  },
  {
    icon: "DraftingCompass",
    title: "Innovative Architectural Designs",
    desc: "Contemporary designs shaped around climate, natural ventilation and timeless aesthetics.",
  },
  {
    icon: "Eye",
    title: "Transparent Project Execution",
    desc: "Clear scope, scheduled updates and honest costing — you always know where your project stands.",
  },
  {
    icon: "SlidersHorizontal",
    title: "Customized Design Solutions",
    desc: "Every floor plan, elevation and interior is tailored to your budget, lifestyle and requirements.",
  },
  {
    icon: "HeartHandshake",
    title: "Customer Satisfaction",
    desc: "A dedicated point of contact and dedicated support through completion and beyond.",
  },
];

export const PROJECT_CATEGORIES = [
  "All",
  "Residential Buildings",
  "Commercial Buildings",
  "Interior Design",
  "Exterior Design",
  "Renovation Projects",
  "2D & 3D Designs",
];

export const PROJECTS = [
  {
    id: "residence-01",
    title: "Contemporary Villa Elevation",
    category: "Residential Buildings",
    image: unsplash("photo-1613490493576-7fde63acd811", 1200),
    description:
      "A crisp modern villa composition with layered terraces, deep overhangs and a private pool deck.",
  },
  {
    id: "residence-02",
    title: "Twin Balcony Residence",
    category: "Residential Buildings",
    image: unsplash("photo-1721815693498-cc28507c0ba2", 1200),
    description:
      "A two-storey family residence designed around light, cross-ventilation and generous balcony living.",
  },
  {
    id: "residence-03",
    title: "Poolside Courtyard Home",
    category: "Residential Buildings",
    image: unsplash("photo-1706808849780-7a04fbac83ef", 1200),
    description:
      "Indoor-outdoor living with a central pool court, full-height glazing and warm material palette.",
  },
  {
    id: "commercial-01",
    title: "Urban Commercial Block",
    category: "Commercial Buildings",
    image: unsplash("photo-1496236436299-cde70e3587cf", 1200),
    description:
      "A restrained grey-toned commercial structure with rhythmic fenestration and efficient floor plates.",
  },
  {
    id: "commercial-02",
    title: "Corporate Campus Structure",
    category: "Commercial Buildings",
    image: unsplash("photo-1614595737476-42487331b8a1", 1200),
    description:
      "Workplace architecture balancing daylight, shading devices and a strong street presence.",
  },
  {
    id: "interior-01",
    title: "Deluxe Living Interior",
    category: "Interior Design",
    image: unsplash("photo-1704040686413-2c607dbd2f06", 1200),
    description:
      "A warm, layered living room with statement lighting, rich panelling and bespoke furniture.",
  },
  {
    id: "interior-02",
    title: "Modern Lounge Concept",
    category: "Interior Design",
    image: unsplash("photo-1646987916641-1f3c8992daa2", 1200),
    description:
      "Sculptural lighting and a muted palette come together in this premium lounge interior concept.",
  },
  {
    id: "exterior-01",
    title: "Sculpted Facade Study",
    category: "Exterior Design",
    image: unsplash("photo-1691425700573-5e2e6e4f6157", 1200),
    description:
      "A facade study exploring balconies, shadow lines and texture for a premium residential street edge.",
  },
  {
    id: "exterior-02",
    title: "Minimal White Elevation",
    category: "Exterior Design",
    image: unsplash("photo-1549791084-5f78368b208b", 1200),
    description:
      "Clean volumes and precise proportions define this minimal white elevation design.",
  },
  {
    id: "renovation-01",
    title: "Structural Renovation Works",
    category: "Renovation Projects",
    image: unsplash("photo-1609867271967-a82f85c48531", 1200),
    description:
      "Structural strengthening and modernisation of an existing building, executed on site by our team.",
  },
  {
    id: "renovation-02",
    title: "Facade Revamp Execution",
    category: "Renovation Projects",
    image: unsplash("photo-1599707254554-027aeb4deacd", 1200),
    description:
      "An aging structure reimagined with a refreshed envelope, improved layout and modern services.",
  },
  {
    id: "design-01",
    title: "Detailed Floor Plan Drafting",
    category: "2D & 3D Designs",
    image: unsplash("photo-1721244654392-9c912a6eb236", 1200),
    description:
      "Precision 2D drafting covering layouts, dimensions and structural coordination for approvals.",
  },
  {
    id: "design-02",
    title: "3D Visualization Concept",
    category: "2D & 3D Designs",
    image: unsplash("photo-1786550860329-f813516e9705", 1200),
    description:
      "Photorealistic planning views that let clients experience spaces before construction begins.",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Initial Consultation",
    desc: "Understanding client aspirations, site dimensions, budget parameters and design scope.",
  },
  {
    step: "02",
    title: "Site Visit & Requirement Analysis",
    desc: "Comprehensive site inspection, topography study and local authority guideline checks.",
  },
  {
    step: "03",
    title: "Planning & 2D Design",
    desc: "Drafting optimal floor plans, spatial layouts and detailed working drawings.",
  },
  {
    step: "04",
    title: "3D Visualization",
    desc: "Photorealistic 3D elevations and interior renders for complete visual sign-off.",
  },
  {
    step: "05",
    title: "Approval & Documentation",
    desc: "Sanction drawings, government approvals, structural reports and bill of quantities.",
  },
  {
    step: "06",
    title: "Construction & Execution",
    desc: "Structural execution, masonry, finishing and quality checks with scheduled site updates.",
  },
  {
    step: "07",
    title: "Final Handover",
    desc: "Final touch-ups, deep cleaning and key handover with structural warranty documentation.",
  },
];

export const FOUNDER_PROFILES = [
  {
    name: "Er. S. Suriya Raj",
    initials: "SR",
    role: "Co-Founder & Director — Engineering & Execution",
  },
  {
    name: "Er. K. Hariprasath",
    initials: "HP",
    role: "Co-Founder & Director — Architecture & Design",
  },
];

export const MARQUEE_ITEMS = [
  "Building Dreams",
  "Creating Landmarks",
  "Luxury Residential Villas",
  "2D & 3D Architectural Planning",
  "Turnkey Construction",
  "Crown Stone Construction",
  "Tamil Nadu, India",
];

export const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => s.title),
  "Other",
];
