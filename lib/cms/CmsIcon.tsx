import {
  AudioLines,
  Bone,
  Brain,
  CircleAlert,
  ClipboardCheck,
  Crosshair,
  Flame,
  Leaf,
  Orbit,
  ScanFace,
  UnfoldVertical,
  UserRound,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  UnfoldVertical,
  Zap,
  Flame,
  CircleAlert,
  Orbit,
  Brain,
  AudioLines,
  ScanFace,
  ClipboardCheck,
  Crosshair,
  Leaf,
  Bone,
  UserRound,
};

type Props = {
  name: string;
  size?: number;
};

export default function CmsIcon({ name, size = 22 }: Props) {
  const Icon = ICONS[name] ?? CircleAlert;
  return <Icon size={size} strokeWidth={2} aria-hidden="true" />;
}
