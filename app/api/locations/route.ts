import { forwardLocationsRequest } from "./forward";
export async function GET(request: Request): Promise<Response> {
  return forwardLocationsRequest(request, "GET");
}

export async function POST(request: Request): Promise<Response> {
  return forwardLocationsRequest(request, "POST");
}
