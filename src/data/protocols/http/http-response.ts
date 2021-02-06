export enum HttpStatusCode {
  noContent = 204,
  ok = 200,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 501,
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}
