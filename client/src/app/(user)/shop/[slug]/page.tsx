import ShopDetailPage from '@/components/ui/pages/shop/ShopDetailPage'
import React from 'react'

const ShopDetail = async ({params}: {params: {slug: string}}) => {
    const {slug} = await params

  return (
    <ShopDetailPage slug={slug} />
  )
}

export default ShopDetail