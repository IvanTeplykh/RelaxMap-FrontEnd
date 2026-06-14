import { forwardCategoryGet } from "../forward";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> },
): Promise<Response> {
  const { category } = await params;
  return forwardCategoryGet(request, category);
}
