import UpdateCategoryPage from '@/components/ui/pages/hokage/UpdateCategoryPage';
import React from 'react'

const UpdateCategory = async ({params}: {params: {id: string}}) => {
    const {id} = await params;
  return (
    <UpdateCategoryPage  id={id} />
  )
}

export default UpdateCategory