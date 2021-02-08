import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list'
import { LoadSurveyList } from '@/domain/usecases'

export const makeRemoteLoadSurveyList = (uri: string): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl(uri), makeAxiosHttpClient())
}
