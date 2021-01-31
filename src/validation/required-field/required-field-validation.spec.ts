import { RequiredFieldValidation } from '@/validation'
import { RequiredFieldError } from '@/validation/errors'

describe('Required Field Validation', () => {
  test('Should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})
