"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "./ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { subjects } from "@/constants";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("subject") || "";

  const [subject, setSubject] = useState("");

  useEffect(() => {
    let newURL = "";
    if (subject === "all") {
      newURL = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });
    } else {
      newURL = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject,
      });
    }
    router.push(newURL, { scroll: false });
  }, [subject, router, searchParams]);

  return (
    <Select onValueChange={setSubject} value={subject}>
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All subjects</SelectItem>
        {subjects.map((subject) => (
          <SelectItem key={subject} value={subject} className="capitalize">
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
