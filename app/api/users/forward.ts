/**
 * Forwards a public GET request to the backend (no cookies, no auth) and
 * mirrors back the status, content-type and body. Mirrors the architecture of
 * app/api/auth/forward.ts: the backend host lives only in the server-only
 * API_URL env var and is never exposed to the client.
 *
 * An optional `transform` rewrites the parsed JSON body before it is returned
 * (used to absolutize relative asset URLs on the server).
 */
export async function forwardUsersGet(
  request: Request,
  backendPath: string,
  transform?: (json: unknown) => unknown
): Promise<Response> {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    return Response.json(
      { message: 'API_URL environment variable is not set' },
      { status: 500 }
    );
  }

  const { search } = new URL(request.url);

  const backendResponse = await fetch(`${apiUrl}${backendPath}${search}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const contentType = backendResponse.headers.get('content-type') ?? '';

  // Mirror verbatim when there is nothing to transform, on errors, or for
  // non-JSON payloads.
  if (
    !transform ||
    !backendResponse.ok ||
    !contentType.includes('application/json')
  ) {
    const responseHeaders = new Headers();
    if (contentType) {
      responseHeaders.set('content-type', contentType);
    }

    const body =
      backendResponse.status === 204 ? null : await backendResponse.text();

    return new Response(body, {
      status: backendResponse.status,
      headers: responseHeaders,
    });
  }

  const json = (await backendResponse.json()) as unknown;

  return Response.json(transform(json), { status: backendResponse.status });
}

/** Backend origin (API_URL without any path), for resolving relative assets. */
export function getBackendOrigin(): string {
  const apiUrl = process.env.API_URL ?? '';
  try {
    return new URL(apiUrl).origin;
  } catch {
    return apiUrl.replace(/\/+$/, '');
  }
}
