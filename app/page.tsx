import TaskList from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Filter from "@/components/Filter";
import { DialogParent } from "@/components/DialogParent";
import DropDownLogout from "@/components/DropDownLogout";
import { Suspense } from 'react'
import Spinner from "@/components/Spinner";

export default function Home({ searchParams }: { searchParams: { capacity: string } }) {

  const filter = searchParams?.capacity ?? "all";
  return (
    <>
      <section className="w-full min-h-screen p-5">
        <h1 className="text-3xl font-bold text-center">Task Mangement</h1>
        <div className="px-4 py-6 flex flex-col sm:flex-row justify-between gap-4 ">
          <Filter />
          <div className=" flex items-center justify-center gap-4">
            <DialogParent />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
              <DropDownLogout/>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Suspense fallback={<Spinner />}>
        <TaskList filter={filter} />
        </Suspense>
      </section>
    </>
  );
}
