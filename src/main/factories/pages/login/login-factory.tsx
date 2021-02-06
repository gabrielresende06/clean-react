import React from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/usescases/authentication/remote-authentication.factory'
import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usescases/update-current-account/local-update-current-account-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
        authentication={makeRemoteAuthentication('/login')}
        validation={makeLoginValidation()}
        updateCurrentAccount={makeLocalUpdateCurrentAccount()} />
  )
}
