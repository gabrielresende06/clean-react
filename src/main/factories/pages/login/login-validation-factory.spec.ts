import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'
import { ValidationComposite } from '@/validation/validation-composite/validation-composite'
import { ValidationBuilder } from '@/validation/builder/validation-builder'

describe('LoginValidationFactory', () => {
  test('Should make CompositeValidation with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build()
    ]))
  })
})
