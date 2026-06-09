import { forwardUsersGet, getBackendOrigin } from '../forward';

/**
 * Absolutizes a relative `avatarUrl` using the backend origin so the client
 * receives a ready-to-use absolute URL for next/image. Absolute URLs
 * (e.g. Cloudinary) are left untouched.
 */
function absolutizeAvatar(json: unknown): unknown {
  if (!json || typeof json !== 'object') {
    return json;
  }

  const data = json as Record<string, unknown>;
  const avatarUrl = data.avatarUrl;

  if (
    typeof avatarUrl === 'string' &&
    avatarUrl &&
    !avatarUrl.startsWith('http')
  ) {
    const origin = getBackendOrigin();
    return {
      ...data,
      avatarUrl: `${origin}${avatarUrl.startsWith('/') ? '' : '/'}${avatarUrl}`,
    };
  }

  return data;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;
  return forwardUsersGet(request, `/users/${id}`, absolutizeAvatar);
}
