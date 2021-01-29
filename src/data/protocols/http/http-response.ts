export enum HttpStatusCode {
  noContent = 204,
  ok = 200,
  unauthorized = 401,
  badRequest = 400,
  notFound = 404,
  serverError = 501,
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: T
}
