export type ServiceId =
  | "ai"
  | "web"
  | "mobile"
  | "telegram"
  | "erp_crm"
  | "automation"
  | "systemization"
  | "integration";

export type IndustryKey =
  | "trade"
  | "manufacturing"
  | "restaurant"
  | "pharmacy"
  | "education"
  | "clinics"
  | "logistics"
  | "construction"
  | "ecommerce"
  | "services";

export type PackageKey = "start" | "business" | "ai_business" | "enterprise";

export interface ServiceDefinition {
  readonly id: ServiceId;
  readonly num: string;
  readonly slug: string;
  readonly techTags: readonly string[];
  readonly industries: readonly IndustryKey[];
  readonly related: readonly string[];
}

export const SERVICES: readonly ServiceDefinition[] = [
  {
    id: "ai",
    num: "01",
    slug: "ai-sun-iy-intellekt",
    techTags: ["AI Agent", "Voice · Docs", "API"],
    industries: ["trade", "pharmacy", "clinics", "ecommerce", "education", "services"],
    related: ["erp-crm", "telegram-bot-development", "business-automation"],
  },
  {
    id: "web",
    num: "02",
    slug: "web-development",
    techTags: ["SaaS", "Portal", "E-commerce"],
    industries: ["ecommerce", "services", "education", "clinics", "restaurant", "trade"],
    related: ["mobile-app-development", "erp-crm", "it-integration"],
  },
  {
    id: "mobile",
    num: "03",
    slug: "mobile-app-development",
    techTags: ["iOS", "Android", "Fintech"],
    industries: ["ecommerce", "logistics", "education", "restaurant", "services", "trade"],
    related: ["web-development", "telegram-bot-development", "it-integration"],
  },
  {
    id: "telegram",
    num: "04",
    slug: "telegram-bot-development",
    techTags: ["Bot API", "Pay", "CRM Sync"],
    industries: ["restaurant", "ecommerce", "education", "trade", "services", "clinics"],
    related: ["ai-sun-iy-intellekt", "erp-crm", "business-automation"],
  },
  {
    id: "erp_crm",
    num: "05",
    slug: "erp-crm",
    techTags: ["ERP", "CRM", "Dashboard"],
    industries: [
      "trade",
      "manufacturing",
      "pharmacy",
      "logistics",
      "construction",
      "education",
      "clinics",
    ],
    related: ["business-automation", "it-integration", "business-systemization"],
  },
  {
    id: "automation",
    num: "06",
    slug: "business-automation",
    techTags: ["Workflow", "Reports", "Webhooks"],
    industries: ["trade", "manufacturing", "logistics", "ecommerce", "services", "construction"],
    related: ["erp-crm", "ai-sun-iy-intellekt", "it-integration"],
  },
  {
    id: "systemization",
    num: "07",
    slug: "business-systemization",
    techTags: ["Audit", "SOP", "KPI"],
    industries: ["manufacturing", "trade", "construction", "services", "logistics", "education"],
    related: ["erp-crm", "business-automation", "ai-sun-iy-intellekt"],
  },
  {
    id: "integration",
    num: "08",
    slug: "it-integration",
    techTags: ["1C · API", "Cloud", "Security"],
    industries: ["trade", "logistics", "ecommerce", "manufacturing", "pharmacy", "clinics"],
    related: ["erp-crm", "business-automation", "web-development"],
  },
] as const;

export const INDUSTRY_KEYS: readonly IndustryKey[] = [
  "trade",
  "manufacturing",
  "restaurant",
  "pharmacy",
  "education",
  "clinics",
  "logistics",
  "construction",
  "ecommerce",
  "services",
] as const;

export const PACKAGE_KEYS: readonly PackageKey[] = [
  "start",
  "business",
  "ai_business",
  "enterprise",
] as const;

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getServicesForIndustry(industry: IndustryKey): readonly ServiceDefinition[] {
  return SERVICES.filter((service) => service.industries.includes(industry));
}

