'use client'
import React from 'react'


const useSession = () => {
 const session = sessionStorage.getItem('SESSION')
 console.log("valor1", session)
 return session
}


export default useSession