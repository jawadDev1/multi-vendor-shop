import TableShell from '@/components/Tables'
import SellerPageWrapper from '@/components/ui/atoms/SellerPageWrapper'
import { USERS_ELEMENTS, USERS_FIELDS } from '@/constants/tables_data'
import React from 'react'

const HokageUsersPageTemplate = ({data}: {data: { [key: string]: unknown }[]}) => {
  return (
    <SellerPageWrapper>
      <TableShell
        fields={USERS_FIELDS}
        elements={USERS_ELEMENTS}
        data={data}
      />
    </SellerPageWrapper>

  )
}

export default HokageUsersPageTemplate