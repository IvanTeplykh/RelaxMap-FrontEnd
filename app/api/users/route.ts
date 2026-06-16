export async function PATCH(request: Request): Promise<Response> {
  const apiUrl = process.env.API_URL;
  const cookie = request.headers.get("cookie") ?? "";

  const formData = await request.formData();

  const backendResponse = await fetch(`${apiUrl}/users/`, {
    method: "PATCH",
    headers: { cookie },
    body: formData,
    cache: "no-store",
  });

  const json = await backendResponse.json();
  return Response.json(json, { status: backendResponse.status });
}
