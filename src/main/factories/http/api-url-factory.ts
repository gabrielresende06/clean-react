export const makeApiUrl = (uri: string): string => {
  return `${process.env.API_URL}${uri}`
}
