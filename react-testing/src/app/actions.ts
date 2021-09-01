interface Error {
  err: boolean, 
  errMessage: string
}
export interface Article {
  author: string,
  content: string,
  publishedAt: string,
  title: string,
  url: string,
  urlToImage: string,
}

export const getArticles = <T>(articles: T[]): {type: string, articles: T[]} => ({type: 'GET_ARTICLES', articles});
export const getErrors = (error: Error): {type: string, error: Error} => ({type: 'GET_ERRORS', error});