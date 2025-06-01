"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") || "";

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newURL = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });

        router.push(newURL, { scroll: false });
      } else {
        if (pathname === "/companions") {
          const newURL = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          });
          router.push(newURL, { scroll: false });
        }
      }
    }, 500);
  }, [searchQuery, router, searchParams, pathname]);

  return (
    <div className="relative flex rounded-lg items-center gap-2 px-2 py-1 h-fit">
      <Image src="/icons/search.svg" alt="search" width={20} height={20} />
      <Input
        placeholder="Search Companions..."
        className="w-[250px] outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
