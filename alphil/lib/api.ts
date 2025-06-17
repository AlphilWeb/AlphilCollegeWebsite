export const fetchAPI = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const headers: HeadersInit = {
    ...options.headers,
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const finalOptions: RequestInit = {
    ...options,
    headers,
    body:
      options.body &&
      typeof options.body === 'object' &&
      !(options.body instanceof FormData)
        ? JSON.stringify(options.body)
        : options.body,
  };

  const response = await fetch(`${baseUrl}${endpoint}`, finalOptions);

  const contentType = response.headers.get('content-type') || '';

  if (!response.ok) {
    const errorData = contentType.includes('application/json')
      ? await response.json().catch(() => ({}))
      : await response.text().catch(() => '');

    const message = typeof errorData === 'string'
      ? errorData
      : errorData.message || response.statusText || 'Unknown error';

    throw new Error(message);
  }

  return contentType.includes('application/json')
    ? response.json()
    : response.text();
};
