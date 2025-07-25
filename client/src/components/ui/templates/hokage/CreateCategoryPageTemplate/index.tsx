import SellerPageWrapper from '@/components/ui/atoms/SellerPageWrapper'
import SectionTitle from '@/components/ui/atoms/typography/SectionTitle'
import CategoryForm from '@/components/ui/organisms/forms/CategoryForm'
import React from 'react'

const CreateCategoryPageTemplate = () => {
  return (
    <SellerPageWrapper>

    <SectionTitle className='mb-7 md:mb-10'>
        Create Category
    </SectionTitle>

    <CategoryForm />

    </SellerPageWrapper>
  )
}

export default CreateCategoryPageTemplate