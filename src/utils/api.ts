// Utility function for handling API requests
async function handleApiRequest<T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Example usage
export async function makeApiCall(data: any) {
  return handleApiRequest('/your-api-endpoint', {
    method: 'POST',
    body: JSON.stringify(data)
  });
} 