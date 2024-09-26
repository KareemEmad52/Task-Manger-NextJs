"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogDemo } from "./DiallogDemo";
import { PlusCircle } from "lucide-react";


export function DialogParent() {
  const [open, setOpen] = useState(false); // Control the dialog state here

  return (
    <div>
      <Button  onClick={() => setOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New Task
      </Button>
      <DialogDemo open={open} setOpen={setOpen} />
    </div>
  );
}
