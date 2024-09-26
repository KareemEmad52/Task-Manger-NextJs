"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInputField from './CustomInputField'
import { registerFromSchema } from '@/lib/validations'
import { register } from '@/lib/actions'
import { ClipLoader } from 'react-spinners'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { SelectItem } from '../ui/select'



const RegisterForm = () => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof registerFromSchema>>({
    resolver: zodResolver(registerFromSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    },
  })


  async function onSubmit(values: z.infer<typeof registerFromSchema>) {
    setIsLoading(true)

    try {
      const response = await register(values);

      if (response.success) {
        document.cookie = "isAuth=true; path=/";
        toast.success('Signing up succesfully 😊', {
          autoClose: 2000
        });
        router.push('/login')
      } else {
        console.log(response.error);
        toast.error(response.error || "Unknown error occurred.", {
          autoClose: 2000
        })
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unknown error", {
        autoClose: 2000
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (

    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">


        <CustomInputField
          inputType='input'
          control={form.control}
          name='name'
          placeholder='Enter your name'
          iconSrc='/user.svg'
          iconAlt='user'
        />

        <CustomInputField
          inputType='input'
          control={form.control}
          name='email'
          placeholder='Enter your email'
          iconSrc='/email.svg'
          iconAlt='email'
        />

        <CustomInputField
          inputType='input'
          control={form.control}
          name='password'
          placeholder='Enter your password'
          iconSrc='/password.svg'
          iconAlt='password logo'
          type='password'
        />


        <CustomInputField
          inputType='select'
          control={form.control}
          name='gender'
          placeholder='Select your gander'
        >
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
        </CustomInputField>



        <Button type="submit" className='w-full'>{
          isLoading ? <><ClipLoader size={15} className='mr-3' /> loading</> : 'submit'
        }</Button>

        <p className='text-colors-dark-700 text-center'>Already have an account ? <Link href='/' className='text-white hover:underline'> signup</Link>   </p>

      </form>
    </Form>

  )
}

export default RegisterForm