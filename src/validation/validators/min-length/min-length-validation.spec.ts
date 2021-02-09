import * as faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators'

const makeSut = (field: string, minLength: number = 5): MinLengthValidation => new MinLengthValidation(field, minLength)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return false if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  test('Should return false if value is empty', () => {
    const sut = makeSut('any_field')
    const error = sut.validate({ invalid_field: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })
})
