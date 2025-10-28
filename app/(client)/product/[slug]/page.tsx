import AddToCardButton from '@/components/AddToCardButton';
import Container from '@/components/Container'
import ImageView from '@/components/ImageView';
import PriceView from '@/components/PriceView';
import ProductCharacteristics from '@/components/ProductCharacteristics';
import { getProductBySlug } from '@/sanity/helpers/queries';
import { FileQuestion, Heart, ListOrderedIcon, Share } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react'
import {BoxIcon}  from 'lucide-react';

const SingleProductPage = async({
    params,
  }:{
    params: Promise<{slug: string}>;
  }) => {
    const { slug }=await params;
    const product = await getProductBySlug(slug)
    if (!product) {
      return notFound();
    }

  return ( 
    <Container className='py-10 flex flex-col md:flex-row gap-10'> 
      {product?.images && <ImageView images={product?.images}/>} 
      <div className='w-full md:w-1/2 flex flex-col gap-5'>      
        <h2 className='text-3x1 md:text-4x1 font-bold mb-2'>{product?.name}
        </h2>
        <PriceView price={product?.price}
          discount={product?.discount}
          className='text-lg font-bold'
        />
        {product?.stock && (<p 
        className='bg-green-100 w-24 text-center text-black-700 text-sm py-2.5 font-semibold rounded-lg'>In Stock</p>
        )}
        <p className='text-sm text-gray-600 tracking-wide'>{product?.description}</p>
        <div className='flex items-center gap-2.5 lg:gap-5 '>
          <AddToCardButton product={product}
          className='flex-1 bg-green-500/80 text-white hover:bg-green-500 hoverEffect' />
          <button className='border-2 border-green-500/30 text-green-500/60 px-2.5 py-1.5 rounded-md hover:text-green-500 hover:border-green-500 hoverEffect'>
            <Heart className='w-5 h-5'/>
          </button>
        </div>
        {/* ====================ProductCharacteristics========================= 2 */}
        <ProductCharacteristics product={product} />
        {/* ================================================== 3 */}
        <div className='flex flex-wrap items-center justify-between grap-2.5 border-b border-b-gray-200 py-5 mt-2'>
          <div className='flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect'>
            <BoxIcon className='w-5 h-5'/>
              <p>Compare color</p>
          </div>
          <div className='flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect'>
            <FileQuestion className='w-5 h-5'/>
              <p>Ask a question</p>
          </div>
          <div className='flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect'>
            <ListOrderedIcon className='w-5 h-5'/>
              <p>Delivery & Return</p> 
          </div>
          <div className='flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect'>
            <Share className='w-5 h-5'/>
              <p>Share</p>
          </div>
          <div className='flex flex-wrap items-center gap-5'>
            <div className='border border-green-500/20 text-center p-3 hover:border-green-500 rounded-md hoverEffect'>
              <p className='text-base font-semibold text-green-500'>Free Shipping</p>
              <p className='text-sm text-gray-500'>Free Shipping over order $120</p>
            </div>
            <div className='border border-green-500/20 text-center p-3 hover:border-green-500 rounded-md hoverEffect'>
              <p className='text-base font-semibold text-green-500'>Flexible Payment</p>
              <p className='text-sm text-gray-500'>Pay With Multiple Credit Cards</p>
            </div>
          </div>
        </div>
      </div> 
    </Container>  
  ) 
}

export default SingleProductPage 