import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/sections/legal-page";
import { imageCredits } from "@/data/image-credits";
import { imageSlots } from "@/data/image-slots";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  {
    primary: "image credits",
    secondary: [],
    title: "Image Credits | F99 Solution",
    description: "Contributors and sources of the stock photos used on the F99 Solution website.",
  },
  "/image-credits",
);

const link = "text-accent underline underline-offset-2";
const entries = Object.entries(imageCredits).filter(([key]) => imageSlots[key]);

const sections: LegalSection[] = [
  {
    heading: "Stock photography",
    body: [
      <>
        Some photos on this website come from{" "}
        <a href="https://pixabay.com" target="_blank" rel="noopener noreferrer" className={link}>
          Pixabay
        </a>{" "}
        and are used under the Pixabay Content Licence. They are generic stock images that illustrate
        the topic of the page: the people shown are not our team and the places shown are not our
        office. Other images on the site are illustrations we commissioned.
      </>,
    ],
  },
  {
    heading: "Photo credits",
    body: entries.length === 0 ? ["No stock photos are currently in use."] : undefined,
    list: entries.map(([key, c]) => (
      <span key={key}>
        {c.alt} — by{" "}
        <a href={c.photographerUrl} target="_blank" rel="noopener noreferrer" className={link}>
          {c.photographer}
        </a>{" "}
        on{" "}
        <a href={c.url} target="_blank" rel="noopener noreferrer" className={link}>
          Pixabay
        </a>
        .
      </span>
    )),
  },
];

export default function ImageCreditsPage() {
  return (
    <LegalPage
      title="Image Credits"
      updated="13 November 2026"
      intro="Thank you to the photographers whose work appears on this site."
      sections={sections}
    />
  );
}
