import { makeSignUpValidation } from '@/main/factories/pages/signup/signup-validation-factory'
import { ValidationBuilder } from '@/validation/builder/validation-builder'

describe('SignUpValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual([
      ...ValidationBuilder.field('name').required().min(5).build(),
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build(),
      ...ValidationBuilder.field('passwordConfirmation').required().sameAs('password').build()
    ])
  })
})
