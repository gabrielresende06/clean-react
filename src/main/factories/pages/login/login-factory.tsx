import React from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/usescases/authentication/remote-authentication.factory'
import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'
import { makeLocalAccessToken } from '@/main/factories/usescases/save-access-token/local-save-access-token-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
        authentication={makeRemoteAuthentication('/login')}
        validation={makeLoginValidation()}
        saveAccessToken={makeLocalAccessToken()} />
  )
}
