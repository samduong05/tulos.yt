'use client'
  // ****icon, hook, component UI, client, helper.********************
import { Loader2, Search, X } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { client } from '@/sanity/lib/client'
import { Product } from '@/sanity.types'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import Image from 'next/image'
import PriceView from './PriceView'
import AddToCardButton from './AddToCardButton'

   // **4 state để quản lý input, kết quả, loading, mở/đóng popup.****************
const SearchBar = () => {
  const [ search, setSearch] = useState("");
  const [ products, setProducts] = useState([]);
  const [ loading, setLoading] = useState(false);
  const [ showSearch, setShowSearch] = useState(false);

    // ***********************logic fetch dữ liệu từ Sanity***************************
  const fetchProducts=useCallback(async()=>{ 
    if(!search){
      setProducts([]);
      return;
    }
    setLoading(true)
    try {
      const query = `*[_type == "product" && name match $search] | order(name asc)`;
      const params = {search: `${search}*`};
      const response = await client.fetch(query, params);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false); 
    }
  },[search]);

  // *******************debounce 300ms*************************************

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return ()=> clearTimeout(debounceTimer)
  },[search, fetchProducts]);

  // **************************icon Search********************************

  return (
    <Dialog open={showSearch} onOpenChange={()=> setShowSearch (!showSearch)}>
      <DialogTrigger onClick={()=>setShowSearch(!showSearch)}>
        <Search className='w-5 h-5 hover: text-green-500 hoverEffect' />
      </DialogTrigger>

    {/* **********************Search form trong Dialog***************************** */}
      <DialogContent className='max-w-5xl min-h-[60vh] max-h-[90vh] flex flex-col overflow-hidden'>  
        <DialogHeader>
          <DialogTitle className='mb-1'>Product Searchbar</DialogTitle>

          {/* **********input, nut ❌ clear, nut 🔍 submit.************************* */}
          <form className='relative' onSubmit={(e) => e.preventDefault()}>
            <Input 
            placeholder='Search your product here...' className='flex-1 rounded-md py-5'
            value={search}
            onChange={(e) => setSearch(e.target.value)}/>
            {search && (<X onClick={()=> setSearch("")} className='w-4 h-4 absolute top-3 right-11 hover:text-red-600 hoverEffect'/>) }
            <button 
              type='submit'
              className={`absolute right-0 top-0 w-10 h-full flex items-center justify-center rounded-tr-md rounded-br-md hover:bg-green-500 hover:text-white hoverEffect ${search ? "bg-green-500 text-white": "bg-green-500/10"}`}>
              <Search className='w-5 h-5'/>
            </button>
          </form>
        </DialogHeader>
    {/* **********************hien thi ket qua**************** */}
        <div className='w-full h-full overflow-y-scroll border border-green-500'>
        <div>
          {loading?
          <p className='flex items-center px-6 py-10 gap-1 text-center text-yellow-600 font-semibold'>
            <Loader2 className='w-5 h-5 animate-spin'/> Search on progress...</p>:products.length?
            products?.map((product:Product) => 
              <div key={product?._id} className='bg-white overflow-hidden border-b last:border-b-0'>
                <div className='flex items-center p-1'>
                  <Link href={`/product/${product?.slug?.current}`} className='h-20 w-20 md:h-24 md:w-24 flex-shrink-0 border border-green-500/20 rounded-md overflow-hidden group'
                  onClick={()=> setShowSearch(false)}>
                  {product?.images && (<Image 
                  width={200} 
                  height={200} 
                  src={urlFor(product?.images[0]).url()}
                  alt="productImage"
                  className='object-cover w-full h-full group-hover:scale-110 hoverEffect' />)}
                  </Link>
                  <div className='px-4 py-2 flex-grow'>
                    <Link href={`/product/${product?.slug?.current}`} onClick={()=> setShowSearch(false)}>
                    <h3 className='text-sm md:text-lg font-semibold text-gray-800 line-clamp-1'>{product?.name}</h3>
                    <p className='text-sm text-gray-600 line-clamp-1'>{product?.intro}</p>
                    </Link>
                    <PriceView 
                      price={product?.price}
                      discount={product?.discount}
                      className='md:text-lg'/>
                  </div>
                  <div className='w-60 mt-1'>
                    <AddToCardButton product={product} />
                  </div>
                </div>
              </div>)
            :<div className='text-center py-10 font-semibold traking-wide'>
            {search && !loading? 
            <p>Nothing match with the keyword <span className='underline text-red-600'>{
              search}. Please try something else.</span></p>:
            <p className='text-green-600 flex items-center justify-center gap-1'><Search className='w-5 h-5'/>
          Search and explore your products form Tulos.</p>}</div>}
        </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
      // *********************click de sang trang khac************
export default SearchBar