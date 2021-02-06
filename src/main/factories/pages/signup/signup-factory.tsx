import React from 'react'
import { Signup } from '@/presentation/pages'
import { makeSignUpValidation } from '@/main/factories/pages/signup/signup-validation-factory'
import { makeRemoteAddAccount } from '@/main/factories/usescases/add-account/remote-add-account.factory'

export const makeSignUp: React.FC = () => {
  return (
    <Signup
        addAccount={makeRemoteAddAccount('/signup')}
        validation={makeSignUpValidation()}
    />
  )
}
