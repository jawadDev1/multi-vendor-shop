import UpdateSellerEventPage from '@/components/ui/pages/seller/UpdateSellerEventPage'
import React from 'react'

const UpdateEvent = async ({params}: {params: Promise<{id: string}>}) => {
    const { id} = await params
  return (
    <UpdateSellerEventPage id={id} />
  )
}

export default UpdateEvent