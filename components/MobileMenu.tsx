'use client';
import { AlignLeft } from 'lucide-react'
import React, { useState } from 'react'
import Siderbar from './Siderbar'

const MobileMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
    <button onClick={()=>setIsSidebarOpen(!isSidebarOpen)}>
      <AlignLeft className='hover:text-green-500 hoverEffect md:hidden'/>
    </button>
    <div className='md:hidden'>
      <Siderbar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)} />
    </div>
    </>
  )
}

export default MobileMenu