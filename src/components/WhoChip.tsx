import { ICONS } from "@/components/icons.generated";
import { WHO_ICONS } from "@/lib/whoIcons";

// One "Made for" chip, with its small drawn icon when it has one.
export function WhoChip({ label }: { label: string }) {
  const icon = WHO_ICONS[label];
  return (
    <span>
      {icon && (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          dangerouslySetInnerHTML={{ __html: ICONS[icon] }}
        />
      )}
      {label}
    </span>
  );
}
