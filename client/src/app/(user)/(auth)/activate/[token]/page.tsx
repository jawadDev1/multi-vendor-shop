import ActivateAccout from '@/components/ui/pages/User/Auth/Activate';
import React from 'react'

interface ActivateProps {
 params: Promise<{ token: string }>
}

const Activate = async ({params}: ActivateProps) => {
    const { token} = await params;
  return (
    <ActivateAccout token={token} />
  )
}

export default Activate