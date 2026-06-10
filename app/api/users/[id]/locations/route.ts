import { forwardUsersGet } from '../../forward';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;
  // Query (?page=&perPage=) is forwarded from request.url by forwardUsersGet.
  return forwardUsersGet(request, `/users/${id}/locations`);
}
