import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, intlFormatDistance } from "date-fns";
import qs from "query-string";
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";

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

export function getJoinedDate(date: Date): string {
  return format(date, "MMMM y");
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => delete currentUrl[key]);

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

export function assignBadges(params: BadgeParam) {
  const badgeCounts: BadgeCounts = {
    BRONZE: 0,
    SILVER: 0,
    GOLD: 0,
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level: any) => {
      if (count >= badgeLevels[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });

  return badgeCounts;
}
