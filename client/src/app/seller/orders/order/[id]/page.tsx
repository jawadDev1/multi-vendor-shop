import SellerOrderDetailPage from '@/components/ui/pages/seller/SellerOrderDetailPage'
import React from 'react'

const OrderDetail = async ({ params}: {params: {id: string}}) => {
    const { id} = await params
  return (
    <SellerOrderDetailPage id={id} />
  )
}

export default OrderDetail