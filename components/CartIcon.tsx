"use client"
import useCartStore from '@/store';
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CartIcon = () => {
  const{ items} = useCartStore();
  return( 
    <Link href={"/cart"} className='group relative'>
      <ShoppingBag className='w-5 h-5 group-hover:text-green-500 hoverEffect'/>
        <span className = "absolute -top-1 -right-1 bg-green-500 text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">          
          {items.length?items.length:0}
        </span>
    </Link>
  );
}

export default CartIcon;