import * as faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators'

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 5)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut()
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return false if value is valid', () => {
    const sut = makeSut()
    const error = sut.validate('12345')
    expect(error).toBeFalsy()
  })
})
