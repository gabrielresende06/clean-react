import * as faker from 'faker'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields/compare-fields-validation'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.random.words(2)
    const fieldToCompare = faker.random.words(5)
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({ [field]: 'any_value', [fieldToCompare]: 'other_value' })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return false if compare is valid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const valueToCompare = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({ [field]: valueToCompare, [fieldToCompare]: valueToCompare })
    expect(error).toBeFalsy()
  })
})
