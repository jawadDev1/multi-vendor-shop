import React from 'react'
import { BiSearch } from 'react-icons/bi'

const Search = () => {
  return (
    <div className='grid grid-cols-[90%,10%] justify-items-center items-center border-blue-gray max-w-[400px] h-11 bg-light-gray rounded-full overflow-hidden px-2 py-1'>
        <input type="text" className='w-full h-full px-1 py-1 text-sm text-charcoal focus:outline-none' placeholder='Search' required />
        <span className=''>
            <BiSearch className='size-5 md:size-7 text-blue-gray bg-transparent' />
        </span>
    </div>
  )
}

export default Search