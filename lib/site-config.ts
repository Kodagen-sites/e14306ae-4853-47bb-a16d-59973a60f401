export const siteConfig = {
  brandName: "Apex Build Co.",
  tagline: "Built to specification. Delivered with intention.",
  metaDescription:
    "Apex Build Co. is a Vancouver, BC design-build firm. Residential condominiums, commercial mixed-use, and custom homes — built with architectural precision and patient craft.",
  siteUrl: "https://apexbuild.com",
  locale: "en_CA",

  contact: {
    email: "info@apexbuild.com",
    phone: "(416) 555-0100",
    location: "Vancouver, BC",
    address: "Vancouver, British Columbia, Canada",
  },

  socials: {
    instagram: "",
    linkedin: "",
  },

  // Manifest picks
  headerVariant: "split-edges" as const,
  footerVariant: "FT2" as const,
  cardVariant: "CV7" as const,
  heroOverlayVariant: "HO6" as const,
  heroTextPattern: "H3" as const,
  heroEntrance: "E2" as const,
  ctaVariant: "CTA1" as const,

  // Hero
  hero: {
    eyebrow: "Vancouver, BC — Design-Build",
    headline: [
      { text: "Built to ", weight: "light" },
      { text: "specification.", weight: "medium" },
    ],
    sub: "Designed with intention.",
    body:
      "We build residential condominiums, mixed-use developments, and custom homes with the precision of architects who know the trades. From foundation to final walkthrough — one team, one accountable line.",
    primaryCta: { label: "Start a Project", href: "/contact" },
    secondaryCta: { label: "See Our Work", href: "/work" },
  },

  // Services
  services: [
    {
      slug: "design-build",
      name: "Design-Build",
      description:
        "Architecture and construction under one accountable contract — concept through occupancy. Fewer hand-offs, tighter timelines, faithful execution of the architectural intent.",
      imageUrl: "/service-design-build.jpg",
    },
    {
      slug: "general-contracting",
      name: "General Contracting",
      description:
        "Coordinated delivery of multi-family residential and commercial projects in the Lower Mainland. Subcontractor management, schedule discipline, and on-site quality control end to end.",
      imageUrl: "/service-general-contracting.jpg",
    },
    {
      slug: "renovations-and-tenant-fit-out",
      name: "Renovations & Tenant Fit-Out",
      description:
        "Strata-approved interior renovations, condo customizations, and commercial tenant improvements — delivered with minimal disruption to existing occupants.",
      imageUrl: "/service-renovations.jpg",
    },
    {
      slug: "sustainable-green-building",
      name: "Sustainable / Green Building",
      description:
        "Passive House, Step Code 4, and LEED-aligned construction. Integrated envelope detailing, HRV-ready mechanical, and material selection that respects both budget and BC climate.",
      imageUrl: "/service-sustainable.jpg",
    },
    {
      slug: "concrete-and-structural",
      name: "Concrete & Structural",
      description:
        "Cast-in-place foundations, structural concrete, and architectural finishes. Board-form, polished, and exposed structural concrete delivered to the architect's drawings.",
      imageUrl: "/service-concrete.jpg",
    },
  ],

  // Gallery (Showcase section)
  gallery: [
    { src: "/section-gallery-1.jpg", alt: "Completed Vancouver mid-rise condominium at dusk" },
    { src: "/section-gallery-2.jpg", alt: "Modern condominium interior with mountain view" },
    { src: "/section-gallery-3.jpg", alt: "Multi-family residential entry portico" },
    { src: "/section-gallery-4.jpg", alt: "Custom home with cedar cladding at forest edge" },
  ],

  // Process
  process: {
    image: "/section-process.jpg",
    eyebrow: "How we build",
    headline: "Four phases. One accountable team.",
    steps: [
      {
        number: "01",
        title: "Pre-construction",
        body:
          "Constructability review of the architectural set, budget reconciliation against drawings, subcontractor scoping, and schedule modelling before a shovel hits the ground.",
      },
      {
        number: "02",
        title: "Permitting & procurement",
        body:
          "Vancouver building permit submission, trade tender packages, long-lead material procurement — sequenced so the schedule holds when site work begins.",
      },
      {
        number: "03",
        title: "Construction",
        body:
          "On-site superintendent every day. Weekly owner reports with photo documentation, schedule status, RFI log, and cost-to-complete projections.",
      },
      {
        number: "04",
        title: "Closeout & warranty",
        body:
          "Substantial completion punch list, deficiency resolution, two-year warranty review, and a full digital handover package — drawings, manuals, warranties, contacts.",
      },
    ],
  },

  // Stats
  stats: [
    { value: 18, suffix: "+", label: "Years building in BC" },
    { value: 240, suffix: "+", label: "Residential units delivered" },
    { value: 96, suffix: "%", label: "Projects on schedule" },
  ],

  // Footer
  footer: {
    variant: "FT2",
    ctaHeadline: "Start a project.",
    ctaSubheadline: "We're taking on selected residential and commercial work for 2026 completion.",
    brandStatement:
      "Apex Build Co. is a Vancouver, BC design-build firm. Architectural precision. Patient craft. Accountable delivery.",
    contactEmail: "info@apexbuild.com",
    contactPhone: "(416) 555-0100",
    address: "Vancouver, British Columbia",
    copyright: "© Apex Build Co.",
  },

  // SEO
  seo: {
    siteUrl: "https://apexbuild.com",
    ogImage: "/section-gallery-1.jpg",
    twitterHandle: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
