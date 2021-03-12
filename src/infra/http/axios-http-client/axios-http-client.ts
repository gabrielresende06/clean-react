import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request (data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error) {
      axiosResponse = error.response
    }

    return this.adapt(axiosResponse)
  }

  /* async get (params: HttpRequestParams): Promise<HttpResponse> {
    return this.request({ ...params, method: 'get' })
  }

  async post (params: HttpRequestParams): Promise<HttpResponse> {
    return this.request({ ...params, method: 'post' })
  }

  async put (params: HttpRequestParams): Promise<HttpResponse> {
    return this.request({ ...params, method: 'put' })
  }

  async delete (params: HttpRequestParams): Promise<HttpResponse> {
    return this.request({ ...params, method: 'delete' })
  } */

  private adapt (axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
