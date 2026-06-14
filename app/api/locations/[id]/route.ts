import { forwardLocationsRequest } from "../forward";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await params;
  return forwardLocationsRequest(request, `/${id}`);
}
