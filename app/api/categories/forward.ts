export type CategoryPath = "location-types" | "regions";

function isCategoryPath(category: string): category is CategoryPath {
  return category === "location-types" || category === "regions";
}

export async function forwardCategoryGet(
  request: Request,
  category: string,
): Promise<Response> {
  if (!isCategoryPath(category)) {
    return Response.json({ message: "Category not found" }, { status: 404 });
  }

  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    return Response.json(
      { message: "API_URL environment variable is not set" },
      { status: 500 },
    );
  }

  const { search } = new URL(request.url);
  const response = await fetch(
    `${apiUrl.replace(/\/+$/, "")}/categories/${category}${search}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  const body = response.status === 204 ? null : await response.text();
  const headers = new Headers();
  const contentType = response.headers.get("content-type");

  if (contentType) {
    headers.set("content-type", contentType);
  }

  return new Response(body, {
    status: response.status,
    headers,
  });
}
