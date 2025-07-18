import UpdateProductPage from '@/components/ui/pages/seller/UpdateProductPage'
import React from 'react'

const UpdateProduct = async ({params}: {params: {id: string}}) => {
    const {id} = params;
  return (
    <UpdateProductPage id={id} />
  )
}

export default UpdateProduct