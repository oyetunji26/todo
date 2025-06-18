import React from 'react'
import { FiMoreHorizontal } from 'react-icons/fi'

const MoreBtn = () => {
  return (
    <button className='border border-theme p-1 rounded-full grid place-items-center'>
        <FiMoreHorizontal size={12} className='text-theme' />
    </button>
  )
}

export default MoreBtn