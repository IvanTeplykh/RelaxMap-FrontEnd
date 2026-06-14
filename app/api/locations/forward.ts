type LocationMethod = "GET" | "POST" | "PATCH";

function getApiUrl(): string | Response {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    return Response.json(
      { message: "API_URL environment variable is not set" },
      { status: 500 },
    );
  }

  return apiUrl.replace(/\/+$/, "");
}

function createResponseHeaders(source: Response): Headers {
  const headers = new Headers();
  const contentType = source.headers.get("content-type");

  if (contentType) {
    headers.set("content-type", contentType);
  }

  for (const setCookie of source.headers.getSetCookie()) {
    headers.append("set-cookie", setCookie);
  }

  return headers;
}

async function mirrorResponse(response: Response): Promise<Response> {
  const body = response.status === 204 ? null : await response.text();

  return new Response(body, {
    status: response.status,
    headers: createResponseHeaders(response),
  });
}

export async function forwardLocationsRequest(
  request: Request,
  method: LocationMethod,
  slug: string = "",
): Promise<Response> {
  const apiUrl = getApiUrl();

  if (apiUrl instanceof Response) {
    return apiUrl;
  }

  const { search } = new URL(request.url);
  const targetUrl = `${apiUrl}/locations${slug}${search}`;

  if (method === "GET") {
    const response = await fetch(targetUrl, {
      method,
      cache: "no-store",
    });

    return mirrorResponse(response);
  }

  const headers = new Headers();
  const cookie = request.headers.get("cookie");
  const contentType = request.headers.get("content-type");

  if (cookie) {
    headers.set("cookie", cookie);
  }

  if (contentType) {
    headers.set("content-type", contentType);
  }

  const body = await request.arrayBuffer();
  const response = await fetch(targetUrl, {
    method,
    headers,
    body: body.byteLength > 0 ? body : undefined,
    cache: "no-store",
  });

  return mirrorResponse(response);
}
