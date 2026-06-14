import { forwardFeedbacksRequest } from "./forward";

export async function GET(request: Request): Promise<Response> {
  return forwardFeedbacksRequest(request, "");
}
