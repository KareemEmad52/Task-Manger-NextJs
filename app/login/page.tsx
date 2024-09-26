import LoginForm from '@/components/Forms/LoginForm'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <>
      <div className="flex  w-full  h-screen max-h-screen">
        <section className="flex justify-center items-center w-full md:w-1/2  h-full">
          <div className='flex-1 p-5 md:max-w-[596px] flex flex-col justify-center items-center gap-6 space-y-6'>
            <div className='w-full'>
              <h1 className=' text-3xl md:text-4xl font-bold'>Welcome Back 👋</h1>
              <p className='text-colors-dark-700 mt-1'>Nice to meet you agian </p>
            </div>
            <LoginForm />
          </div>
        </section>

        <Image
          src='/Login-bg.jpg'
          height={1000}
          width={1000}
          alt="login image"
          className="hidden h-full object-cover md:block max-w-[50%]"
        />

      </div>

    </>
  )
}

export default page