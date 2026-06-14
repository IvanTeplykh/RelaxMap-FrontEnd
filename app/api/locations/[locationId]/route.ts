import { forwardLocationsRequest } from "../forward";

interface RouteParams {
  params: Promise<{
    locationId: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteParams,
): Promise<Response> {
  const { locationId } = await params;
  return forwardLocationsRequest(request, "GET", `/${locationId}`);
}

export async function PATCH(
  request: Request,
  { params }: RouteParams,
): Promise<Response> {
  const { locationId } = await params;
  return forwardLocationsRequest(request, "PATCH", `/${locationId}`);
}
