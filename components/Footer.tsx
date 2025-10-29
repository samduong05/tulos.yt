import React from 'react'
import Container from './Container'
import FooterTop from './FooterTop'
import Logo from './Logo'
import SocialMedia from './SocialMedia'
import { Input } from './ui/input'

import Link from 'next/link'
import { categoriesData, quickLinksData } from '@/constants'

const Footer = () => {
  return (
    <footer className='bg-green border-t'>
      <Container>
        <FooterTop/>
          <div className='py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grap-8'>
            <div className='space-y-4'>
            <Logo>Tulos</Logo>
            <p className='tex t-gray-600 text-sm'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit Rem ex ad at vitae esse Vero fuga laborum distinctio assumenda ab voluptate adipisci laboriosam, nemo dolore facere, expedita excepturi cupiditate ipsa </p>
            <SocialMedia
              className='text-green-500'
              iconClassName='border-green-500/60 hover:border-green-500 hover:text-green-500'
              tooltipClassName='bg-green-500 text-white'
              />
            </div>
              <div >
                <h3 className='font-semibold text-green-500 mb-4'>
                  Quick Links
                </h3>
                <div className='flex flex-col gap-3'>
                  {quickLinksData?.map((item)=>(
                    <Link 
                    key={item?.title}
                    href={item?.href}
                    className='text-gray-600 hover:text-green-500 text-sm font-medium hoverEffect'>{item?.title}</Link>))}
                </div>
              </div>
            <div>
              <h3 className='font-semibold text-green-500 mb-4'>
                  Categories
                </h3>
                <div className='flex flex-col gap-3'>
                  {categoriesData?.map((item)=>(
                    <Link 
                    key={item?.title}
                    href={`/category${item?.href}`}
                    className='text-gray-600 hover:text-green-500 text-sm font-medium hoverEffect'>{item?.title}</Link>))}
                </div>
            </div>
            <div>
              <h3 className='font-semibold text-green-500 mb-4'>Newslectter</h3>
              <p className='text-gray-600 text-sm mb-4'>
                Subscribe to our newsletter to receive updates and exclusive offers.
              </p>
              <form className='space-y-3'>
                <Input
                type='email'
                placeholder="Enter your email:"
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-lg forcus:outline-none focus:ring-2 focus:ring-gray-200'
                />
                <button type= "submit" className='w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors'>Subscribe                
                </button>
              </form>
            </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer 