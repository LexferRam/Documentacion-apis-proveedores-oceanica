'use client'


import useSession from '@/hooks/useSession'
import React from 'react'


const page = () => {

   const valor = useSession()
    console.log('ver valor' , valor)
    
  return (
    <div>documentacion</div>
  )
}

export default page