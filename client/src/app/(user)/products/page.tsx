import ProductsPage from '@/components/ui/pages/ProductsPage'
import React from 'react'

const Products = async ({searchParams}: {searchParams: {category?: string}}) => {
  const {category}  = await searchParams;
  return (
  <ProductsPage category={category} />
  )
}

export default Products