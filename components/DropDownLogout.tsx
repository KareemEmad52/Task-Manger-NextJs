"use client"
import React from 'react'
import { DropdownMenuItem } from './ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/store/AuthContext'
import { useRouter } from 'next/navigation'


const DropDownLogout = () => {

  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {

    logout()
    router.push('/login')
  }

  return (
    <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </DropdownMenuItem>
  )
}

export default DropDownLogout