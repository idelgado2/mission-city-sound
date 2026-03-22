import { MissionCityShell } from '@/app/ui/mission-city/app-shell';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MissionCityShell>{children}</MissionCityShell>;
}
