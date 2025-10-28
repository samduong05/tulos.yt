import { productType } from '@/constants';
import { Repeat } from 'lucide-react';
import React from 'react'

interface Props{
    selectedTab:string;
    onTabSelect:(tab: string)=> void;
}

const HomeTabbar = ({ selectedTab, onTabSelect}:Props) => {
  return  (
  <div className='flex items-center gap-1.3 text-sm font-semibold'>
    <div className='flex items-center gap-1.3'>
        {productType?.map((item)=>
        <button 
          key={item?.title}
          onClick={()=> onTabSelect(item?.title)}
          className={`boder border-green-500 px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-green-500 hover:text-white hoverEffect ${selectedTab===item?.title && "bg-green-500 text-white"}`}>
          {item?.title}
        </button>)}
    </div>
    <button className={'boder border-green-500 p-2 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-green-500 hover:text-white hoverEffect'}>
      <Repeat/>
    </button>
  </div>
  )
}

export default HomeTabbar