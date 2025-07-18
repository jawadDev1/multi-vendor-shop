import UpdateCoupounPage from '@/components/ui/pages/seller/UpdateCoupounPage'
import React from 'react'

const UpdateCoupoun = async ({ params}: {params: {id: string}}) => {
    const { id} = await params;
  return (
    <UpdateCoupounPage id={id} />
  )
}

export default UpdateCoupoun