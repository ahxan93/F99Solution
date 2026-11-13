import {
  BarChart3,
  Code2,
  Filter,
  LayoutTemplate,
  Mail,
  Megaphone,
  MessageCircle,
  PenLine,
  Palette,
  Search,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Target,
  Users,
  Video,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconName } from "@/data/services";

const icons: Record<ServiceIconName, LucideIcon> = {
  search: Search,
  share: Share2,
  megaphone: Megaphone,
  target: Target,
  layout: LayoutTemplate,
  code: Code2,
  workflow: Workflow,
  pen: PenLine,
  video: Video,
  palette: Palette,
  mail: Mail,
  message: MessageCircle,
  users: Users,
  shield: ShieldCheck,
  funnel: Filter,
  chart: BarChart3,
  cart: ShoppingCart,
};

export function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
}
