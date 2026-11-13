import type { ComponentProps } from "react";
import { getSlotPhoto } from "@/lib/slot-photos";
import { SlotFrame } from "@/components/ui/slot-frame";

type Props = Omit<ComponentProps<typeof SlotFrame>, "asset"> & {
  /** Slot key from data/image-slots.ts (its file lives in public/images/). */
  slot: string;
};

/** Server-side photo slot: looks the photo up by key, falls back to the branded illustration. */
export function SlotImage({ slot, ...rest }: Props) {
  return <SlotFrame asset={getSlotPhoto(slot)} {...rest} />;
}
