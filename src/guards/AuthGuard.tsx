import { useAuth } from '@src/hooks'
import { DashboardTopBar } from '@src/layouts/dashboard-layout/components';
import SignInPage from '@src/pages/auth/signin';
import React, { ReactNode } from 'react'

function AuthGuard({children}:{children:ReactNode}) {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated){
        console.log(isAuthenticated)
       return(
        <SignInPage/>
       )
    }
    return children
}

export default AuthGuard