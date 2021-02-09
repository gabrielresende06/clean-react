import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'
import { ValidationComposite } from '@/validation/validation-composite/validation-composite'
import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators'

describe('LoginValidationFactory', () => {
  test('Should make CompositeValidation with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 5)
    ]))
  })
})
