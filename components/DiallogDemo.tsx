import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { TaskFormData } from "@/lib/types";
import CustomInputField from "./Forms/CustomInputField";
import { Form, FormMessage } from "./ui/form";
import { SelectItem } from "./ui/select";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format, isBefore, isToday, parse, set } from "date-fns"
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTaskSchema } from "@/lib/validations";
import { addTask } from "@/lib/actions";
import { toast } from "react-toastify";
import { useAuth } from "@/store/AuthContext";
import { useState } from "react";
import { ClipLoader } from "react-spinners";



interface DialogDemoProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function DialogDemo({ open, setOpen }: DialogDemoProps) {

  const { isAuth } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<TaskFormData>({
    resolver: zodResolver(addTaskSchema)
  })


  const onSubmit = async (data: TaskFormData) => {
    setIsLoading(true)   
    const formData = {
      ...data,
      startingDate: new Date(),
    } 
    const response = await addTask(formData, isAuth.token);
    if (response.success) {
      toast.success(response.success)
      setIsLoading(false)
      setOpen(false)
    } else {
      toast.error(response.error)
      setIsLoading(false)
    }
  }


  const disablePastDates = (date: Date) => {
    return isBefore(date, new Date()) && !isToday(date)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[525px] bg-black">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&rsquo;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">

            <CustomInputField
              inputType='input'
              control={form.control}
              name='title'
              placeholder='Enter your Title'
              label="Title"
            />

            <CustomInputField
              inputType='textArea'
              control={form.control}
              name='description'
              placeholder='Enter the task description'
              label="Description"
            />

            <CustomInputField
              inputType='select'
              control={form.control}
              name='status'
              placeholder='Select The Task Status'
            >
              <SelectItem value="in-progress">In-progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </CustomInputField>



            <Controller
              name="deadline"
              control={form.control}
              defaultValue={undefined}
              render={({ field }) => (
                <div>
                  <div className="flex  items-center justify-start gap-3  h-11 rounded-md  ">
                    <Label htmlFor="date" className="text-left text-sm font-medium bg-black">Deadline : </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={disablePastDates} // Disable past dates
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Display error message if there's an error */}
                  {form.formState.errors.deadline && (
                    <p className="text-red-400 text-sm mt-0">{form.formState.errors.deadline.message}</p>
                  )}

                  <FormMessage className='text-red-400' />
                </div>
              )}
            />

            <DialogFooter>

              <Button type="submit" className='w-full'>{
                isLoading ? <><ClipLoader size={15} className='mr-3' /> loading</> : 'submit'
              }</Button>


            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
