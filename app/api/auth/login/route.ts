import { forwardAuthRequest } from '../forward';

export async function POST(request: Request): Promise<Response> {
  return forwardAuthRequest(request, 'login');
}
