import { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http'
import { GetStorage } from '@/data/protocols/cache'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor (private readonly getStorage: GetStorage) { }

  async get (params: HttpGetParams): Promise<HttpResponse<any>> {
    this.getStorage.get('account')
    return Promise.resolve(undefined)
  }
}
