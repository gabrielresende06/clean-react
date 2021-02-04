import React from 'react'
import { Signup } from '@/presentation/pages'
import { makeLocalAccessToken } from '@/main/factories/usescases/save-access-token/local-save-access-token-factory'
import { makeSignUpValidation } from '@/main/factories/pages/signup/signup-validation-factory'
import { makeRemoteAddAccount } from '@/main/factories/usescases/add-account/remote-add-account.factory'

export const makeSignUp: React.FC = () => {
  return (
    <Signup
        addAccount={makeRemoteAddAccount('/signup')}
        validation={makeSignUpValidation()}
        saveAccessToken={makeLocalAccessToken()} />
  )
}
