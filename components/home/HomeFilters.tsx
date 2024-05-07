"use client";

import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { formUrlQuery } from "@/lib/utils";

function HomeFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("filter");

  const [active, setActive] = useState(query || "");

  function handleTypeClick(value: string) {
    if (active === value) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(value);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: value.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  }

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => handleTypeClick(filter.value)}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${active === filter.value ? "bg-primary-100 text-primary-500" : "bg-light-800 text-light-500 transition-all duration-500 hover:brightness-95 dark:bg-dark-300 dark:text-light-500 dark:hover:brightness-125"}`}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
}

export default HomeFilters;
