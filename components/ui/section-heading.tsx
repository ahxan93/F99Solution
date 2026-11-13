import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="text-accent mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl leading-tight font-bold md:text-5xl">{title}</h2>
      {description && <p className="text-muted mt-4 text-base md:text-lg">{description}</p>}
    </div>
  );
}
