import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { intlFormatDistance } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimestamp(createdAt: Date): string {
  return intlFormatDistance(createdAt, new Date());
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    const formattedNum = num / 1_000_000_000;

    return num % 1_000_000_000 === 0
      ? `${formattedNum}B`
      : `${formattedNum.toFixed(1)}M`;
  }

  if (num >= 1_000_000) {
    const formattedNum = num / 1_000_000;

    return num % 1_000_000 === 0
      ? `${formattedNum}M`
      : `${formattedNum.toFixed(1)}M`;
  }

  if (num >= 1_000) {
    const formattedNum = num / 1_000;

    return num % 1_000 === 0
      ? `${formattedNum}K`
      : `${formattedNum.toFixed(1)}K`;
  }

  return num.toString();
}
