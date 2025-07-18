import ProductDetialPage from '@/components/ui/pages/ProductDetailPage'
import React from 'react'


const ProductDetail = async ({params}: {params: {slug: string}}) => {
    const { slug} = await params
  return (
    <ProductDetialPage slug={slug} />
  )
}

export default ProductDetail