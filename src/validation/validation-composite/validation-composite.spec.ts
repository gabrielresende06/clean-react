import { ValidationComposite } from '@/validation/validation-composite/validation-composite'
import { FieldValidationSpy } from '@/validation/test/mock-field-validation'

const makeSut = (): ValidationComposite => {
  const validationSpy = new FieldValidationSpy('any_field')
  const validationSpy2 = new FieldValidationSpy('any_field')
  validationSpy.error = new Error('first_error_message')
  validationSpy2.error = new Error('second_error_message')
  return new ValidationComposite([
    validationSpy,
    validationSpy2
  ])
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const sut = makeSut()
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first_error_message')
  })
})
