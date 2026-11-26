import React from "react";
import {
  Bot,
  Database,
  Globe,
  LayoutGrid,
  Plug,
  Send,
  Smartphone,
  Zap,
} from "lucide-react";
import type { ServiceId } from "@/lib/services-data";

const SERVICE_ICONS: Record<ServiceId, typeof Bot> = {
  ai: Bot,
  web: Globe,
  mobile: Smartphone,
  telegram: Send,
  erp_crm: Database,
  automation: Zap,
  systemization: LayoutGrid,
  integration: Plug,
};

interface ServiceIconProps {
  id: ServiceId;
  size?: number;
  className?: string;
}

export function ServiceIcon({ id, size = 40, className }: ServiceIconProps) {
  const Icon = SERVICE_ICONS[id];
  return <Icon size={size} strokeWidth={1.5} className={className} />;
}

