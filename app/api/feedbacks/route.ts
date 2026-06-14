import { forwardFeedbacksRequest } from "./forward";

export async function GET(request: Request): Promise<Response> {
  return forwardFeedbacksRequest(request, "GET");
}

export async function POST(request: Request): Promise<Response> {
  return forwardFeedbacksRequest(request, "POST");
}
