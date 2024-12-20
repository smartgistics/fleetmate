const API_KEY = process.env.TM_API_KEY

export const fetchWithAuth = async <T>(
  url: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<T> => {
  if (!API_KEY) {
    console.error('TM_API_KEY is not configured')
    throw new Error('API key is not configured')
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
    Accept: 'application/json',
    'X-API-Version': '1.0',
  }

  if (!url) {
    throw new Error('API URL is not configured')
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      next: { revalidate: 0 },
    })

    // Handle rate limiting
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After')
      const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 1000
      await new Promise((resolve) => setTimeout(resolve, waitTime))
      return fetchWithAuth<T>(url, options, retryCount)
    }

    // Handle server errors with retry
    if (response.status >= 500 && retryCount < 3) {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, retryCount))
      )
      return fetchWithAuth<T>(url, options, retryCount + 1)
    }

    const data = await response.json()

    if (!response.ok) {
      console.error('API Error:', data)
    }

    return data as T
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}
