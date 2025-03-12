'use client'

import useSession from '@/hooks/useSession'
import React from 'react'


const page = () => {
    const valor = sessionStorage.getItem('SESSION')
    console.log('ver valor' , valor)

  return (
    <div style={{padding:500}}>Solicitudes</div>
  )
}

export default page