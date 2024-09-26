"use client";

import React from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


const Filter = () => {


  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter:string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <Tabs value={activeFilter} onValueChange={handleFilter}>
    <TabsList className="grid w-full grid-cols-3 ">
      <TabsTrigger
        value="all"
        className="data-[state=active]:bg-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white"
      >
        All Tasks
      </TabsTrigger>
      <TabsTrigger
        value="in-progress"
        className="data-[state=active]:bg-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white"
      >
        In-progress
      </TabsTrigger>
      <TabsTrigger
        value="completed"
        className="data-[state=active]:bg-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white"
      >
        Completed
      </TabsTrigger>
    </TabsList>
  </Tabs>
  )
}

export default Filter