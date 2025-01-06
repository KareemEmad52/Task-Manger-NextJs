"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, } from "@/components/ui/form"
import CustomInputField from './CustomInputField'
import { loginFormSchema } from '@/lib/validations'
import { ClipLoader } from 'react-spinners'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/AuthContext'
import axios from 'axios'
import { cookies } from 'next/headers'


const LoginForm = () => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { handleLogin} = useAuth()

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })


  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true);
  
    try {
      const res = await axios.post('https://task-mangement-express-ts.vercel.app/api/v1/users/login', values);
  
      if (res.data.success) {
        cookies().set('authToken', res.data.data.token);
        handleLogin(res.data.data.token);
        toast.success('Logging in successfully', {
          autoClose: 2000,
        });
        router.push('/');
      } else {
        toast.error(res.data.error || "Unknown error occurred.", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios-specific error
        toast.error(error.response?.data?.message || 'An error occurred during the request', {
          autoClose: 2000,
        });
      } else if (error instanceof Error) {
        // General error (non-Axios)
        toast.error(error.message, {
          autoClose: 2000,
        });
      } else {
        // Fallback for unknown error types
        toast.error('An unexpected error occurred', {
          autoClose: 2000,
        });
      }
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
          name='email'
          placeholder='Enter your Email'
          iconSrc='/email.svg'
          iconAlt='email'
        />

        <CustomInputField
        inputType='input'
          control={form.control}
          name='password'
          placeholder='Enter your Password'
          iconSrc='/password.svg'
          iconAlt='password logo'
          type='password'
        />


        <Button type="submit"  className='w-full'>{
          isLoading ? <><ClipLoader size={15} className='mr-3' /> loading</> : 'submit'
        }</Button>

        <p className='text-colors-dark-700 text-center'>Don&apos;t have an account ? <Link href='/register' className='text-white hover:underline'> signup</Link>   </p>

      </form>
    </Form>

  )
}

export default LoginForm