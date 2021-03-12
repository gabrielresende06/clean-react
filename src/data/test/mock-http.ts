import {
  HttpClient,
  HttpRequest, HttpRequestParams,
  HttpResponse,
  HttpStatusCode
} from '@/data/protocols/http'
import faker from 'faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement()
})

export const mockHttpRequestParams = (): HttpRequestParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement()
})

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string
  body?: any
  method?: string
  headers?: any

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async request (data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.body = data.body
    this.method = data.method
    this.headers = data.headers

    return this.response
  }
}
