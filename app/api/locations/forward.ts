const apiUrl = process.env.API_URL;

function buildHeaders(request: Request): Headers {
  const headers = new Headers();

  const cookie = request.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);

  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  return headers;
}

export async function forwardLocationsRequest(
  request: Request,
  backendPath: string,
): Promise<Response> {
  if (!apiUrl) {
    return Response.json(
      { message: "API_URL environment variable is not set" },
      { status: 500 },
    );
  }

  const { search } = new URL(request.url);

  const headers = buildHeaders(request);
  const body = await request.text();

  const backendResponse = await fetch(
    `${apiUrl}/locations${backendPath}${search}`,
    {
      method: request.method,
      headers,
      body: body.length > 0 ? body : undefined,
      cache: "no-store",
    },
  );

  const contentType = backendResponse.headers.get("content-type") ?? "";

  if (!backendResponse.ok || !contentType.includes("application/json")) {
    const resHeaders = new Headers();
    if (contentType) resHeaders.set("content-type", contentType);

    const text =
      backendResponse.status === 204 ? null : await backendResponse.text();

    return new Response(text, {
      status: backendResponse.status,
      headers: resHeaders,
    });
  }

  const json = await backendResponse.json();

  return Response.json(json, { status: backendResponse.status });
}
