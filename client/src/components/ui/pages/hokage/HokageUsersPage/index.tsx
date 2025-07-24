import { getServerApiRequest } from '@/actions/api';
import Content from '@/components/ui/atoms/typography/Content';
import HokageUsersPageTemplate from '@/components/ui/templates/hokage/HokageUsersPageTemplate'
import React from 'react'

const HokageUsersPage = async () => {
    const result = await getServerApiRequest("user/get-all-users");

  if (!result?.success) {
    return <Content>Something went wrong</Content>;
  }

  const data = result.data;


  return (
    
    <HokageUsersPageTemplate data={data} />

  )
}

export default HokageUsersPage