import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSyp } from '../../test/mock-http-client'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSyp
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSyp()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = 'other_url'
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
