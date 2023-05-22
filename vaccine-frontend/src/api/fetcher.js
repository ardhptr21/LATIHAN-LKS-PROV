export default async function fetcher(url, method = 'GET', failed_msg = 'Fetch failed!', body = null, headers = {}, options = {}) {
  const result = { data: null, fail: null };

  try {
    const optionsData = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      ...options,
    };
    if (method !== 'GET') optionsData.body = optionsData.headers['Content-Type'] === 'application/json' ? JSON.stringify(body) : body;

    const res = await fetch(url, optionsData);

    if (!res.ok) {
      const errors = await res.json();

      if (errors.message) {
        throw errors;
      }

      throw { message: failed_msg };
    }

    const data = await res.json();

    result.data = data;
  } catch (e) {
    result.fail = e;
  }

  return result;
}