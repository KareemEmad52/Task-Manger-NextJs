import Image from 'next/image'
import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { CustomFormFieldProps } from '@/lib/types'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '../ui/textarea'




const CustomInputField = ({ control, name,showTimeSelect ,dateFormat, label,children ,inputType, placeholder, iconSrc, type, iconAlt, disabled }: CustomFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {inputType === 'select' && (<FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-dark-400  placeholder:text-dark-600 border-dark-500 h-11 focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {children}
              </SelectContent>
            </Select>
          </FormControl>)}

          {inputType === 'input' && (<div className='flex rounded-md border border-dark-500 '>
            {label && (
              <div className='flex items-center justify-center px-4 bg-dark-400'>
                <FormLabel>{label}</FormLabel>
              </div>
            )}
            
            {iconSrc && (
              <Image src={iconSrc} height={24} width={24} alt={iconAlt || ''} className='mx-2' />
            )}
            <FormControl>
              <Input {...field} type={type || 'text'} placeholder={placeholder} className='bg-dark-400 placeholder:text-dark-600 border-dark-500 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 border-0' disabled={disabled} />
            </FormControl>
          </div>)}


          {inputType === 'textArea' && (
            <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              className="bg-dark-400 min-h-[100px] placeholder:text-dark-600 border-dark-500 focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={disabled}
            />
          </FormControl>
          )}


          


          <FormMessage className='text-red-400' />
        </FormItem>
      )}
    />

  )
}

export default CustomInputField
