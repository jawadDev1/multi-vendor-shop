import OrderDetailPage from '@/components/ui/pages/OrderDetailPage'
import React from 'react'

const Order = async ({params}: {params: {id: string}}) => {
    const { id} = await params;
  return (
    <OrderDetailPage id={id} />
  )
}

export default Order