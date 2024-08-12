import React from 'react'

const Navbar = () => {
  return (
    <div className='max-w-screen-2xl container mx-auto px-6 md:px-40 shadow-lg h-16 py-3 fixed'>
      <div className='flex justify-between'>
        <h1 className='text-2xl cursor-pointer font-bold'>Word<span className='text-2xl text-green-500'>To</span>PDF</h1>
        <h1 className='mt-1 text-2xl cursor-pointer font-bold hover:scale-110 duration-300'>Home</h1>
      </div>
    </div>
  )
}

export default Navbar
