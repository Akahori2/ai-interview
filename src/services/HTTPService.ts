export type Props = { url: string; body: object }

export class HTTPService {
  private static _instance: HTTPService | null = null

  public static getInstance(): HTTPService {
    if (HTTPService._instance === null) {
      HTTPService._instance = new HTTPService()
    }

    return HTTPService._instance
  }

  public async post<T>(props: Props): Promise<T> {
    const { url, body } = props
    const response = await fetch(url, {
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    console.log('post response:' + JSON.stringify(response))
    const data = await response.json()
    console.log('post data:' + JSON.stringify(data))
    if (data.error) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    return data as T
  }
}
