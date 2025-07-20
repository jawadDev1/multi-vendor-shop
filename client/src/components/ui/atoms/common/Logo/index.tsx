import React from 'react'
import NextImage from '../NextImage'
import cn from '@/utils/cn'

const Logo = ({className}: {className?: string}) => {
  return (
    <div className={cn('w-12', className)}>
        <NextImage src={'/images/logo.png'} className='object-cover' />
        
    </div>
  )
}

export default Logo