import React from 'react'
import { MoonLoader } from 'react-spinners'

const Spinner = () => {
  return (
    <div className='w-full mt-20 pt-10   flex justify-center items-start'>
      <div className="border-colors-dark-500 h-14 w-14 animate-spin rounded-full border-[6px] border-t-white" />
    </div>
  )
}

export default Spinner