type AuthPath = 'register' | 'login' | 'refresh' | 'logout';

/**
 * Forwards an auth request to the backend, preserving the client's cookies,
 * and mirrors back the backend's status, body and ALL Set-Cookie headers.
 */
export async function forwardAuthRequest(
  request: Request,
  path: AuthPath
): Promise<Response> {
  const apiUrl = process.env.API_URL;
  console.log(process.env.API_URL);
  if (!apiUrl) {
    return Response.json(
      { message: 'API_URL environment variable is not set' },
      { status: 500 }
    );
  }

  const headers = new Headers();

  const cookie = request.headers.get('cookie');
  if (cookie) {
    headers.set('cookie', cookie);
  }

  const contentType = request.headers.get('content-type');
  if (contentType) {
    headers.set('content-type', contentType);
  }

  const body = await request.text();

  const backendResponse = await fetch(`${apiUrl}/auth/${path}`, {
    method: 'POST',
    headers,
    body: body.length > 0 ? body : undefined,
    cache: 'no-store',
  });

  const responseHeaders = new Headers();

  const responseContentType = backendResponse.headers.get('content-type');
  if (responseContentType) {
    responseHeaders.set('content-type', responseContentType);
  }

  // getSetCookie() returns every Set-Cookie header separately —
  // the backend sends three (accessToken, refreshToken, sessionId)
  for (const setCookie of backendResponse.headers.getSetCookie()) {
    responseHeaders.append('set-cookie', setCookie);
  }

  const responseBody =
    backendResponse.status === 204 ? null : await backendResponse.text();

  return new Response(responseBody, {
    status: backendResponse.status,
    headers: responseHeaders,
  });
}
